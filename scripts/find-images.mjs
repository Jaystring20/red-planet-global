// Pulls freely-licensed candidates per image slot from Wikimedia Commons and
// Openverse, downloads thumbnails for visual review, and writes candidates.json.
// Review step is manual. Not part of the app build.
import { writeFileSync, mkdirSync, createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const slots = {
  hero: ["container port terminal ship cranes", "Lagos port Apapa"],
  healthcare: ["intensive care unit hospital", "hospital ward equipment modern"],
  icu: ["operating room surgery lamp", "operating theatre hospital"],
  agriculture: ["maize field farm Africa", "cassava farm Nigeria harvest"],
  mining: ["open pit mine excavator", "quarry mining haul truck"],
  construction: ["construction site tower crane", "building construction steel frame"],
  trading: ["gantry crane container stack", "cargo containers terminal"],
  consulting: ["business meeting conference Africa", "office meeting professionals"],
  export: ["warehouse forklift pallets", "logistics warehouse interior"],
};

const UA = "RedPlanetSiteBuild/1.0 (info@redplanetglobal.com)";
const strip = (s) => (s ? String(s).replace(/<[^>]*>/g, "").trim() : "");

async function commons(q) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `filetype:bitmap ${q}`,
    gsrnamespace: "6",
    gsrlimit: "15",
    prop: "imageinfo",
    iiprop: "url|size|extmetadata",
    iiurlwidth: "1400",
  });
  const r = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { "User-Agent": UA },
  });
  const j = await r.json();
  return Object.values(j?.query?.pages ?? {})
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii) return null;
      const m = ii.extmetadata ?? {};
      return {
        src: "commons",
        title: p.title.replace(/^File:/, ""),
        license: strip(m.LicenseShortName?.value) || "unknown",
        creator: strip(m.Artist?.value).slice(0, 70),
        page: ii.descriptionurl,
        url: ii.thumburl ?? ii.url,
        w: ii.width,
        h: ii.height,
      };
    })
    .filter((x) => x && x.w >= 1200 && x.w / x.h >= 1.25)
    .filter((x) => /^(cc|pd|public)/i.test(x.license));
}

async function openverse(q) {
  const params = new URLSearchParams({
    q,
    license_type: "commercial,modification",
    page_size: "15",
    mature: "false",
  });
  const r = await fetch(`https://api.openverse.org/v1/images/?${params}`, {
    headers: { "User-Agent": UA },
  });
  const j = await r.json();
  return (j.results ?? [])
    .map((x) => ({
      src: "openverse",
      title: x.title,
      license: `${x.license} ${x.license_version ?? ""}`.trim(),
      creator: x.creator ?? "",
      page: x.foreign_landing_url,
      url: x.url,
      w: x.width ?? 0,
      h: x.height ?? 0,
    }))
    .filter((x) => x.w >= 1200 && x.w / x.h >= 1.25);
}

mkdirSync("scripts/candidates", { recursive: true });
const out = {};

for (const [slot, queries] of Object.entries(slots)) {
  const found = [];
  for (const q of queries) {
    for (const fn of [commons, openverse]) {
      try {
        found.push(...(await fn(q)));
      } catch {
        /* keep going, another source may answer */
      }
    }
  }
  const seen = new Set();
  const picks = found.filter((x) => !seen.has(x.url) && seen.add(x.url)).slice(0, 6);
  out[slot] = picks;

  for (const [i, p] of picks.entries()) {
    try {
      const res = await fetch(p.url, { headers: { "User-Agent": UA } });
      if (!res.ok) continue;
      await pipeline(
        Readable.fromWeb(res.body),
        createWriteStream(`scripts/candidates/${slot}-${i}.jpg`),
      );
      p.local = `scripts/candidates/${slot}-${i}.jpg`;
    } catch {
      /* skip unreachable candidate */
    }
  }
  console.log(slot, picks.filter((p) => p.local).length, "downloaded");
}

writeFileSync("scripts/candidates.json", JSON.stringify(out, null, 2));
