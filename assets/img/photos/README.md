# Photographs

Files here are referenced by literal path from the HTML. Keep the filenames exactly as
listed — dropping a replacement in under the same name swaps the picture with no HTML
editing. A missing file degrades to a dark graphite placeholder rather than breaking.

## In use

| Filename | Where it appears | Subject |
|---|---|---|
| `hero-mine.jpg` | Home — full-bleed hero | Furnace tapping at dusk |
| `ramrama.jpg` | Home — legacy section (3:4) | Mine headgear at Ramrama |
| `directors.jpg` | Legacy — leadership band; home page | Both directors together |
| `nischal-trivedi.jpg` | Legacy — leadership bio (4:5) | Nischal Trivedi |
| `harsh-trivedi.jpg` | Legacy — leadership bio (4:5) | Harsh Trivedi |
| `plant.jpg` | Legacy — forward integration (3:4) | Plant structure |
| `opencast.jpg` | Mining — full-bleed hero | Haul road through the open cast workings |
| `underground.jpg` | Mining — operations pair (4:3) | Underground working |
| `crushing.jpg` | Mining — operations pair (4:3) | Graded ore stacks |
| `furnace.jpg` | Ferro Alloys — full-bleed hero | Tapping, three furnace bays |
| `ore-stacks.jpg` | Ferro Alloys — raw material (4:3) | Ore stacked by grade |
| `control-room.jpg` | Ferro Alloys — quality section (4:3) | Process control room |
| `plant-panorama.jpg` | Ferro Alloys — the plant section (27:10) | The works at Sarandi seen from the main gate |
| `pollution-control.jpg` | Sustainability — environment (16:9) | Pollution control plant and stack |
| `safety.jpg` | Sustainability — health & safety (3:4) | Team in protective equipment |
| `solar.jpg` | Sustainability — full-bleed hero | Solar array on worked-out ground |
| `award-five-star.jpg` | Mining — recognition section (3:2) | The Ministry of Mines five-star rating being presented |
| `award-safety-week.jpg` | Mining — recognition section (3:2) | Award presented at Mine Safety Week 2019 |
| `award-five-star-trophy.jpg` | Mining — recognition section (3:4) | The Indian Bureau of Mines five-star trophy, 2017–18 |
| `award-fmpcci.jpg` | Mining — recognition section (3:4) | FMPCCI Outstanding Achievement trophy, 2014 |
| `award-environment.jpg` | Sustainability — environment (4:3) | Framed Madhya Pradesh environment award citation, 2016–17 |
| `plantation.jpg` | Sustainability — environment (16:7) | Dense plantation of young saplings on worked ground |
| `og-card.jpg` | *(in `assets/img/`)* social preview | Typographic brand card |

## Still wanted

| Filename | Where it would appear | What it needs to show |
|---|---|---|
| `product.jpg` | Ferro Alloys | Finished alloy sized, bagged and packed for dispatch. The raw-material slot currently carries an ore photograph instead, which is accurate but is not the product. |

A **higher-resolution solar frame** would also be welcome. The one supplied is 1032×774
before its decorative border is trimmed, leaving 994px to fill a full-bleed hero. The
dark scrim hides most of the softness, but anything 2000px+ would sharpen it on large
displays.

## Preparing replacements

- **Format**: JPEG, keeping the `.jpg` extension — the paths in the HTML are literal.
- **Heroes** (`hero-mine`, `opencast`, `furnace`, `solar`): landscape, 2000px+ wide. They
  sit behind a dark scrim with headline text over the left, so leave the left third free
  of busy detail.
- **Portrait crops** (`ramrama`, `plant`, `safety`): 3:4, 1200px+ wide.
- **Headshots** (`nischal-trivedi`, `harsh-trivedi`): 4:5, 800px+ wide, anchored to the
  top of the frame so headroom is kept. Both cropped alike or the pair looks mismatched.
- **Standard slots** (`underground`, `crushing`, `ore-stacks`, `control-room`): 4:3,
  1400px+ wide.
- **Weight**: compress to roughly 150–250 KB. These load on first paint and the site has
  no image pipeline to do it for you. The originals supplied were 1600px JPEGs of
  200–560 KB; re-encoding at quality ~80 after cropping lands in the right range.

## Notes on the supplied set

- Twenty-two frames were supplied. Several were near-duplicates of the same subject —
  four of the headgear tower, three of the pollution control building, three of the
  furnace tapping, three of the ore stacks — and one of each was chosen. The unused
  frames remain in the source folder if a different pick is preferred.
- `plantation.jpg` is cropped out of a frame carrying a "GPS Map Camera" watermark burned
  into it. The watermark — logo, then a panel of coordinates — begins at row 507 of the
  1600×900 original, so the clean area is the top 500 rows; the published band is
  `extract({left:457, top:0, width:1143, height:500})`, which is exactly 16:7 and frames
  the embankment rather than the sky-heavy left half. It is therefore only 1143px wide,
  under the 1120px container at 1× and soft on retina. **If a clean copy of this photo
  exists, it should replace the crop** — the foreground rows of saplings, the part that
  actually shows the density, are behind the watermark and are lost here. The original's
  own stamp reads Waraseoni, Balaghat, 07/05/2022, which is where the caption's place and
  date come from.
- `award-five-star.jpg` is the Ministry of Mines five-star rating being presented by
  Prahlad Joshi, Union Minister of Mines, to Nischal Trivedi and Harsh Trivedi at the
  Conclave on Mines and Minerals in New Delhi — identified by the client. It is the one
  photograph that evidences the five-star claim the page makes, so it leads the section.
- Ten award frames were supplied; one of the Mine Safety Week set is used. The three
  strongest were published at first and cut back to one at the client's request — they
  record the same presentation from adjacent angles, so the other two added nothing.
  All ten are from the same ceremony —
  the banner reads Mine Safety Week 2019, held under the Directorate of Mines Safety,
  Western Zone, Nagpur regions 1 and 2, hosted by MSMC. That is a **safety** award and
  is separate from the Ministry of Mines five-star rating the page also mentions; the
  copy and caption keep the two apart deliberately. Nothing on the trophies themselves
  is legible, so no specific award title is claimed.
- A further nine frames were supplied later, photographs of the award objects rather
  than of ceremonies. They are three awards, not nine: the Indian Bureau of Mines
  five-star trophy (two frames), the Madhya Pradesh state environment award (three of the
  trophy, three of the framed citation) and the FMPCCI trophy (one). One frame of each
  is used, chosen by which inscription reads best. The inscriptions were transcribed at
  magnification, and every date, entity and awarding body on the site comes from that
  reading — nothing about these awards was looked up.
- The FMPCCI trophy photograph is the weakest of the set: it is shot through an acrylic
  case with the photographer reflected in it, and the visible face names no recipient. It
  is published because the award is real and the client supplied it as theirs, but a
  cleaner photograph would be worth having.
- `plant-panorama.jpg` is a 2068x760 panorama, trimmed 8px each side to sit exactly in
  the 27:10 `.photo--pano` slot rather than letting `cover` choose the crop. **The gate in
  it carries the old Ramnik mark**, not the hexagon now used across the site — the
  photograph is honest and worth publishing, but the signage and the website no longer
  agree, and a reshoot would be worth having once the gate is redone.
  On screens under 640px the slot switches to 16:9 and crops the ends: at 2.7:1 a phone
  gets a 130px strip in which nothing reads. Anything else put in this slot must be framed
  centrally for the same reason.
- The solar frame arrived with a decorative rounded border baked in by a photo app. It
  was detected by walking in from each edge until the rows and columns stopped being
  uniformly light — 16px on all four sides — and trimmed before cropping.
- Several frames show identifiable staff. Only those where people appear at a working
  distance were used; a close portrait of an individual worker was left out. Confirm
  consent for anyone recognisable before launch — this applies to `underground.jpg`,
  `safety.jpg`, `control-room.jpg` and the two award photographs in particular. One
  person appears in `plant-panorama.jpg`, turned away and small enough in frame not to
  be identifiable at any size the site renders.

## Adding a new slot

```html
<figure>
  <div class="photo" role="img" aria-label="Describe the photograph"
       style="background-image:url('/assets/img/photos/filename.jpg')"></div>
  <figcaption class="photo-caption">Short caption</figcaption>
</figure>
```

Add `photo--tall` for 3:4, `photo--16x9`, `photo--3x2`, `photo--wide` for 16:7, or
`photo--pano` for 27:10 panoramas. Update the `aria-label` to describe what is actually in
the picture — that text is what a screen reader announces.

**If you touch `style.css` to add a slot, bump the `?v=` query in every page** or returning
visitors keep the old stylesheet and the new aspect ratio never applies:

```bash
sed -i 's/style\.css?v=3/style.css?v=4/; s/main\.js?v=3/main.js?v=4/' *.html
```
