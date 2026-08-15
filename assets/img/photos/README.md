# Photographs

Drop the files below into this directory using **exactly these filenames** and they
appear on the site automatically — no HTML editing needed. Until a file is present the
page shows a dark graphite placeholder in its place, so nothing breaks in the meantime.

| Filename | Where it appears | What it should show |
|---|---|---|
| `hero-mine.jpg` | Home — full-bleed hero | Wide or aerial view of the open cast workings |
| `ram-rama.jpg` | Home — legacy section (portrait crop) | The Ram Rama mine; a historic frame works well here |
| `plant.jpg` | Legacy — forward integration (portrait crop) | The ferro alloys plant, exterior or furnace floor |
| `opencast.jpg` | Mining — full-bleed hero | Open cast working, machinery in frame |
| `underground.jpg` | Mining — operations pair | Underground working, incline or shaft |
| `crushing.jpg` | Mining — operations pair | Crushing and sizing, or stacked grade piles |
| `furnace.jpg` | Ferro Alloys — full-bleed hero | Furnace floor, tapping, or molten metal |
| `product.jpg` | Ferro Alloys — raw material section | Finished alloy sized and packed for dispatch |
| `solar.jpg` | Sustainability — full-bleed hero | The solar farm on former dump / vacant mine land |
| `safety.jpg` | Sustainability — health & safety (portrait crop) | Protective equipment, training, or a toolbox talk |
| `nishal-trivedi.jpg` | Legacy — leadership | Headshot of Nishal Trivedi |
| `harsh-trivedi.jpg` | Legacy — leadership | Headshot of Harsh Trivedi |

## Preparing the files

- **Format**: JPEG. Keep the `.jpg` extension — the paths in the HTML are literal.
- **Hero images** (`hero-mine`, `opencast`, `furnace`, `solar`): landscape, at least
  2000px wide. They sit behind a dark scrim with text over the left side, so leave the
  left third free of busy detail.
- **Portrait crops** (`ram-rama`, `plant`, `safety`): roughly 3:4, at least 1200px wide.
- **Standard slots** (`underground`, `crushing`, `product`): roughly 4:3, at least
  1400px wide.
- **Headshots** (`nishal-trivedi`, `harsh-trivedi`): 4:5 portrait, at least 800px wide.
  The slot anchors to the top of the frame, so leave headroom above rather than
  cropping tight to the hairline. Both directors should be shot and cropped the same
  way or the pair looks mismatched.
- **Weight**: compress to around 200–400 KB each. These load on first paint and the
  site has no image pipeline to do it for you.

Faces of identifiable workers should only be used with their consent.

## Swapping in more slots

Each slot in the HTML looks like this, and can be copied:

```html
<figure>
  <div class="photo" role="img" aria-label="Describe the photograph"
       style="background-image:url('/assets/img/photos/filename.jpg')"></div>
  <figcaption class="photo-caption">Short caption</figcaption>
</figure>
```

Add `photo--tall` for a 3:4 crop or `photo--wide` for 16:7. Update the `aria-label` to
describe what is actually in the picture — that text is what a screen reader announces.
