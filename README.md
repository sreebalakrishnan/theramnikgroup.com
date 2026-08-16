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
gallery.html            Gallery — the album, with a lightbox
brand.html              Brand basics for designers — unlisted, noindex, shared by link
ja/index.html           Japanese summary landing page
de/index.html           German summary landing page
contact.html            Contact routes and enquiry form
404.html                Not-found page
assets/css/style.css    Single stylesheet; design tokens in the :root block at the top
assets/js/main.js       Mobile nav, sticky header, lightbox, enquiry mailto, scroll reveal
assets/img/mark.png     The group mark, used in the header and as the favicon source
assets/img/favicon.*    Generated icon set (see tools/make-logo-assets.js)
assets/img/photos/      Photograph slots — see the README in that directory
assets/img/photos/thumbs/  Gallery thumbnails (tools/make-gallery-thumbs.js)
assets/video/           Video — the furnace tap on the ferro alloys page
assets/docs/            Documents linked from the site (ISO 9001 and two BIS licences)
assets/img/docs/        First pages of those documents, rendered for the lightbox
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
2. Documents and photographs supplied later: the ISO 9001:2015 certificate, the two BIS
   Standard Mark licences (all PDFs, text extracted directly) and photographs of the
   award objects (inscriptions read at magnification). These are the source for the
   certificate details on the ferro alloys page, the plant's postal address on the
   contact page, the award years and awarding bodies on the mining page, and the state
   environment award on the sustainability page.

   The BIS PDFs needed decoding rather than reading: the text sits in CID-keyed hex
   strings against a subset font, so it extracts as mojibake unless the embedded
   ToUnicode CMap is parsed properly — `bfchar` and `bfrange` are different shapes, and
   reading a `bfrange` triple as a `bfchar` pair silently corrupts the licence numbers.
   The numbers below were each confirmed against both occurrences in their own file.

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

**Deployment is automatic.** The hPanel webhook is already wired up under *GitHub →
Settings → Webhooks*, so merging a pull request into `main` deploys it — there is nothing
to press. The **Deploy** button in hPanel is only needed to force a re-pull if a webhook
delivery is missed.

Treat merging as publishing: anything merged is live within moments, so do not merge work
that is not meant to be seen yet.

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
currently `href="/assets/css/style.css?v=8"`. **Bump that number in every page whenever
you edit `style.css` or `main.js`**, or returning visitors keep the old file:

```bash
# bump v=8 to v=9 across all pages, including the translated ones
sed -i 's/style\.css?v=8/style.css?v=9/; s/main\.js?v=8/main.js?v=9/' *.html ja/*.html de/*.html
```

Check the current number before copying that line — it moves.

Nothing here is content-hashed, so nothing is cached as immutable: the stylesheet and
script expire after a week and photographs after a month, which means a forgotten bump
self-heals in days rather than persisting for a year.

### Elsewhere

Any static host works: Netlify, Cloudflare Pages and Vercel need no build command and
publish directory `.`. `.htaccess` is Apache/LiteSpeed only and is ignored by those.

## Certificates

The three certificates on the ferro alloys page open in the lightbox as an image of
the document rather than navigating away to the PDF. Each link keeps the PDF as its
`href` and carries the image on `data-cert`, so with JavaScript off the click opens the
PDF exactly as it used to — and the overlay always shows an **Open the PDF** link, because
a picture of a certificate is not the certificate.

The images in `assets/img/docs/` are rendered from the PDFs at 2× (about 150 dpi) with
`pdfjs-dist` driven inside Chromium — there is no poppler, Ghostscript or ImageMagick in
this environment, and Chromium cannot screenshot its own PDF viewer headlessly. Re-render
them if a certificate is ever replaced, or the picture and the document will disagree.

**The certificate number was wrong until now.** The ISO certificate reads
`IN250528012`; the site said `250528012`. The prefix was lost when the PDF's text was
first extracted, and it only came to light when the page was rendered as an image and
could actually be read. It is corrected on the ferro alloys page, in `llms.txt`, in the
Organization JSON-LD and on both translated pages. Worth remembering when reading any of
these documents: extracted text from them is not trustworthy without a look at the page.

## The brand page

`brand.html` is for designers and agencies producing marketing material. It carries the
logo files and their size ceiling, the colour tokens with the rule about which ember value
goes where, the type pairing, photography do's and don'ts, the names that get misspelled,
and the instruction to take figures from the live site rather than from a search result.

Three deliberate choices:

- **Not in the navigation.** It is for suppliers, not customers, and would only clutter
  the nav for everyone else. Share the URL directly.
- **`noindex, follow`.** It should not compete with the real pages in search, and a brand
  page ranking above the product pages would be actively unhelpful. It is *not* blocked in
  `robots.txt` — a blocked page cannot be crawled, so the `noindex` would never be read.
  It is also kept out of `sitemap.xml`.
- **Built from the live design system.** The swatches are the actual `:root` values and
  the type samples use the real stacks, so the page cannot drift from the site the way a
  document does. If you change a token in `style.css`, change it here too.

The page weighs about 900 KB, nearly all of it the two logo PNGs. That is high for this
site, and deliberate: on this page the files *are* the content, and the audience is a
designer on a desktop who is about to download them anyway.

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

## Video

`assets/video/furnace-tap.mp4` is 21 seconds of the furnace being tapped, on the ferro
alloys page. Shot on a phone at **478x416** — small, so it sits in one column of a split
rather than as a full-bleed band. Stretched across the page it would be visibly upscaled.
`.video` caps it at its own native width, which is the part that matters; nothing in the
CSS assumes a particular aspect, because the clip in this slot has already changed shape
once.

It is served with `controls`, `preload="metadata"` and no autoplay: the clip carries
sound, and it should not download itself on a metered connection. A poster frame is set
so the block is not a black rectangle before play.

**Replacing the clip means renaming the file.** `.htaccess` caches `video/mp4` for 30
days and there is no version query on media the way there is on CSS and JS, so reusing a
filename leaves returning visitors on the old clip for up to a month. Name the new file
for its content and update the three references in `ferro-alloys.html` (the `poster`, the
`<source>` and the fallback download link). The same applies to photographs, cached 30
days on the same rule.

The supplied file was 11.3MB of HEVC; re-encoding to H.264 at CRF 26 with mono 96kbps
audio brought it to 1.5MB with no visible difference on a still comparison against the
source. Keep `-movflags +faststart` so playback begins before the whole file arrives.

**On the audio:** the waveform was analysed rather than listened to — 3.2 dB standard
deviation across 100ms frames and only one frame of 207 dropping more than 20 dB below
peak, which is the signature of continuous plant noise rather than speech. Speech shows
pauses and much higher variance. That is evidence, not proof: it cannot rule out talking
buried under the roar of the tap. If speech is confirmed the clip needs a captions track;
the page does not depend on the audio for meaning, so this is a should-fix.

**This container cannot play the clip back.** Its Chromium has no H.264, so it aborts the
request rather than decoding. What can be verified here — and was — is that the file is
correctly formed for progressive playback: h264/High/yuv420p, AAC mono, moov before mdat,
and the poster, dimensions, controls and no-autoplay all correct on the rendered page.

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

   - **Ramnik Power and Alloys Pvt. Ltd.** — holder of the ISO 9001:2015 certificate and
     of both BIS Standard Mark licences.
     Registered address: Plot No. 1–11, Industrial Area, Waraseoni–Katangi Road, Sarandi,
     Balaghat 481331, Madhya Pradesh. (The interim mailbox `rpaplpower@gmail.com` is
     this company's initials, which corroborates it.)

     **The two document sets disagree on the plot numbers.** The ISO certificate says
     "Plot No. 1–11"; both BIS licences say "Plot No. 1, 2, 3, 4A, 4B, 5". Road, village,
     district and pincode match, so it is the same site — but the enumerated plots do
     not, and one of the two is out of date or partial. The site currently shows neither
     list, only "Waraseoni–Katangi Road, Sarandi, Balaghat 481331", which is true on both
     documents. Resolve before publishing a full registered address anywhere.
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

8. **No chemical specification — narrowed, not closed.** The product table gives grades
   (silico manganese 60/15–70/15, ferro manganese 70/72/75) but no typical analysis: no
   Mn, Si, C, P or S figures, and no sizing. A buyer comparing suppliers looks for that
   first, and its absence is more conspicuous than any missing photograph.

   The BIS licences narrow the gap usefully, because **IS 1470:2013** and **IS 1171:2011**
   are the standards that define the composition ranges for these grades — naming them
   tells a buyer exactly what the material conforms to. Both are now named on the ferro
   alloys page, in the product table, in the JSON-LD and in `llms.txt`.

   What is still missing is the group's own typical analysis. **Do not fill this in from
   the standards or from anywhere else** — the numbers must come from the client's own
   test certificates, the same rule as the rest of the site. A one-page typical-analysis
   sheet per grade, as a PDF alongside the certificates, would close it properly.

9. **The map embed is approximate.** The "Get directions" link on the contact page
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
