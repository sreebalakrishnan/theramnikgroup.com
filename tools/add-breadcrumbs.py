"""Insert a BreadcrumbList JSON-LD block into each inner page, just before the
closing </head>. Breadcrumbs are what a search result shows instead of a raw URL,
and they give an answer engine the site's shape without it having to infer one.

The home page is skipped — a breadcrumb to itself says nothing — and 404.html is
skipped because it is not a real place in the site.
"""
import re

PAGES = {
    "legacy.html": "Legacy",
    "mining.html": "Mining",
    "ferro-alloys.html": "Ferro Alloys",
    "sustainability.html": "Sustainability",
    "gallery.html": "Photographs",
    "contact.html": "Contact",
}

TEMPLATE = """
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{
      "@type": "ListItem",
      "position": 1,
      "name": "The Ramnik Group",
      "item": "https://theramnikgroup.com/"
    }},
    {{
      "@type": "ListItem",
      "position": 2,
      "name": "{name}",
      "item": "https://theramnikgroup.com/{page}"
    }}
  ]
}}
</script>
"""

for page, name in PAGES.items():
    s = open(page).read()
    if "BreadcrumbList" in s:
        print(f"{page}: already has one, skipped")
        continue
    block = TEMPLATE.format(name=name, page=page)
    s = s.replace("</head>", block + "</head>", 1)
    open(page, "w").write(s)
    print(f"{page}: breadcrumb added ({name})")
