import sys
import os
from PIL import Image, ImageDraw

def create_halftone(input_path, output_path, dot_size_max, color=(184, 138, 68)):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    output = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(output)
    
    gray = img.convert("L")
    pixels = gray.load()
    alpha = img.split()[3].load()
    
    spacing = dot_size_max
    
    for y in range(0, height, spacing):
        for x in range(0, width, spacing):
            brightness_sum = 0
            alpha_sum = 0
            count = 0
            
            for dy in range(spacing):
                for dx in range(spacing):
                    if x + dx < width and y + dy < height:
                        a = alpha[x+dx, y+dy]
                        if a > 0:
                            brightness_sum += pixels[x+dx, y+dy]
                        alpha_sum += a
                        count += 1
                        
            if count == 0:
                continue
                
            avg_alpha = alpha_sum / count
            if avg_alpha < 50:
                continue
                
            avg_brightness = brightness_sum / count
            radius = (avg_brightness / 255.0) * (spacing / 2.0)
            
            if radius > 0.5:
                dot_color = (color[0], color[1], color[2], int(avg_alpha))
                draw.ellipse(
                    (x + spacing/2 - radius, y + spacing/2 - radius, 
                     x + spacing/2 + radius, y + spacing/2 + radius),
                    fill=dot_color
                )
                
    output.save(output_path, "PNG")
    print(f"Saved {output_path}")

soldier_in = "public/images/hayaosint/leftsoldier.webp"
soldier_out = "public/images/hayaosint/soldier-left-halftone.png"

logo_in = "public/images/hayaosint/crest.png"
logo_out = "public/images/hayaosint/hayaosint-logo-halftone.png"

create_halftone(soldier_in, soldier_out, 10)
create_halftone(logo_in, logo_out, 10)
