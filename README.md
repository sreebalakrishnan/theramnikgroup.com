# theramnikgroup.com

Website for The Ramnik Group — manganese mining, ferro alloys and solar generation in
Balaghat, Madhya Pradesh. Static HTML and CSS with no build step, bundler or
dependencies; the repository root is what gets served.

## Structure

```
index.html              Home — the three businesses, products, markets, assurance
legacy.html             The discovery of manganese, four generations, milestones, leadership
mining.html             Ram Rama mine — open cast and underground, ore-to-graded-ore process
ferro-alloys.html       Plant, product grades, raw material, quality, export markets
sustainability.html     Solar, environment, health and safety, CSR and community
contact.html            Contact routes and enquiry form
404.html                Not-found page
assets/css/style.css    Single stylesheet; design tokens in the :root block at the top
assets/js/main.js       Mobile nav, sticky-header border, scroll reveal
assets/img/mark.svg     Monogram used as logo and favicon
assets/img/photos/      Photograph slots — see the README in that directory
CNAME, robots.txt, sitemap.xml, .nojekyll
.github/workflows/pages.yml   GitHub Pages deployment
```

## Where the content came from

All copy is drawn from the recorded briefing with Harsh Trivedi (director), supplied as
`Notes by Gemini` transcript. Nothing was taken from the web. Facts stated on the site
and traceable to that briefing include: the British discovery of manganese during
highway construction; the Ram Rama mine; four generations of family mining; the
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

**GitHub Pages** — the included workflow publishes the repository root on every push to
`main`, but Pages has to be switched on once by hand first:

> *Settings → Pages → Build and deployment → Source: **GitHub Actions***

Until that is done the workflow fails at `configure-pages` with *"Get Pages site failed
… Not Found"*. This cannot be automated from the workflow: creating the Pages site needs
admin rights the `GITHUB_TOKEN` does not carry, so `enablement: true` fails with
*"Resource not accessible by integration"*. After enabling, re-run the workflow from the
Actions tab, or push any commit.

`CNAME` sets the custom domain to `theramnikgroup.com`. Note that once a custom domain
is set, the `*.github.io` address redirects to it, so the site is only reachable after
DNS points at GitHub Pages — an apex `ALIAS`/`ANAME` (or four `A` records to
`185.199.108–111.153`) plus a `CNAME` on `www`. Delete the `CNAME` file if you want to
preview at the `github.io` address first, or if you host elsewhere.

**Netlify / Cloudflare Pages / Vercel** — no build command, publish directory `.`.

## Before going live

These are the outstanding items, each marked with an HTML comment in the source:

1. **Photographs.** Ten slots are ready and currently show a dark placeholder. Drop the
   files into `assets/img/photos/` using the filenames in that directory's README and
   they appear automatically — no HTML editing. This is the list Harsh offered to
   supply: open cast working, underground working, solar farm, plantation, CSR
   activities, manufacturing, packing, sizing and grading, and the products themselves.

2. **Contact details.** `contact.html` publishes `info@theramnikgroup.com` because it
   matches this domain. The other details in the briefing came through an automatic
   transcript too garbled to trust — a second mailbox transcribed as
   `rpaplowerthe...@gmail.com`, and phone numbers as `0763224394` and `09730 2683 3`.
   Both are left as "to be confirmed" on the page rather than published wrong. Confirm
   and replace.

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

6. **`og:image`** is unset — add a preview image once photographs are in.

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
