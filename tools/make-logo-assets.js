/*
 * Build every logo asset the site uses from the single artwork sheet the client
 * supplied (tools/logo-source.png). Run from the repository root:
 *
 *   npm install --no-save sharp && node tools/make-logo-assets.js
 *
 * The sheet is a 1024x1536 RGBA PNG holding, top to bottom: the full-colour
 * mark, the RAMNIK wordmark, a rule, and three small variants (colour, solid,
 * reversed tile). Regions below were measured off the file, not eyeballed.
 *
 * The 2026 artwork arrived flat on white with no alpha. It was flood-filled in
 * from the border to clear only the background, because the white gaps between
 * the sun rays and around the ingot reach the hexagon edge and are meant to be
 * transparent — the first sheet treated them the same way.
 *
 * Everything is generated from the FULL-COLOUR mark, which is the highest
 * resolution copy on the sheet and the only variant that survives being shrunk
 * (the solid and reversed ones turn to grey noise below about 24px).
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = "tools/logo-source.png";
const OUT = "assets/img";

// Re-measured on the 2026 artwork by walking rows for non-background pixels;
// the bands land within a pixel or two of the first sheet.
const MARK = { left: 205, top: 90, width: 613, height: 709 };
const WORDMARK = { left: 73, top: 842, width: 878, height: 122 };

// Sampled from the artwork as the modal colour of the wordmark: the 2026 logo
// is navy, where the first version was a charcoal grey. Icon tiles use it so
// they match the mark rather than the page behind it. It is NOT the site's
// --ink (#15181c) and must not be conflated with it.
const LOGO_NAVY = "#0c325c";

// The alpha channel tops out at 254 rather than 255 across the whole sheet, an
// artefact of whatever exported it. Harmless on screen, but it makes every
// generated PNG carry a useless alpha channel, so it is normalised away here.
const solidify = (buf) =>
  sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      for (let i = 0; i < info.width * info.height; i++) {
        const a = data[i * 4 + 3];
        if (a >= 240) data[i * 4 + 3] = 255;
      }
      return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
        .png()
        .toBuffer();
    });

/** Fit the mark to a transparent square of `size`, constrained by height. */
async function square(markBuf, size) {
  const w = Math.round((MARK.width / MARK.height) * size);
  const scaled = await sharp(markBuf)
    .resize(w, size, { fit: "fill", kernel: "lanczos3" })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: scaled, left: Math.round((size - w) / 2), top: 0 }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Mark centred on an opaque tile, with padding, for app icons. */
async function tile(markBuf, size, pad, background) {
  const inner = size - pad * 2;
  const w = Math.round((MARK.width / MARK.height) * inner);
  const scaled = await sharp(markBuf)
    .resize(w, inner, { fit: "fill", kernel: "lanczos3" })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 3, background } })
    .composite([{ input: scaled, left: Math.round((size - w) / 2), top: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Wrap PNGs in an ICO container. Modern browsers read PNG payloads inside ICO
 * happily, which avoids hand-rolling BMP + AND-mask for each size.
 */
function ico(images) {
  const HEADER = 6;
  const ENTRY = 16;
  const dir = Buffer.alloc(HEADER + ENTRY * images.length);
  dir.writeUInt16LE(0, 0); // reserved
  dir.writeUInt16LE(1, 2); // 1 = icon
  dir.writeUInt16LE(images.length, 4);

  let offset = dir.length;
  images.forEach((img, i) => {
    const p = HEADER + ENTRY * i;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, p); // 0 means 256
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, p + 1);
    dir.writeUInt8(0, p + 2); // palette size
    dir.writeUInt8(0, p + 3); // reserved
    dir.writeUInt16LE(1, p + 4); // colour planes
    dir.writeUInt16LE(32, p + 6); // bits per pixel
    dir.writeUInt32LE(img.buf.length, p + 8);
    dir.writeUInt32LE(offset, p + 12);
    offset += img.buf.length;
  });
  return Buffer.concat([dir, ...images.map((i) => i.buf)]);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const raw = await sharp(SRC).extract(MARK).png().toBuffer();
  const mark = await solidify(raw);

  // The header mark. Displayed at 34px, so 256 covers 3x displays with room.
  fs.writeFileSync(path.join(OUT, "mark.png"), await square(mark, 256));

  // Favicons. 48 is what Chrome actually reaches for on the tab strip at 2x.
  const f16 = await square(mark, 16);
  const f32 = await square(mark, 32);
  const f48 = await square(mark, 48);
  fs.writeFileSync(path.join(OUT, "favicon-16.png"), f16);
  fs.writeFileSync(path.join(OUT, "favicon-32.png"), f32);
  fs.writeFileSync(path.join(OUT, "favicon-48.png"), f48);
  fs.writeFileSync(
    path.join(OUT, "favicon.ico"),
    ico([
      { size: 16, buf: f16 },
      { size: 32, buf: f32 },
      { size: 48, buf: f48 },
    ])
  );

  // iOS home screen. Opaque and unrounded: iOS masks its own corners, and a
  // transparent icon there composites onto black.
  fs.writeFileSync(
    path.join(OUT, "apple-touch-icon.png"),
    await tile(mark, 180, 18, LOGO_NAVY)
  );

  // Android / installable icons.
  fs.writeFileSync(path.join(OUT, "icon-192.png"), await tile(mark, 192, 20, LOGO_NAVY));
  fs.writeFileSync(path.join(OUT, "icon-512.png"), await tile(mark, 512, 54, LOGO_NAVY));

  // Mark plus wordmark, for the social card and anywhere the full lockup is
  // wanted. Kept transparent so it can go on either ground.
  const wm = await solidify(await sharp(SRC).extract(WORDMARK).png().toBuffer());
  const lockW = 900;
  const markH = 520;
  const markW = Math.round((MARK.width / MARK.height) * markH);
  const wmW = 700;
  const wmH = Math.round((WORDMARK.height / WORDMARK.width) * wmW);
  const gap = 46;
  fs.writeFileSync(
    path.join(OUT, "logo-lockup.png"),
    await sharp({
      create: {
        width: lockW,
        height: markH + gap + wmH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        {
          input: await sharp(mark).resize(markW, markH, { fit: "fill" }).png().toBuffer(),
          left: Math.round((lockW - markW) / 2),
          top: 0,
        },
        {
          input: await sharp(wm).resize(wmW, wmH, { fit: "fill" }).png().toBuffer(),
          left: Math.round((lockW - wmW) / 2),
          top: markH + gap,
        },
      ])
      .png({ compressionLevel: 9 })
      .toBuffer()
  );

  for (const f of fs.readdirSync(OUT)) {
    if (/^(mark|favicon|apple-touch|icon-|logo-lockup)/.test(f)) {
      console.log(f.padEnd(24), fs.statSync(path.join(OUT, f)).size + " bytes");
    }
  }
})();
