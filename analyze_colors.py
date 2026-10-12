from PIL import Image
import collections
import os

def analyze(path, name):
    img = Image.open(path).convert('RGB')
    w, h = img.size
    pixels = list(img.getdata())
    # filter out background pure white / off-white and near black
    filtered = [p for p in pixels if not (p[0] > 245 and p[1] > 245 and p[2] > 245) and not (p[0] < 15 and p[1] < 15 and p[2] < 15)]
    # quantize slightly
    quantized = [(p[0]//4*4, p[1]//4*4, p[2]//4*4) for p in filtered]
    counts = collections.Counter(quantized).most_common(12)
    print(f"=== {name} ===")
    for c, cnt in counts:
        hex_c = '#{:02x}{:02x}{:02x}'.format(c[0], c[1], c[2])
        print(f"  {hex_c} RGB{c} (Count: {cnt})")

logo_path = r"C:/Users/TaFrA/.gemini/antigravity/brain/419145f0-5fab-49d2-ad81-947c8894aab0/.user_uploaded/media_1791708581535_9f901b0a.jpg"
post1 = r"C:/Users/TaFrA/.gemini/antigravity/brain/419145f0-5fab-49d2-ad81-947c8894aab0/.user_uploaded/media_1791708560091_ed0a3d85.jpg"
post2 = r"C:/Users/TaFrA/.gemini/antigravity/brain/419145f0-5fab-49d2-ad81-947c8894aab0/.user_uploaded/media_1791708560094_f41d865f.jpg"

analyze(logo_path, "Logo")
analyze(post1, "Post 1 - Values & Purpose")
analyze(post2, "Post 2 - Science & Life")
