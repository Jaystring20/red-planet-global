// Downloads the reviewed image selections at web resolution into public/img/.
// Selections are recorded in src/content/imageCredits.ts with full attribution.
import { mkdirSync, createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { readFileSync } from "node:fs";

const candidates = JSON.parse(readFileSync("scripts/candidates.json", "utf8"));

// slot -> [candidate index, output path, target width]
const selections = {
  hero: [5, "public/img/hero.jpg", 1800],
  healthcare: [3, "public/img/healthcare/hero.jpg", 1600],
  icu: [3, "public/img/healthcare/icu-project.jpg", 1800],
  agriculture: [2, "public/img/agriculture/hero.jpg", 1600],
  mining: [1, "public/img/mining/hero.jpg", 1600],
  construction: [4, "public/img/construction/hero.jpg", 1600],
  trading: [0, "public/img/capabilities/trading.jpg", 1200],
  export: [3, "public/img/capabilities/export.jpg", 1200],
};

const UA = "RedPlanetSiteBuild/1.0 (info@redplanetglobal.com)";

for (const [slot, [idx, out, width]] of Object.entries(selections)) {
  const pick = candidates[slot][idx];
  // Commons thumb URLs carry the requested width; bump it to our target.
  const url = pick.url.replace(/\/1400px-/, `/${width}px-`);
  mkdirSync(out.split("/").slice(0, -1).join("/"), { recursive: true });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    console.log(slot, "FAILED", res.status);
    continue;
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(out));
  console.log(slot, "->", out);
}
