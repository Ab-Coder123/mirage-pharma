from PIL import Image
import colorsys
import os

def analyze_hues(path, name):
    img = Image.open(path).convert('RGB')
    w, h = img.size
    pixels = img.resize((200, int(200 * h / w))).getdata()
    
    blues = []
    greens = []
    navies = []
    cyans = []
    
    for r, g, b in pixels:
        h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        # Deep dark blue / navy
        if 0.55 <= h <= 0.68 and v < 0.45 and s > 0.3:
            navies.append((r, g, b))
        # Primary blue
        elif 0.55 <= h <= 0.65 and s > 0.4 and v >= 0.45:
            blues.append((r, g, b))
        # Cyan / Light blue
        elif 0.48 <= h < 0.55 and s > 0.3:
            cyans.append((r, g, b))
        # Vibrant Green
        elif 0.25 <= h <= 0.45 and s > 0.35:
            greens.append((r, g, b))
            
    def avg_color(arr):
        if not arr: return "None"
        r = sum(x[0] for x in arr) // len(arr)
        g = sum(x[1] for x in arr) // len(arr)
        b = sum(x[2] for x in arr) // len(arr)
        return f"#{r:02x}{g:02x}{b:02x} (RGB: {r},{g},{b})"

    print(f"=== {name} ===")
    print("  Deep Navy/Dark:", avg_color(navies), f"(n={len(navies)})")
    print("  Primary Blue:   ", avg_color(blues), f"(n={len(blues)})")
    print("  Cyan/Glass Blue:", avg_color(cyans), f"(n={len(cyans)})")
    print("  Vitality Green: ", avg_color(greens), f"(n={len(greens)})")

analyze_hues(r"C:/Users/TaFrA/.gemini/antigravity/brain/419145f0-5fab-49d2-ad81-947c8894aab0/.user_uploaded/media_1791708581535_9f901b0a.jpg", "Logo")
analyze_hues(r"C:/Users/TaFrA/.gemini/antigravity/brain/419145f0-5fab-49d2-ad81-947c8894aab0/.user_uploaded/media_1791708560091_ed0a3d85.jpg", "Post 1 - Values & Purpose")
analyze_hues(r"C:/Users/TaFrA/.gemini/antigravity/brain/419145f0-5fab-49d2-ad81-947c8894aab0/.user_uploaded/media_1791708560094_f41d865f.jpg", "Post 2 - Science & Life")
analyze_hues(r"E:\ملفاتي\Downloads\Mirage\Mirage posts\Mirage posts\Mirage posts -01.jpg", "Post 01 - Healthcare Ribbon")
