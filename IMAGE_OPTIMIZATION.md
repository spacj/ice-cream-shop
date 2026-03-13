# 🖼️ Image Optimization Guide

## Overview
Properly optimized images are crucial for:
- Faster page loading
- Better SEO rankings
- Improved user experience
- Reduced bandwidth costs

---

## Image Formats

### Recommended Formats by Use Case

| Format | Best For | Pros | Cons |
|--------|----------|------|------|
| **WebP** | Photos, complex images | Best compression, modern | Not supported by older browsers |
| **JPEG** | Photos, complex images | Good compression, universal support | Lossy format |
| **PNG** | Icons, graphics, transparency | Lossless, transparency | Larger file sizes |
| **SVG** | Icons, logos, simple graphics | Scalable, small size | Not suitable for photos |
| **AVIF** | Modern browsers, photos | Best compression | Limited browser support |

---

## Image Size Guidelines

### Hero Images
- **Desktop:** 1920x1080px (max 300KB)
- **Tablet:** 1024x768px (max 200KB)
- **Mobile:** 640x480px (max 100KB)

### Product Images
- **Large:** 800x800px (max 200KB)
- **Medium:** 400x400px (max 100KB)
- **Thumbnail:** 200x200px (max 50KB)

### Blog Images
- **Featured:** 1200x600px (max 250KB)
- **Content:** 600x400px (max 150KB)

### Thumbnails
- **Standard:** 300x200px (max 50KB)
- **Small:** 150x150px (max 30KB)

---

## Optimization Tools

### Free Online Tools
1. **TinyPNG/TinyJPG** (tinypng.com)
   - Compression: Excellent
   - Batch: Yes (20 files)
   - Format: PNG, JPEG

2. **ImageOptim** (imageoptim.com)
   - Compression: Very Good
   - Batch: Yes
   - Format: PNG, JPEG, GIF

3. **Squoosh** (squoosh.app)
   - Compression: Excellent
   - Batch: Single file
   - Format: WebP, JPEG, PNG

4. **FileOptimizer** (nikkhokkho.sourceforge.io)
   - Desktop app
   - Batch processing
   - Multiple formats

### Command Line Tools

```bash
# Using ImageMagick
convert input.jpg -quality 80 output.jpg

# Using FFmpeg for video thumbnails
ffmpeg -i video.mp4 -ss 00:00:05 -vframes 1 thumbnail.jpg

# Using cwebp for WebP conversion
cwebp -q 80 input.jpg -o output.webp
```

---

## Next.js Image Optimization

### Using Next.js Image Component
```jsx
import Image from 'next/image';

export default function OptimizedImage() {
  return (
    <Image
      src="/images/flavor.jpg"
      alt="Ice cream flavor"
      width={800}
      height={600}
      priority={true}              // For above-the-fold images
      loading="lazy"                // For below-the-fold images
      quality={80}                  // Quality (default 75)
      sizes="(max-width: 640px) 100vw,
             (max-width: 1024px) 50vw,
             33vw"
    />
  );
}
```

### Benefits
- Automatic responsive images
- WebP format support
- Lazy loading
- Built-in optimization

---

## Compression Tips

### Before Compression
1. **Resize images** to final display size
2. **Remove metadata** (EXIF data)
3. **Use appropriate format**
4. **Remove unnecessary colors** (if using PNG/GIF)

### Compression Levels

**Quality 90-100:** Original quality, larger files
- Use for: Professional photography, prints

**Quality 75-85:** Minimal visible loss, balanced
- Use for: Hero images, product photos (recommended)

**Quality 60-75:** Noticeable but acceptable
- Use for: Blog images, thumbnails

**Quality 40-60:** Significant compression
- Use for: Very small thumbnails

---

## WebP Format

### Advantages
- 25-35% smaller than JPEG
- 26-34% smaller than PNG
- Lossless and lossy compression

### Browser Support
- Modern browsers: 96%+ support
- IE 11: No support (use fallback)

### Implementation
```jsx
// Using picture element for fallback
<picture>
  <source srcSet="/images/flavor.webp" type="image/webp" />
  <source srcSet="/images/flavor.jpg" type="image/jpeg" />
  <img src="/images/flavor.jpg" alt="Flavor" />
</picture>
```

---

## Responsive Images

### Optimization Strategy
```jsx
<img
  srcSet="
    /images/flavor-small.jpg 400w,
    /images/flavor-medium.jpg 800w,
    /images/flavor-large.jpg 1200w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="/images/flavor-medium.jpg"
  alt="Ice cream flavor"
/>
```

---

## Batch Processing Script

### Using ImageMagick (bash)
```bash
#!/bin/bash
# Optimize all JPG images in directory

for file in *.jpg; do
  convert "$file" -quality 80 -strip "optimized_$file"
done

echo "Optimization complete!"
```

### Using Python
```python
from PIL import Image
import os

def optimize_images(directory):
    for filename in os.listdir(directory):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            img = Image.open(os.path.join(directory, filename))
            
            # Resize if larger than 1920px
            img.thumbnail((1920, 1920))
            
            # Save optimized version
            img.save(
                f'optimized_{filename}',
                quality=80,
                optimize=True
            )
            
    print("All images optimized!")

optimize_images('./images')
```

---

## Performance Impact

### Before Optimization
- Hero image: 2.5MB
- Load time: 3.2s
- Size: 2.5MB

### After Optimization
- Hero image: 180KB (WebP)
- Load time: 0.8s
- Size: 180KB

**Result:** 86% smaller, 75% faster loading

---

## Checklist

- [ ] All images resized to display size
- [ ] Images compressed to 80-85% quality
- [ ] WebP versions created (where applicable)
- [ ] Metadata removed
- [ ] Responsive images implemented
- [ ] Lazy loading enabled
- [ ] Alt text added to all images
- [ ] File sizes verified (< guidelines)
- [ ] Performance tested with DevTools
- [ ] Mobile images optimized

---

## Tools Summary

| Task | Tool | File Size Reduction |
|------|------|-------------------|
| General compression | TinyPNG | 20-40% |
| WebP conversion | Squoosh/cwebp | 25-35% |
| Batch processing | ImageOptim | 15-30% |
| Format conversion | ImageMagick | Varies |
| Advanced compression | FileOptimizer | 30-50% |

---

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Web.dev Images](https://web.dev/image-optimization/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ImageMagick Documentation](https://imagemagick.org/)
- [WebP Format Guide](https://developers.google.com/speed/webp)

---

## Quick Tips

1. **Always use Next.js Image component** for better optimization
2. **Compress before uploading** to save storage
3. **Use WebP with JPEG fallback** for best results
4. **Lazy load below-the-fold images** to improve initial load
5. **Test with DevTools** to verify optimization
6. **Monitor Core Web Vitals** regularly
7. **Use CDN** for image delivery (Vercel, Cloudflare, etc.)

---

**Last Updated:** March 2026
**Version:** 1.0.0
