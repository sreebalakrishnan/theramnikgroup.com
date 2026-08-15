// Regenerate assets/img/og-card.jpg from og-card.source.html. The bundled
// Playwright version mismatches the installed Chromium, so executablePath is
// passed explicitly (see CLAUDE.md).
const { chromium } = require("playwright");

(async () => {
  const b = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e)));
  await p.goto("http://127.0.0.1:8790/assets/img/og-card.source.html", { waitUntil: "load" });
  // The mark is a real <img>; do not shoot before it has decoded.
  await p.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  await p.screenshot({ path: "assets/img/og-card.jpg", quality: 90, type: "jpeg" });
  console.log("og-card.jpg written, page errors: " + errors.length);
  await b.close();
})();
