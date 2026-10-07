#!/usr/bin/env node
/** Búsqueda múltiple en Wikimedia Commons. Uso: node scripts/search-photos.cjs */
const https = require("https");

const TERMS = [
  "Barred Plymouth Rock hen chicken",
  "Rhode Island Red hen",
  "White Leghorn hen chicken",
  "Light Sussex chicken hen",
  "Buff Orpington chicken",
  "Brahma chicken hen",
  "Black Australorp hen",
  "Silver Laced Wyandotte chicken",
  "Araucana chicken hen",
  "Marans chicken hen",
  "chickens free range pasture flock",
  "wooden chicken coop garden",
  "rooster portrait head",
  "young chicks hen coop",
  "brown eggs basket chicken",
  "chicken eating grain farm",
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
        gsrlimit: "5",
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
        const meta = info.extmetadata || {};
        const lic = clean(meta.LicenseShortName?.value);
        const isPhoto = info.mime === "image/jpeg" && info.width >= 1000;
        console.log(
          `${isPhoto ? "OK " : "-- "} ${p.title}\n     ${info.width}x${info.height} | ${lic} | ${clean(
            meta.Artist?.value
          ).slice(0, 60)}`
        );
      }
    } catch (e) {
      console.log("\n## " + term + "  -> ERROR " + e.message);
    }
  }
})();
