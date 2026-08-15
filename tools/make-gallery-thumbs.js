/*
 * Build the gallery thumbnails from the published photographs. Run from the
 * repository root:
 *
 *   npm install --no-save sharp && node tools/make-gallery-thumbs.js
 *
 * The album is a masonry of mixed aspect ratios, so the thumbnails keep each
 * photograph's own shape and are only constrained by width. 760px is 2x the
 * widest column the layout produces (three columns inside a 1200px container),
 * which keeps the page honest on a retina display without shipping the
 * full-size files — several of those are 2000px+ and the album would otherwise
 * weigh several megabytes.
 *
 * The full-size file stays the link target, so the lightbox shows the real
 * photograph.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = "assets/img/photos";
const OUT = path.join(SRC, "thumbs");
const WIDTH = 760;

// Only what the album shows. Headshots are deliberately absent: they belong to
// the leadership section on the legacy page, not to a gallery of the operation.
const FRAMES = [
  "opencast.jpg",
  "ramrama.jpg",
  "underground.jpg",
  "workings.jpg",
  "crushing.jpg",
  "ore-stacks.jpg",
  "safety.jpg",
  "plant-panorama.jpg",
  "plant-unit-3.jpg",
  "plant-yard.jpg",
  "plant-dusk.jpg",
  "hero-mine.jpg",
  "furnace.jpg",
  "tap-hole.jpg",
  "plant.jpg",
  "control-room.jpg",
  "pollution-control.jpg",
  "solar.jpg",
  "plantation.jpg",
  "award-five-star.jpg",
  "award-five-star-trophy.jpg",
  "award-safety-week.jpg",
  "award-environment.jpg",
  "award-fmpcci.jpg",
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let total = 0;
  const missing = [];
  for (const f of FRAMES) {
    const src = path.join(SRC, f);
    if (!fs.existsSync(src)) {
      missing.push(f);
      continue;
    }
    const meta = await sharp(src).metadata();
    // Never upscale: a few frames are already narrower than the target.
    const w = Math.min(WIDTH, meta.width);
    const dest = path.join(OUT, f);
    await sharp(src).resize(w).jpeg({ quality: 78, mozjpeg: true }).toFile(dest);
    const size = fs.statSync(dest).size;
    total += size;
    console.log(f.padEnd(28), `${w}px`.padStart(6), (size / 1024).toFixed(0).padStart(4) + " KB");
  }
  console.log("\n" + FRAMES.length + " thumbnails, " + (total / 1024 / 1024).toFixed(2) + " MB total");
  if (missing.length) console.log("MISSING: " + missing.join(", "));
})();
