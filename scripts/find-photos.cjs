#!/usr/bin/env node
/**
 * Busca imágenes candidatas en Wikimedia Commons y muestra:
 * título, licencia, autor y dimensiones.
 * Uso: node scripts/find-photos.cjs "Plymouth Rock chicken" [limit]
 */
const https = require("https");

const search = process.argv[2] || "chicken";
const limit = Number(process.argv[3] || 6);

const url =
  "https://commons.wikimedia.org/w/api.php?" +
  new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `${search} -flickr`,
    gsrnamespace: "6",
    gsrlimit: String(limit),
    prop: "imageinfo",
    iiprop: "url|size|extmetadata|mime",
    iiurlwidth: "1600",
  }).toString();

const get = (u) =>
  new Promise((resolve, reject) => {
    https
      .get(u, { headers: { "User-Agent": "PinapolisSiteBuilder/1.0 (dev)" } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });

get(url).then((json) => {
  const pages = json.query?.pages || {};
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (!info) continue;
    const meta = info.extmetadata || {};
    const clean = (v) => (v ? String(v).replace(/<[^>]+>/g, "").trim() : "");
    console.log("─".repeat(80));
    console.log("TITLE   :", p.title);
    console.log("MIME    :", info.mime, `${info.width}x${info.height}`);
    console.log("LICENSE :", clean(meta.LicenseShortName?.value));
    console.log("AUTHOR  :", clean(meta.Artist?.value).slice(0, 90));
    console.log("THUMB   :", info.thumburl?.split("?")[0]);
  }
});
