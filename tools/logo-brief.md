# The Ramnik Group — logo brief

Everything below is drawn from the recorded briefing with Harsh Trivedi and from documents
the family supplied (the ISO 9001 certificate, the award plaques). Nothing is invented and
nothing is taken from the web. Figures match what the website already says.

Live reference: the site at `theramnikgroup.com`, whose design tokens are in
`assets/css/style.css`.

---

## 0. Status — a mark has been delivered

**A logo has since come back and is now live on the site.** Sections 1–8 remain the record
of what was asked for; sections 9 and 10 are still useful if further variants are
generated. Section 11 has been rewritten to say what actually arrived.

The delivered mark is a **pointy-top hexagon** containing, top to bottom:

| Element | Business |
|---|---|
| Sun with rays, amber | Solar generation |
| Two silver ingot bars | Ferro alloys |
| Angular crystalline ore | Manganese mining |

It answers the brief squarely: all three businesses are in one mark, the reading is
mineral and industrial rather than corporate, and the hexagon gives it a silhouette that
survives being shrunk. Supplied with a `RAMNIK` wordmark and two alternate treatments
(solid monochrome, and a reversed knockout on a dark tile).

### How it did against the constraints in section 4

| Rule | Verdict |
|---|---|
| Reads at 16 px | **Partly.** The detail dissolves, but the silhouette and the amber-over-dark structure still identify it. The solid and reversed variants fail here — they turn to grey noise below about 24 px, so every icon on the site is generated from the **full-colour** mark. |
| Works on both grounds | **Yes.** Legible on the ink header and on paper. |
| Roughly square | **Yes** — 615 × 711, near enough. Padded to a square canvas so the header box is unchanged. |
| Vector SVG | **No — outstanding.** Delivered as a 1024 × 1536 raster sheet. See section 11. |
| One accent colour | **Yes**, amber, plus steel greys and charcoal. |

### The delivered palette against the site's

Sampled from the artwork, not guessed:

| | Logo | Site token | Note |
|---|---|---|---|
| Accent | `#E18D02` | `--ember` `#B4611F` | The logo's amber is brighter and more yellow than the site's burnt orange. |
| Dark | `#202A31` | `--ink` `#15181c` | The logo's charcoal is lighter and cooler — blue-grey against near-neutral. |
| Steel | `#4A555D` – `#9AA3AA` | *(none)* | New to the identity; the site had no metal tone. |

They sit together without clashing, so nothing on the site was restyled. If you want them
to match exactly, the change to make is `--ember`, which is decorative only and safe to
move. **Do not** shift `--ember-text` or `--ember-lit` without re-checking contrast — those
carry small type on five different surfaces.

---

## 1. The company, in one paragraph

The Ramnik Group is a family business in Balaghat district, Madhya Pradesh, India, that has
mined manganese for over a hundred years across four generations. The British found
manganese in the district while building a highway; the family has worked it ever since.
The group now does three things: it mines manganese ore at Ramrama, it smelts that ore into
ferro alloys at its plant at Sarandi, and it generates its own power — first from rice husk,
now increasingly from solar farms built on worked-out mine land. It supplies Indian steel
mills and exports, including a long-term agreement with a Japanese buyer.

## 2. The three businesses

| | | |
|---|---|---|
| **Mining** | Ramrama manganese mine, open cast and underground | 100,000 t/yr, expanding to 250,000 |
| **Ferro alloys** | Sarandi plant — silico manganese and ferro manganese | Five furnaces, ~34.5 MVA |
| **Power** | Solar on former mine dumps; began with rice-husk captive power in 2007 | 5 MW today, 15–25 MW planned |

Two registered entities sit under the group name: **A. P. Trivedi & Sons** (the mining
business) and **Ramnik Power and Alloys Pvt. Ltd.** (power and alloys). The logo is for the
group, not for either company.

## 3. What the brand is

This is a **hundred-year industrial family business, not a startup**. Its credibility comes
from duration and from documents: a five-star rating from the Indian Bureau of Mines for the
Ramrama mine, a Madhya Pradesh state environment award, ISO 9001:2015, mine safety awards,
a Japanese buyer who audits them. The website's whole voice is evidence over adjectives.

Words that fit: **durable, worked, earned, precise, unshowy, mineral, hot, patient.**

Words that do not: disruptive, dynamic, global-vision, synergy, innovative.

The existing site is restrained and documentary — serif headlines, sans body, dark charcoal
and warm off-white, one ember-orange accent, generous white space, photographs of actual
furnaces and actual ore. The logo has to belong to that, not to a slide deck.

## 4. Hard constraints

1. **It must read at 16 px.** The mark is the favicon and it sits at 34 × 34 in the site
   header. No fine detail, no hairlines, no gradients, no more than two tones.
2. **It must work on both grounds** — on near-black `#15181c` and on warm off-white
   `#faf9f7`. Design it so it survives being solid one-colour in either direction.
3. **Roughly square, or a compact vertical.** It sits immediately left of a two-line
   wordmark: *The Ramnik Group* in a serif, above `MINING · FERRO ALLOYS · POWER` in small
   letterspaced caps. The mark must not fight that.
4. **Vector, delivered as SVG**, with a flat fill — no embedded raster, no filters.
5. **One accent colour maximum**, plus the dark and the paper.

## 5. Palette (already in use across the site)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#15181c` | Near-black. Header, dark sections, the current mark's ground. |
| `--paper` | `#faf9f7` | Warm off-white. Page background. |
| `--ember` | `#b4611f` | The accent — burnt orange, the colour of hot metal. Decorative use. |
| `--ember-lit` | `#e0a04f` | Lighter ember, used **on dark**. The current mark's letterform. |
| `--ember-text` | `#964f18` | Darker ember, for small type on light. |

A logo in ink + ember is on-brand by default. Straying from this family means restyling the
whole site, so treat it as fixed unless you deliberately want that.

## 6. What is being replaced

The current mark (`assets/img/mark.svg`) is a dark rounded square holding an ember letter
**R** in a plain geometric face. It is a placeholder: legible, correctly coloured, and doing
no work at all. It says nothing about manganese, about a century, or about heat. Replacing
it is the point of this exercise.

## 7. Symbolic material that is actually true

Pick from these rather than inventing a story:

- **Manganese ore** — dark, dense, crystalline; breaks with angular faces.
- **The five-pointed star** — the mine holds a Ministry of Mines / Indian Bureau of Mines
  five-star rating. A star is earned here, not decorative.
- **The furnace tap** — molten alloy running from a furnace. This is where the ember colour
  comes from and it is the most visually arresting thing the group does.
- **Strata / benches** — the stepped terraces of an open cast working; also reads as layers
  of time, which suits four generations.
- **Sun over worked ground** — solar panels laid on former mine dumps. Land used twice.
- **The letter R** — the incumbent idea, and the safest.

## 8. What to avoid

- Crossed pickaxes, hard hats, mine carts, and other mining clip art.
- A globe with a swoosh, or an orbit ring.
- Gradient meshes, 3D bevels, glassy highlights, drop shadows.
- A green leaf as the sustainability signal — the group's environmental case is a state
  award and 20,000 trees, not a sticker.
- Anything that would look at home on a SaaS landing page.
- Sanskrit or Devanagari lettering used decoratively. The group is Indian and does not need
  to perform it.

---

## 9. Ready-to-paste prompts

Three directions. Each is written to be pasted whole into an image or logo generator. Run
each several times; they are starting points, not specifications.

### Direction A — monogram, the safe evolution

```
A minimalist vector logo mark for a hundred-year-old Indian manganese mining and
ferro alloys family business. A single letter "R" as a solid geometric monogram,
built from angular facets like a broken mineral crystal rather than from smooth
curves. The counter of the R reads as a cleaved face. Flat two-tone: burnt ember
orange #b4611f on near-black #15181c. Contained in a square with a very slight
corner radius. Absolutely flat — no gradient, no bevel, no shadow, no texture.
Must remain legible at 16 pixels. Confident, industrial, understated; the mark of
an old firm, not a startup. Vector, clean edges, generous negative space.
```

### Direction B — abstract, strata and heat

```
A minimalist abstract vector logo mark for a manganese mining, ferro alloys and
solar power group in Madhya Pradesh, India. Horizontal stepped bands suggesting
the benches of an open cast mine, stacked like geological strata. The lowest band
glows ember orange like molten metal being tapped from a furnace; the bands above
are near-black. Four bands, for four generations. Strictly geometric, flat, no
gradient, no perspective, no 3D. Square format, high contrast, legible at 16
pixels. Colours: near-black #15181c and burnt ember #b4611f on warm off-white
#faf9f7. Restrained and industrial, in the manner of a mid-century mark for a
heavy industry company.
```

### Direction C — the earned star

```
A minimalist vector logo mark for an Indian manganese mine that holds a government
five-star rating. A single five-pointed star, drawn with hard straight edges as if
cut from stone rather than rounded, sitting on or emerging from three stacked
horizontal bars that read as mine benches. The star is ember orange #b4611f; the
bars are near-black #15181c. Completely flat, no gradient, no outline, no shadow.
Square, symmetrical, weighted toward the base so it feels planted rather than
floating. Legible at 16 pixels. Serious, institutional, earned — closer to a
certification seal than to a consumer brand.
```

### Modifier lines to append

- Force a light ground: `Render on a warm off-white #faf9f7 background, mark in near-black and ember.`
- Force a single colour: `Single colour only — solid ember orange on near-black, no second tint.`
- Force simplicity: `Extremely reduced. No more than five distinct shapes in the entire mark.`
- Force a wordmark lockup: `Beside the mark, set "THE RAMNIK GROUP" in a restrained serif, and beneath it "MINING · FERRO ALLOYS · POWER" in small letterspaced capitals.`

---

## 10. How to judge what comes back

1. **Shrink it to 16 px** and look. Most generated logos die here. This is the single most
   useful test.
2. **Fill it solid black, then solid white.** If it stops working, it is relying on colour
   to do structural work.
3. **Put it on the actual site header** — dark `#15181c` bar, wordmark to its right. A mark
   that looks good in isolation often crowds the wordmark.
4. **Ask what it claims.** The group's whole case is that it does not overstate. A logo that
   promises more than a hundred-year manganese business delivers is off-brand even if it is
   handsome.

## 11. What arrived, and what is still outstanding

### Arrived

One raster sheet, 1024 × 1536 PNG with transparency, holding the full-colour mark
(615 × 711), the `RAMNIK` wordmark, and three small variants. Kept at
`tools/logo-source.png`; everything on the site is generated from it by
`tools/make-logo-assets.js`.

### Generated from it and now live

| File | Use |
|---|---|
| `assets/img/mark.png` | 256 px square, transparent. Site header and footer, shown at 34 px. |
| `assets/img/favicon.ico` | 16 / 32 / 48 in one container, for the browser tab. |
| `assets/img/favicon-16.png`, `-32.png`, `-48.png` | Explicit sizes for modern browsers. |
| `assets/img/apple-touch-icon.png` | 180 px, opaque on the logo's own charcoal — iOS composites transparency onto black. |
| `assets/img/icon-192.png`, `icon-512.png` | Android and installable icons, via `site.webmanifest`. |
| `assets/img/logo-lockup.png` | Mark over wordmark, transparent. |
| `assets/img/og-card.jpg` | Social preview, rebuilt with the new mark. |

### Still outstanding

1. **Vector originals.** This is the real gap. Everything above is derived from a raster,
   which is fine at icon sizes and on screen but will not hold up printed, embroidered,
   cut for signage, or blown up. Ask for `.svg` (or `.ai` / `.eps`) of:
   - the mark alone,
   - the mark-plus-wordmark lockup,
   - the single-colour version.
2. **A wordmark that says the full name.** The supplied wordmark reads `RAMNIK`; the
   company is *The Ramnik Group*. The site header therefore keeps its own serif wordmark
   and uses only the hexagon. Worth asking whether a full-name lockup exists.
3. **A purpose-drawn 16 px icon,** if the softness in the tab bothers you. The current
   favicon is the full mark scaled down; a simplified version — hexagon, sun arc, one bar,
   ore triangle, nothing else — would be crisper. Optional, not required.
4. **Re-scrape the social caches.** The OG card changed, so run the URL through Facebook's
   Sharing Debugger and LinkedIn's Post Inspector or old previews will persist.
