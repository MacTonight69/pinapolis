#!/usr/bin/env node
/**
 * Descarga las imágenes del manifiesto desde Wikimedia Commons, las convierte
 * a WebP optimizado y genera data/image-credits.ts con autoría y licencia.
 *
 * Uso: node scripts/fetch-images.cjs
 * Requisitos: ImageMagick (magick) disponible en PATH.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const https = require("https");
const path = require("path");
const { manifest } = require("./image-manifest.cjs");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images");
const UA = "PinapolisSiteBuilder/1.0 (https://example.com; dev)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getJSON = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": UA } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Respuesta no JSON: " + data.slice(0, 120)));
          }
        });
      })
      .on("error", reject);
  });

/** Descarga un archivo binario siguiendo redirects. */
const download = (url, dest) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": UA } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location, dest).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} para ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          fs.writeFileSync(dest, Buffer.concat(chunks));
          resolve();
        });
      })
      .on("error", reject);
  });

const clean = (v) =>
  v ? String(v).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim() : "";

/** Reintenta una función async hasta `tries` veces con espera creciente. */
const retry = async (fn, tries = 4) => {
  let lastError;
  for (let i = 1; i <= tries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      console.warn(`  ↻ intento ${i}/${tries} falló: ${e.message || e.code}`);
      await sleep(2500 * i);
    }
  }
  throw lastError;
};

(async () => {
  const credits = [];
  const failures = [];
  for (const item of manifest) {
    const outPath = path.join(OUT_DIR, item.file);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    try {
      const api =
        "https://commons.wikimedia.org/w/api.php?" +
        new URLSearchParams({
          action: "query",
          format: "json",
          titles: item.commons,
          prop: "imageinfo",
          iiprop: "url|size|extmetadata|mime",
          iiurlwidth: String(item.width),
        }).toString();

      const json = await retry(() => getJSON(api));
      const page = Object.values(json.query?.pages || {})[0];
      const info = page?.imageinfo?.[0];
      if (!info) throw new Error("No se encontró en Commons: " + item.commons);
      const meta = info.extmetadata || {};

      if (!fs.existsSync(outPath)) {
        const srcUrl = (info.thumburl || info.url).split("?")[0];
        const tmp = path.join("/tmp/opencode", path.basename(item.file) + ".jpg");
        await retry(() => download(srcUrl, tmp));
        execFileSync(
          "magick",
          [tmp, "-resize", `${item.width}x>`, "-strip", "-quality", "82", outPath],
          { stdio: "pipe" }
        );
        fs.unlinkSync(tmp);
      }

      credits.push({
        file: item.file,
        title: page.title.replace(/^File:/, ""),
        author: clean(meta.Artist?.value) || "Desconocido",
        license: clean(meta.LicenseShortName?.value) || "Ver Wikimedia Commons",
        licenseUrl: clean(meta.LicenseUrl?.value),
        source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
      });
      const kb = Math.round(fs.statSync(outPath).size / 1024);
      console.log(`✓ ${item.file} (${kb} KB) — ${credits[credits.length - 1].license}`);
    } catch (e) {
      failures.push(item.file);
      console.error(`✗ ${item.file}: ${e.message || e.code}`);
    }
    await sleep(1200);
  }

  const creditsPath = path.join(ROOT, "data", "image-credits.ts");
  const lines = credits
    .map(
      (c) => `  {
    file: "${c.file}",
    title: ${JSON.stringify(c.title)},
    author: ${JSON.stringify(c.author)},
    license: ${JSON.stringify(c.license)},
    licenseUrl: ${JSON.stringify(c.licenseUrl)},
    source: ${JSON.stringify(c.source)},
  },`
    )
    .join("\n");

  fs.writeFileSync(
    creditsPath,
    `/**
 * Créditos de las imágenes de demostración (Wikimedia Commons).
 * NO EDITAR A MANO: se regenera con \`node scripts/fetch-images.cjs\`.
 *
 * ⚠️ Estas imágenes son de DEMOSTRACIÓN con licencias libres. Antes de
 * publicar el sitio, reemplazalas por fotografías propias de Pinapolis
 * (ver README → "Reemplazar imágenes").
 */
export type ImageCredit = {
  file: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
};

export const imageCredits: ImageCredit[] = [
${lines}
];
`
  );
  console.log(`\n✓ ${credits.length} imágenes procesadas. Créditos en data/image-credits.ts`);
  if (failures.length) {
    console.error(`✗ ${failures.length} fallaron (volvé a ejecutar el script para reintentar):`);
    for (const f of failures) console.error("   - " + f);
    process.exitCode = 1;
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
