# Photographs

Files here are referenced by literal path from the HTML. Keep the filenames exactly as
listed — dropping a replacement in under the same name swaps the picture with no HTML
editing. A missing file degrades to a dark graphite placeholder rather than breaking.

## In use

| Filename | Where it appears | Subject |
|---|---|---|
| `hero-mine.jpg` | Home — full-bleed hero | Furnace tapping at dusk |
| `ram-rama.jpg` | Home — legacy section (3:4) | Mine headgear at Ram Rama |
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
| `pollution-control.jpg` | Sustainability — environment (16:9) | Pollution control plant and stack |
| `safety.jpg` | Sustainability — health & safety (3:4) | Team in protective equipment |
| `og-card.jpg` | *(in `assets/img/`)* social preview | Typographic brand card |

## Still wanted

| Filename | Where it would appear | What it needs to show |
|---|---|---|
| `solar.jpg` | **Sustainability — full-bleed hero** | The solar farm on former dump / vacant mine land. This is the most visible gap on the site: the sustainability page leads on solar (5 MW today, 15–25 MW planned) and its hero is currently a plain gradient. Wants a wide landscape frame, 2000px+, left third free of busy detail. |
| `product.jpg` | Ferro Alloys | Finished alloy sized, bagged and packed for dispatch. The raw-material slot currently carries an ore photograph instead, which is accurate but is not the product. |

## Preparing replacements

- **Format**: JPEG, keeping the `.jpg` extension — the paths in the HTML are literal.
- **Heroes** (`hero-mine`, `opencast`, `furnace`, `solar`): landscape, 2000px+ wide. They
  sit behind a dark scrim with headline text over the left, so leave the left third free
  of busy detail.
- **Portrait crops** (`ram-rama`, `plant`, `safety`): 3:4, 1200px+ wide.
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
- One frame (plantation beside water) carries a "GPS Map Camera" watermark burned into
  the middle of the image and was not used for that reason. If a clean copy exists it
  would suit the sustainability page well.
- Several frames show identifiable staff. Only those where people appear at a working
  distance were used; a close portrait of an individual worker was left out. Confirm
  consent for anyone recognisable before launch — this applies to `underground.jpg`,
  `safety.jpg` and `control-room.jpg` in particular.

## Adding a new slot

```html
<figure>
  <div class="photo" role="img" aria-label="Describe the photograph"
       style="background-image:url('/assets/img/photos/filename.jpg')"></div>
  <figcaption class="photo-caption">Short caption</figcaption>
</figure>
```

Add `photo--tall` for 3:4, `photo--16x9`, or `photo--wide` for 16:7. Update the
`aria-label` to describe what is actually in the picture — that text is what a screen
reader announces.
