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
gallery.html            Photographs — the album, with a lightbox
ja/index.html           Japanese summary landing page
de/index.html           German summary landing page
contact.html            Contact routes and enquiry form
404.html                Not-found page
assets/css/style.css    Single stylesheet; design tokens in the :root block at the top
assets/js/main.js       Mobile nav, sticky-header border, gallery lightbox, scroll reveal
assets/img/mark.png     The group mark, used in the header and as the favicon source
assets/img/favicon.*    Generated icon set (see tools/make-logo-assets.js)
assets/img/photos/      Photograph slots — see the README in that directory
assets/img/photos/thumbs/  Gallery thumbnails (tools/make-gallery-thumbs.js)
assets/docs/            Documents linked from the site (the ISO 9001 certificate)
.htaccess               404 page, compression, caching, headers (Apache/LiteSpeed)
site.webmanifest        Name, theme colour and the 192/512 icons
llms.txt                Plain-text summary of the business for AI crawlers
robots.txt, sitemap.xml
```

## Where the content came from

All copy is drawn from material the client supplied directly. **Nothing was taken from
the web** — not the award names, not the entity names, not the certificate details.
There are two sources:

1. The recorded briefing with Harsh Trivedi (director), supplied as a `Notes by Gemini`
   transcript. This is the source for everything below.
2. Documents and photographs supplied later: the ISO 9001:2015 certificate (a PDF, its
   text extracted directly) and photographs of the award objects (inscriptions read at
   magnification). These are the source for the certificate details on the ferro alloys
   page, the plant's postal address on the contact page, the award years and awarding
   bodies on the mining page, and the state environment award on the sustainability
   page.

Facts on the site traceable to the **briefing** include: the British discovery of
manganese during highway construction; the Ramrama mine; four generations of family mining; the
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
`href="/assets/css/style.css?v=4"`. **Bump that number in every page whenever you edit
`style.css` or `main.js`**, or returning visitors keep the old file:

```bash
# bump v=4 to v=5 across all pages
sed -i 's/style\.css?v=4/style.css?v=5/; s/main\.js?v=4/main.js?v=5/' *.html
```

Nothing here is content-hashed, so nothing is cached as immutable: the stylesheet and
script expire after a week and photographs after a month, which means a forgotten bump
self-heals in days rather than persisting for a year.

### Elsewhere

Any static host works: Netlify, Cloudflare Pages and Vercel need no build command and
publish directory `.`. `.htaccess` is Apache/LiteSpeed only and is ignored by those.

## Other languages

`ja/` and `de/` are **summary landing pages, not translations of the site.** Each carries
the company description, the full grade table, scale figures, certification and contact
details on one page, and links back to the English site. The English pages remain the
complete and authoritative record; hreflang on the home page ties the three together, with
English as `x-default`.

**Both were machine-drafted and are not yet reviewed by a native speaker.** That was a
deliberate client decision, recorded in a comment at the top of each file. The copy is
plain and factual and every figure matches the English site, but the technical vocabulary
and business register are unchecked. Have someone read them before relying on them with a
customer — the alloy grade terms and the Japanese business register are the parts most
likely to be subtly wrong.

Adding a third language means: a new directory, the hreflang cluster in `index.html`
extended, the footer language row extended, and two lines in `sitemap.xml`.

## Search and answer engines

`robots.txt` allows everything, and names the AI crawlers explicitly so the decision is on
the record — `Google-Extended` is the line that governs whether the site can ground Gemini
and AI Overviews answers. `llms.txt` is a plain-text summary at a stable URL.

The home page carries a JSON-LD graph: Organization with address, both entities, the
directors, the four awards, the ISO certificate as a `Certification` node, an
`OfferCatalog` of the product lines, and `Place` nodes for the mine and the works. Inner
pages carry `BreadcrumbList`.

Run `python3 tools/check-jsonld.py` after editing any of it. Invalid structured data is
not an error a browser shows — the crawler simply drops the block.

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

3. **Contact form is an interim mailto.** Pressing *Send enquiry* composes the message
   in the visitor's own email app with the fields filled in; they still have to press
   send there. This replaced `action="#"`, which reloaded the page and left the buyer
   believing they had sent something that reached nobody.

   It has real costs: a visitor with no mail app configured — common on a desktop using
   webmail — gets nothing, some who do get it will not press send, and nothing is
   recorded server-side, so there is no record of a lost enquiry.

   **To upgrade**, either point the form's `action` at a service (Formspree, Web3Forms
   and Basin all have free tiers and take about five minutes) or write a small PHP
   mailer — Hostinger runs PHP, so authenticated SMTP through their mail service would
   work with no third party and no monthly cost. Then remove the `data-mailto`
   attribute in `contact.html` and the mailto branch in `assets/js/main.js`, both of
   which are commented for exactly this.

4. **Legal entity names — partly resolved, footer still outstanding.** Two entities are
   now confirmed from documents the client supplied, each named on an official record of
   its own business:

   - **Ramnik Power and Alloys Pvt. Ltd.** — holder of the ISO 9001:2015 certificate.
     Registered address: Plot No. 1–11, Industrial Area, Waraseoni–Katangi Road, Sarandi,
     Balaghat 481331, Madhya Pradesh. (The interim mailbox `rpaplpower@gmail.com` is
     this company's initials, which corroborates it.)
   - **A. P. Trivedi & Sons** — the mining business, named on the Indian Bureau of Mines
     five-star plaque for the Ramrama manganese mine and on the Madhya Pradesh
     environment award citation.

   Both names now appear on the pages where a document evidences them, but the **footer
   still says only "the group"** and there is no registered-office line. Before adding
   one, confirm with the family that these two are the whole list and which is the
   parent — the site must not imply that "The Ramnik Group" is a single registered
   company when it is at least two.

5. **Figures worth a second look.** Installed capacity is shown as 34.5 MVA on the stat
   bands (22.5 + 12) while the body text says "33 to 35 MVA in total", matching how it
   was described. The "100+ years" claim follows the briefing's own framing. Confirm
   both read correctly to the family.

6. **Re-scrape the social caches.** `assets/img/og-card.jpg` (1200×630) was rebuilt when
   the new mark landed, so the card that platforms have cached is the old one. Run the
   URL through Facebook's Sharing Debugger and LinkedIn's Post Inspector once the site is
   deployed, or old previews persist indefinitely.

   The card is generated from `assets/img/og-card.source.html`, which reuses the site's
   design tokens and now embeds `mark.png` by relative path. Regenerate with
   `node tools/make-og-card.js` (needs a local server on port 8790), or:

   ```bash
   npx playwright screenshot --viewport-size=1200,630 \
     assets/img/og-card.source.html assets/img/og-card.jpg
   ```

   It remains typographic. A photographic card — the furnace tapping frame — is still
   possible and would make a more arresting preview, but that is a separate decision.

7. **The logo is raster only.** Every icon on the site is generated from
   `tools/logo-source.png` by `tools/make-logo-assets.js`. That is fine at icon sizes and
   on screen, but there are no vector originals, so the mark cannot be printed large,
   embroidered or cut for signage. Ask the designer for SVG of the mark, the lockup and
   the single-colour version. See `tools/logo-brief.md`, section 11.

   The supplied wordmark reads `RAMNIK`; the company is *The Ramnik Group*, so the site
   header keeps its own serif wordmark and uses only the hexagon.

8. **The map embed is approximate.** The "Get directions" link on the contact page
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
hidden, the mobile menu falls back to in-flow links, and every gallery thumbnail is a
plain link to the full-size photograph, so clicking one still shows the picture — the
lightbox is built by the script and is simply absent without it.

## Verified

Checked in Chromium at 1440px and 390px across all pages: no console errors, no
horizontal overflow, mobile menu opens and closes on Escape and link click, one `h1`
per page, no heading-level jumps, no duplicate IDs, every form control labelled, no
broken internal links, and every rendered text/background pair meets WCAG AA (verified
against computed styles, not just the token list).
