"""Parse every application/ld+json block on the site. Invalid JSON-LD is not an
error a browser shows — the crawler just drops it — so it has to be checked
deliberately. Also reports the types found, so a block silently going missing is
visible.
"""
import glob
import json
import re
import sys

pattern = re.compile(
    r'<script type="application/ld\+json">\s*(.*?)\s*</script>', re.S
)

failures = 0
pages = sorted(glob.glob("*.html")) + sorted(glob.glob("*/index.html"))
for page in pages:
    blocks = pattern.findall(open(page).read())
    if not blocks:
        print(f"{page:24} (no structured data)")
        continue
    types = []
    for i, raw in enumerate(blocks):
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as e:
            print(f"{page:24} BLOCK {i} INVALID: {e}")
            failures += 1
            continue
        nodes = data.get("@graph", [data])
        for n in nodes:
            t = n.get("@type")
            types.append(t if isinstance(t, str) else ",".join(t))
    print(f"{page:24} {len(blocks)} block(s): {', '.join(types)}")

print()
print("INVALID BLOCKS:", failures)
sys.exit(1 if failures else 0)
