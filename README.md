# theramnikgroup.com

Website for The Ramnik Group — manganese mining, ferro alloys and solar generation in
Balaghat, Madhya Pradesh. Static HTML and CSS with no build step, bundler or
dependencies; the repository root is what gets served.

## Structure

```
index.html              Home — the three businesses, products, markets, assurance
legacy.html             The discovery of manganese, four generations, milestones, leadership
mining.html             Ramrama mine — open cast and underground, ore-to-graded-ore process
ferro-alloys.html       Plant, product grades, raw material, quality, export markets
sustainability.html     Solar, environment, health and safety, CSR and community
contact.html            Contact routes and enquiry form
404.html                Not-found page
assets/css/style.css    Single stylesheet; design tokens in the :root block at the top
assets/js/main.js       Mobile nav, sticky-header border, scroll reveal
assets/img/mark.svg     Monogram used as logo and favicon
assets/img/photos/      Photograph slots — see the README in that directory
.htaccess               404 page, compression, caching, headers (Apache/LiteSpeed)
robots.txt, sitemap.xml
```

## Where the content came from

All copy is drawn from the recorded briefing with Harsh Trivedi (director), supplied as
`Notes by Gemini` transcript. Nothing was taken from the web. Facts stated on the site
and traceable to that briefing include: the British discovery of manganese during
highway construction; the Ramrama mine; four generations of family mining; the
open cast → underground → shaft → mechanisation progression; the 2005 decision to
integrate forward; the 2007 plant with its rice-husk power plant; 2009 inauguration;
2017 second unit; 2024 third unit with three furnaces; five running furnaces;
22.5 MVA + 12 MVA installed capacity; mine capacity 100,000 t/yr expanding to
250,000 t/yr; alloy output 50,000–60,000 t/yr targeting 150,000 t/yr; 5 MW solar
expanding to 15–25 MW; ~20,000 trees; product grades; ore imported from South Africa,
Gabon and Australia; export destinations; the Japanese long-term agreement; ISO and BIS
certification; Ministry of Mines five-star ratings; the donated college; the group
foundation and the Madhya Pradesh CSR portal.

## Running locally

Any static server. Pages use root-relative paths, so serve rather than opening
`file://`:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Deploying

Deployment is **Hostinger Git deploy**: hPanel pulls this repository and serves it
directly. There is no build step to configure — the repository root *is* the site, so
whatever is on `main` is what gets served.

**Setup in hPanel** — *Websites → your site → Advanced → GIT*:

- Repository: `https://github.com/sreebalakrishnan/theramnikgroup.com`
- Branch: `main`
- Directory: `public_html` (leave the path field empty to deploy to the web root)

Deploying is then the **Deploy** button in hPanel. To make pushes deploy automatically,
copy the webhook URL hPanel shows and add it under *GitHub → Settings → Webhooks* with
content type `application/json`.

Two things worth knowing:

- The site uses **root-relative paths** (`/assets/…`), so it must be deployed to the
  web root. In a subdirectory every stylesheet and link would 404.
- Hostinger deploys the working tree, so `README.md` and `.git` land in the web root
  too. `.htaccess` denies access to them.

**Force HTTPS** is a toggle in hPanel (*Security → SSL*). It is deliberately not done in
`.htaccess` — duplicating that redirect behind Hostinger's proxy is a common cause of
redirect loops.

### `.htaccess`

Sets the styled 404 page, gzip compression, cache lifetimes, and a few security
headers. Every block is wrapped in `<IfModule>`, so a module the server does not load is
skipped rather than throwing a 500.

**Cache busting.** The pages request the stylesheet and script with a version query —
`href="/assets/css/style.css?v=2"`. **Bump that number in every page whenever you edit
`style.css` or `main.js`**, or returning visitors keep the old file:

```bash
# bump v=2 to v=3 across all pages
sed -i 's/style\.css?v=2/style.css?v=3/; s/main\.js?v=2/main.js?v=3/' *.html
```

Nothing here is content-hashed, so nothing is cached as immutable: the stylesheet and
script expire after a week and photographs after a month, which means a forgotten bump
self-heals in days rather than persisting for a year.

### Elsewhere

Any static host works: Netlify, Cloudflare Pages and Vercel need no build command and
publish directory `.`. `.htaccess` is Apache/LiteSpeed only and is ignored by those.

## Before going live

These are the outstanding items, each marked with an HTML comment in the source:

1. **One photograph still missing:** `product.jpg`, finished alloy packed for dispatch.
   The raw-material slot carries an ore photograph instead — accurate, but not the
   product. See `assets/img/photos/README.md`; drop the file in under that name and it
   appears with no HTML editing. A higher-resolution solar frame would also help; the
   one in use is 994px wide against a full-bleed hero.

   Also outstanding: confirm consent for staff who are recognisable in
   `underground.jpg`, `safety.jpg`, `control-room.jpg` and the two award photographs.

   `plantation.jpg` is a band cropped above a GPS Map Camera watermark, so the dense
   foreground rows are cut off and it is only 1143px wide. A clean copy of that frame
   would be a straight improvement.

2. **Contact details are interim.** `rpaplpower@gmail.com` and the office mobile
   `+91 99773 02683` are live on the contact page, in every page footer and in the
   Organization JSON-LD. Switch the mailbox to one on this domain (e.g.
   `info@theramnikgroup.com`) once it exists, updating all three places together. A
   landline can be added alongside the mobile when one is confirmed.

3. **Contact form has no backend.** `action="#"` — point it at Formspree, Netlify Forms,
   Basin or a Worker, or submissions go nowhere.

4. **Legal entity names.** The briefing implies a separate power-and-ferro-alloys
   company (the name combining "power" and "ferro alloys") but the transcript does not
   give it reliably, so the site refers only to "the group". Add the registered entity
   names and the registered office line in the footer when confirmed.

5. **Figures worth a second look.** Installed capacity is shown as 34.5 MVA on the stat
   bands (22.5 + 12) while the body text says "33 to 35 MVA in total", matching how it
   was described. The "100+ years" claim follows the briefing's own framing. Confirm
   both read correctly to the family.

6. **Social preview card.** `assets/img/og-card.jpg` (1200×630) is a typographic
   brand card, referenced as `og:image` from every page. It was made typographic
   because the only photographs then available were portraits. Operations photography
   has since arrived, so a photographic card is now possible — the furnace tapping
   frame (`hero-mine.jpg` / `furnace.jpg`) is the obvious candidate and would make a
   far more arresting link preview. Swapping it means re-scraping the social caches,
   so it is left as a deliberate choice rather than changed silently.

   The card is generated from `assets/img/og-card.source.html`, which reuses the site's
   design tokens. To regenerate after a wording change, open that file at a 1200×630
   viewport and screenshot it, or:

   ```bash
   npx playwright screenshot --viewport-size=1200,630 \
     assets/img/og-card.source.html assets/img/og-card.jpg
   ```

   Social platforms cache aggressively — after changing the card, re-scrape the URL
   with Facebook's Sharing Debugger or LinkedIn's Post Inspector to force a refresh.

7. **The map embed is approximate.** The "Get directions" link on the contact page
   uses the exact pin supplied by the group and is always correct. The embedded frame
   beside it is built from a place-name query, because the short link could not be
   resolved to coordinates from the build environment. To pin it exactly: Google Maps
   → Share → Embed a map → Copy HTML, then replace the iframe `src` in `contact.html`
   with the `https://www.google.com/maps/embed?pb=...` URL, keeping `loading="lazy"`
   and the `title` attribute.

## Editing

Colours, type scale, spacing and container width are custom properties in the `:root`
block at the top of `assets/css/style.css`. The accent is deliberately split: `--ember`
for decoration, `--ember-text` for small type (it clears WCAG AA on every paper tone),
`--ember-lit` on dark sections. Changing `--ember` alone will not break contrast;
changing `--ember-text` might, so re-check it.

Header and footer are duplicated in each page. If that becomes tedious, the site is
small enough to move to Eleventy or Astro with layouts and no other changes.

The JavaScript is progressive enhancement only. With it disabled the site stays fully
readable and navigable: reveal animations are gated behind a `.js` class so nothing is
hidden, and the mobile menu falls back to in-flow links.

## Verified

Checked in Chromium at 1440px and 390px across all pages: no console errors, no
horizontal overflow, mobile menu opens and closes on Escape and link click, one `h1`
per page, no heading-level jumps, no duplicate IDs, every form control labelled, no
broken internal links, and every rendered text/background pair meets WCAG AA (verified
against computed styles, not just the token list).
