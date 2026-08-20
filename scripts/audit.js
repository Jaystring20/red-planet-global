// Page audit run in the browser via javascript_tool. Checks the pre-flight
// items that can be measured: contrast, overflow, CTA wrapping, eyebrow budget,
// stray em-dashes, missing alt text, heading structure.
window.__audit = () => {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const ctx = cv.getContext("2d", { willReadFrequently: true });

  // Flattens any CSS color (including oklab and alpha) onto an opaque base.
  const toRGB = (css, under) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = `rgb(${under[0]},${under[1]},${under[2]})`;
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  };
  const srgb = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (hi + 0.05) / (lo + 0.05);
  };

  const bgOf = (el) => {
    const stack = [];
    let n = el;
    while (n && n !== document.documentElement) {
      const b = getComputedStyle(n).backgroundColor;
      if (b && b !== "rgba(0, 0, 0, 0)") stack.push(b);
      n = n.parentElement;
    }
    stack.push("rgb(247,245,242)");
    let base = [247, 245, 242];
    for (let i = stack.length - 1; i >= 0; i--) base = toRGB(stack[i], base);
    return base;
  };

  const out = { url: location.pathname, w: innerWidth };

  out.lowContrast = [
    ...document.querySelectorAll(
      "a,button,p,h1,h2,h3,li,dt,dd,span,label,input,select,textarea,address",
    ),
  ]
    .filter((el) => el.textContent.trim() && !el.querySelector("*") && el.offsetParent !== null)
    .map((el) => {
      const s = getComputedStyle(el);
      const bg = bgOf(el);
      const fg = toRGB(s.color, bg);
      const big =
        parseFloat(s.fontSize) >= 24 ||
        (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
      return {
        t: el.textContent.trim().slice(0, 32),
        r: +ratio(fg, bg).toFixed(2),
        min: big ? 3 : 4.5,
      };
    })
    .filter((x) => x.r < x.min);

  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  out.dashes = [];
  while ((n = w.nextNode())) {
    if (/[—–]/.test(n.nodeValue)) out.dashes.push(n.nodeValue.trim().slice(0, 50));
  }

  out.overflowX = document.documentElement.scrollWidth > innerWidth + 2;

  out.wrappedCTAs = [...document.querySelectorAll("a,button")]
    .filter((el) => {
      const s = getComputedStyle(el);
      const lh = parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.5;
      const inner =
        el.getBoundingClientRect().height -
        parseFloat(s.paddingTop) -
        parseFloat(s.paddingBottom);
      return (
        inner > lh * 1.7 &&
        el.textContent.trim() &&
        el.textContent.trim().length < 60 &&
        !el.querySelector("p,div,ul")
      );
    })
    .map((e) => e.textContent.trim().slice(0, 32));

  out.eyebrowCount = [...document.querySelectorAll("*")].filter((el) => {
    if (el.children.length) return false;
    const c = getComputedStyle(el);
    return (
      c.textTransform === "uppercase" &&
      parseFloat(c.letterSpacing) > 1 &&
      parseFloat(c.fontSize) <= 14 &&
      el.textContent.trim()
    );
  }).length;

  out.sections = document.querySelectorAll("main > section").length;
  out.imgsNoAlt = [...document.images].filter((i) => !i.alt).length;
  out.h1 = document.querySelectorAll("h1").length;
  return out;
};
