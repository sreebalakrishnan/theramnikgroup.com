# theramnikgroup.com

Marketing site for The Ramnik Group — a static, dependency-free build in plain
HTML and CSS. No framework, no bundler, no `node_modules`. Every page is served
exactly as it appears in the repository.

## Structure

```
index.html          Home — positioning, divisions, principles, CTA
about.html          Origins, milestones, acquisition criteria, responsibility
businesses.html     The six operating divisions, one section each
leadership.html     Group office people and governance
contact.html        Contact details and enquiry form
404.html            Not-found page
assets/css/style.css   Single stylesheet (design tokens at the top)
assets/js/main.js      Mobile nav, sticky-header border, scroll reveal
assets/img/mark.svg    Monogram used as logo and favicon
CNAME, robots.txt, sitemap.xml, .nojekyll
.github/workflows/pages.yml   GitHub Pages deployment
```

## Running locally

Any static server works. The pages use root-relative paths (`/assets/...`), so
open them through a server rather than the `file://` protocol:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

**GitHub Pages** — the included workflow publishes the repository root on every
push to `main`. Enable it once under *Settings → Pages → Source: GitHub Actions*.
The `CNAME` file points the site at `theramnikgroup.com`; update your DNS to
point at GitHub Pages, or delete the file if you deploy elsewhere.

**Netlify / Cloudflare Pages / Vercel** — no build command, publish directory `.`.

## Before going live

The copy is written to be plausible for a diversified holding group, but the
specifics are placeholders. Every one of these is marked with an HTML comment in
the source:

- **Figures on the home page** (founding year, division count, headcount,
  generations) — `index.html`, `<!-- PLACEHOLDER FIGURES -->`
- **Company history** (`about.html`, `<!-- PLACEHOLDER MILESTONES -->`)
- **Division descriptions** (`businesses.html`, `<!-- PLACEHOLDER DIVISIONS -->`)
- **People** — names appear as `[Full Name]` and portraits as initials
  (`leadership.html`, `<!-- PLACEHOLDER PEOPLE -->`)
- **Contact details** — addresses and mailboxes (`contact.html`)
- **Contact form** — the form has no backend. `action="#"` must be pointed at a
  form service (Formspree, Netlify Forms, Basin, a Worker) or the submissions go
  nowhere. Marked `<!-- FORM ENDPOINT REQUIRED -->`.

Also worth doing: replace `assets/img/mark.svg` with the real logo, add an
Open Graph preview image (`og:image` is currently unset), and confirm the
registered-office line in the footer.

## Editing

Colours, type scale, spacing and the container width are CSS custom properties
in the `:root` block at the top of `assets/css/style.css` — change them there
rather than hunting through rules. The header and footer are duplicated in each
page; if that becomes tedious, the site is small enough to move to Eleventy or
Astro with layouts and no other changes.

The JavaScript is progressive enhancement only. With it disabled the site is
fully readable and navigable — the mobile menu falls back to the visible nav
links and reveal animations never hide content on first paint in that case.
