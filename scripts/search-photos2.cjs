#!/usr/bin/env node
/** Búsqueda en Wikimedia Commons filtrando fotos JPG grandes, con throttling. */
const https = require("https");

const TERMS = [
  "hens free range farm yard grass",
  "chicken drinking water",
  "leghorn white hen",
  "chicken flock grass",
];

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clean = (v) => (v ? String(v).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "");

(async () => {
  for (const term of TERMS) {
    const url =
      "https://commons.wikimedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        format: "json",
        generator: "search",
        gsrsearch: term,
        gsrnamespace: "6",
        gsrlimit: "8",
        prop: "imageinfo",
        iiprop: "url|size|extmetadata|mime",
        iiurlwidth: "1600",
      }).toString();
    try {
      const json = await get(url);
      const pages = Object.values(json.query?.pages || {}).sort(
        (a, b) => (a.index || 99) - (b.index || 99)
      );
      console.log("\n" + "=".repeat(90));
      console.log("## " + term);
      for (const p of pages) {
        const info = p.imageinfo?.[0];
        if (!info) continue;
        if (info.mime !== "image/jpeg" || info.width < 900) continue;
        const meta = info.extmetadata || {};
        console.log(
          `OK  ${p.title}\n     ${info.width}x${info.height} | ${clean(
            meta.LicenseShortName?.value
          )} | ${clean(meta.Artist?.value).slice(0, 55)}`
        );
      }
    } catch (e) {
      console.log("\n## " + term + "  -> ERROR " + e.message);
    }
    await sleep(4000);
  }
})();
