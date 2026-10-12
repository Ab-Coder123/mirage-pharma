import re

with open(r"e:\programming\Space Work\MIrage\stitch_assets\pipeline_screen.html", "r", encoding="utf-8") as f:
    html = f.read()

sections = re.findall(r'<section[^>]*id="([^"]+)"', html)
print("Sections found:", sections)
headings = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', html, re.DOTALL)
for h in headings[:15]:
    clean_h = re.sub(r'<[^<]+?>', '', h).strip()
    if clean_h:
        print(" -", clean_h)
