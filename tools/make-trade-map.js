// Generates assets/img/trade-map.svg — the flow map on the home page markets
// section. Run from the repository root after installing the three build-only
// dependencies (they are not needed to serve the site):
//
//   npm install --no-save world-atlas topojson-client d3-geo
//   node tools/make-trade-map.js
//
// Edit the EXPORTS and IMPORTS arrays below to change destinations, then
// re-run. The two series colours were checked against a colour-vision-
// deficiency validator for the dark surface they sit on; if you change them,
// check the replacements rather than picking by eye.

const fs = require("fs");
const { geoNaturalEarth1, geoPath } = require("d3-geo");
const topojson = require("topojson-client");

const W = 1040, H0 = 640;   // H0 is the fitting canvas; the map is cropped to H below

// Validated dark-mode categorical pair (see dataviz validator run):
// all six checks pass, worst-case CVD ΔE 21.2.
const OUT = "#c8802c";   // exports leaving Balaghat
const IN  = "#4a97cc";   // ore arriving for processing
const LAND = "#252b31";
const LAND_EDGE = "#333b43";
const INK_TEXT = "#c9c6c1";       // text token, never a series colour
const INK_TEXT_DIM = "#8d9299";

const world = JSON.parse(fs.readFileSync(require.resolve("world-atlas/land-110m.json")));
const land = topojson.feature(world, world.objects.land);

// Rotated so India sits centre-right: the Americas stay on-map to the west and
// Japan/Australia to the east, so no arc runs off the edge.
const projection = geoNaturalEarth1()
  .rotate([-25, 0])
  .fitExtent([[8, 26], [W - 8, H0 - 20]], { type: "Sphere" });
const path = geoPath(projection);

const ORIGIN = [80.18, 21.81]; // Balaghat, Madhya Pradesh

// Regional endpoints are representative points, not precise destinations —
// the caption says so, and the country list beneath the figure is authoritative.
const EXPORTS = [
  { name: "Europe",          at: [10, 50],    anchor: "end",    dx: -9,  dy: -7 },
  { name: "The Americas",    at: [-90, 38],   anchor: "middle", dx:  0,  dy: -14 },
  { name: "Middle East",     at: [50, 26],    anchor: "end",    dx: -9,  dy: -3 },
  { name: "Africa",          at: [37, 1],     anchor: "middle", dx:  0,  dy: 17 },
  { name: "Bangladesh",      at: [90.4, 23.8],anchor: "start",  dx:  8,  dy: -8 },
  { name: "South East Asia", at: [106, 8],    anchor: "start",  dx:  9,  dy: 13 },
  { name: "South Korea",     at: [127, 37.6], anchor: "start",  dx:  9,  dy: -4 },
  { name: "Japan",           at: [139.7, 35.7],anchor: "start", dx:  9,  dy: 12 },
];

const IMPORTS = [
  { name: "South Africa", at: [26, -28],  anchor: "middle", dx: 0,  dy: 19 },
  { name: "Gabon",        at: [11, -1],   anchor: "end",    dx: -9, dy: 4 },
  { name: "Australia",    at: [130, -25], anchor: "middle", dx: 0,  dy: 20 },
];

const p = (lonlat) => projection(lonlat);
const r2 = (n) => Math.round(n * 10) / 10;

// Arc with a consistent leftward bow, trimmed at both ends so it starts clear of
// the origin dot and stops short of the destination dot (room for the arrowhead).
function arc(a, b, bow = 0.22, trimStart = 7, trimEnd = 9) {
  const [x1, y1] = a, [x2, y2] = b;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const sx = x1 + ux * trimStart, sy = y1 + uy * trimStart;
  const ex = x2 - ux * trimEnd,   ey = y2 - uy * trimEnd;
  const mx = (sx + ex) / 2, my = (sy + ey) / 2;
  // perpendicular offset
  const cx = mx + -(ey - sy) * bow, cy = my + (ex - sx) * bow;
  return {
    d: `M${r2(sx)},${r2(sy)} Q${r2(cx)},${r2(cy)} ${r2(ex)},${r2(ey)}`,
    end: [ex, ey], ctrl: [cx, cy], start: [sx, sy],
  };
}

// Arrowhead as a triangle pointing along the curve's final tangent.
function head(tipx, tipy, fromx, fromy, color, size = 7) {
  const ang = Math.atan2(tipy - fromy, tipx - fromx);
  const a1 = ang + Math.PI - 0.42, a2 = ang + Math.PI + 0.42;
  const p1 = [tipx + Math.cos(a1) * size, tipy + Math.sin(a1) * size];
  const p2 = [tipx + Math.cos(a2) * size, tipy + Math.sin(a2) * size];
  return `<path d="M${r2(tipx)},${r2(tipy)} L${r2(p1[0])},${r2(p1[1])} L${r2(p2[0])},${r2(p2[1])} Z" fill="${color}"/>`;
}

const H = Math.round(projection([0, -57])[1] + 16);   // drop Antarctica
const O = p(ORIGIN);
let out = [];

// ---- land -------------------------------------------------------------
const landPath = path(land).replace(/(\d+\.\d{2})\d+/g, "$1"); // trim precision
out.push(`<path d="${landPath}" fill="${LAND}" stroke="${LAND_EDGE}" stroke-width="0.6"/>`);

// ---- arcs -------------------------------------------------------------
// Exports: solid, arrowhead at the destination (leaving Balaghat).
let exportArcs = "", exportHeads = "", exportDots = "", exportLabels = "";
for (const d of EXPORTS) {
  const t = p(d.at);
  const a = arc(O, t);
  exportArcs += `<path d="${a.d}" fill="none" stroke="${OUT}" stroke-width="1.6" stroke-linecap="round" opacity="0.9"/>`;
  exportHeads += head(t[0] - (t[0] - a.end[0]) * 0.15, t[1] - (t[1] - a.end[1]) * 0.15, a.ctrl[0], a.ctrl[1], OUT);
  exportDots += `<circle cx="${r2(t[0])}" cy="${r2(t[1])}" r="3" fill="${OUT}"/>`;
  exportLabels += `<text x="${r2(t[0] + d.dx)}" y="${r2(t[1] + d.dy)}" text-anchor="${d.anchor}" fill="${INK_TEXT}" font-size="13">${d.name}</text>`;
}

// Imports: dashed, arrowhead at Balaghat (ore arriving to be processed).
let importArcs = "", importHeads = "", importDots = "", importLabels = "";
for (const d of IMPORTS) {
  const s = p(d.at);
  const a = arc(s, O, 0.22, 9, 11);
  importArcs += `<path d="${a.d}" fill="none" stroke="${IN}" stroke-width="1.6" stroke-dasharray="5 4" stroke-linecap="round" opacity="0.95"/>`;
  importHeads += head(a.end[0], a.end[1], a.ctrl[0], a.ctrl[1], IN);
  importDots += `<circle cx="${r2(s[0])}" cy="${r2(s[1])}" r="3" fill="${IN}"/>`;
  importLabels += `<text x="${r2(s[0] + d.dx)}" y="${r2(s[1] + d.dy)}" text-anchor="${d.anchor}" fill="${INK_TEXT}" font-size="13">${d.name}</text>`;
}

out.push(importArcs, exportArcs, importHeads, exportHeads, importDots, exportDots);

// ---- origin -----------------------------------------------------------
out.push(`
  <circle cx="${r2(O[0])}" cy="${r2(O[1])}" r="12" fill="${OUT}" opacity="0.16"/>
  <circle cx="${r2(O[0])}" cy="${r2(O[1])}" r="5.5" fill="#faf9f7" stroke="${LAND}" stroke-width="1.5"/>
  <text x="${r2(O[0])}" y="${r2(O[1] + 24)}" text-anchor="middle" fill="#faf9f7" font-size="14" font-weight="600">Balaghat</text>
  <text x="${r2(O[0])}" y="${r2(O[1] + 40)}" text-anchor="middle" fill="${INK_TEXT_DIM}" font-size="11.5" letter-spacing="0.12em">MADHYA PRADESH</text>
`);

out.push(importLabels, exportLabels);

// ---- legend -----------------------------------------------------------
// Two series, so a legend is always present; direction and dash pattern carry
// the same distinction, so identity never rests on colour alone.
out.push(`
  <g transform="translate(20, 18)">
    <line x1="0" y1="0" x2="30" y2="0" stroke="${OUT}" stroke-width="1.6" stroke-linecap="round"/>
    ${head(36, 0, 24, 0, OUT, 6)}
    <text x="46" y="4.5" fill="${INK_TEXT}" font-size="13">Alloys we ship out</text>
    <line x1="188" y1="0" x2="218" y2="0" stroke="${IN}" stroke-width="1.6" stroke-dasharray="5 4" stroke-linecap="round"/>
    ${head(224, 0, 212, 0, IN, 6)}
    <text x="234" y="4.5" fill="${INK_TEXT}" font-size="13">Ore we bring in</text>
  </g>
`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="tm-t tm-d" text-rendering="optimizeLegibility" font-family="ui-sans-serif, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
<title id="tm-t">Trade routes to and from Balaghat</title>
<desc id="tm-d">A world map centred on Balaghat in Madhya Pradesh, India. Solid lines run outward to export destinations in Europe, the Americas, the Middle East, Africa, Bangladesh, South East Asia, South Korea and Japan. Dashed lines run inward from manganese ore sources in South Africa, Gabon and Australia.</desc>
<style>text{paint-order:stroke;stroke:#15181c;stroke-width:3.2px;stroke-linejoin:round}</style>
${out.join("\n")}
</svg>`;

fs.writeFileSync(require("path").join(__dirname, "..", "assets", "img", "trade-map.svg"), svg);
console.log("written:", Math.round(svg.length / 1024) + " KB");
