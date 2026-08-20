// Captures full-page screenshots of every route at desktop and mobile using the
// Chromium already installed for Playwright. Output lands in scripts/shots/.
import { chromium } from "playwright-core";
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Prefer the system Chrome; fall back to whatever Chromium Playwright cached.
const root = join(process.env.LOCALAPPDATA, "ms-playwright");
const cached = readdirSync(root)
  .filter((d) => d.startsWith("chromium-"))
  .sort()
  .pop();
const executablePath =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
void cached;

const routes = process.argv[2]
  ? [process.argv[2]]
  : [
      "/",
      "/healthcare",
      "/sectors/agriculture",
      "/sectors/mining",
      "/sectors/construction",
      "/capabilities",
      "/about",
      "/contact",
    ];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

mkdirSync("scripts/shots", { recursive: true });
const browser = await chromium.launch({ executablePath });

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  for (const r of routes) {
    // Not networkidle: the dev server keeps an HMR socket open forever.
    await page.goto(`http://localhost:3000${r}`, { waitUntil: "load" });
    await page.waitForLoadState("domcontentloaded");
    // Walk the page so lazy images load and scroll-reveal sections play out.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 600));
    });
    await page
      .waitForFunction(() => [...document.images].every((i) => i.complete), {
        timeout: 15000,
      })
      .catch(() => console.warn("  (some images did not settle)"));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const slug = r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "-");
    const out = `scripts/shots/${slug}-${vp.name}.png`;
    await page.screenshot({ path: out, fullPage: true });
    console.log(out);
  }
  await ctx.close();
}

await browser.close();
