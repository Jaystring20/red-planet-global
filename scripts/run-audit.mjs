// Runs scripts/audit.js against every route at desktop and mobile.
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const executablePath =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const src = readFileSync("scripts/audit.js", "utf8");
const routes = [
  "/",
  "/healthcare",
  "/sectors/agriculture",
  "/sectors/mining",
  "/sectors/construction",
  "/capabilities",
  "/about",
  "/contact",
  "/credits",
  "/nope-404",
];

const browser = await chromium.launch({ executablePath });
let failures = 0;

for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
]) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  for (const r of routes) {
    await page.goto(`http://localhost:3000${r}`, { waitUntil: "load" });
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((s) => setTimeout(s, 120));
      }
    });
    await page.evaluate(src);
    const a = await page.evaluate(() => window.__audit());

    const problems = [];
    if (a.lowContrast.length) problems.push(`contrast x${a.lowContrast.length}: ` + JSON.stringify(a.lowContrast.slice(0, 3)));
    if (a.dashes.length) problems.push(`em-dashes: ${JSON.stringify(a.dashes)}`);
    if (a.overflowX) problems.push("horizontal overflow");
    if (a.wrappedCTAs.length) problems.push(`wrapped CTAs: ${JSON.stringify(a.wrappedCTAs)}`);
    if (a.imgsNoAlt) problems.push(`${a.imgsNoAlt} images without alt`);
    if (a.h1 !== 1) problems.push(`${a.h1} h1 elements`);
    const budget = Math.ceil(Math.max(a.sections, 1) / 3);
    if (a.eyebrowCount > budget) problems.push(`eyebrows ${a.eyebrowCount} over budget ${budget}`);

    if (problems.length) {
      failures += problems.length;
      console.log(`FAIL ${vp.name} ${r}`);
      problems.forEach((p) => console.log(`     ${p}`));
    } else {
      console.log(`ok   ${vp.name} ${r}`);
    }
  }

  const real = consoleErrors.filter((e) => !/404|favicon/i.test(e));
  if (real.length) {
    failures += real.length;
    console.log(`FAIL ${vp.name} console:`, real.slice(0, 5));
  }
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} problem(s)` : "\nall checks passed");
process.exit(failures ? 1 : 0);
