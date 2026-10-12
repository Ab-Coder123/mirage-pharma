import zipfile
import re
import os

pptx_path = r"E:\ملفاتي\Downloads\Mirage\Mirage-Culture- Tarek.pptx"
with zipfile.ZipFile(pptx_path, 'r') as z:
    for name in z.namelist():
        if 'theme' in name or 'slide' in name:
            try:
                xml = z.read(name).decode('utf-8', errors='ignore')
                colors = re.findall(r'val="([A-Fa-f0-9]{6})"', xml)
                fonts = re.findall(r'typeface="([^"]+)"', xml)
                if colors or fonts:
                    print(f"File: {name}")
                    if colors:
                        print("  Colors:", set(colors))
                    if fonts:
                        print("  Fonts:", set(fonts))
            except Exception as e:
                pass
