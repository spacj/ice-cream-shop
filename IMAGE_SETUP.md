# Image Setup Guide for Pistacchio Utrecht

## Public Folder Structure

Place all your images in the `public/` folder:

```
public/
├── images/
│   ├── logo.png              # Main logo (white background)
│   ├── logo-dark.png         # Logo for dark backgrounds
│   ├── favicon.ico           # Site favicon (16x16, 32x32, 48x48)
│   ├── og-image.jpg          # Social media preview (1200x630)
│   │
│   ├── hero/                 # Homepage hero images
│   │   ├── hero-gelato.jpg
│   │   ├── hero-interior.jpg
│   │   └── hero-outdoor.jpg
│   │
│   ├── products/             # Gelato/flavor images
│   │   ├── pistacchio.jpg
│   │   ├── nocciola.jpg
│   │   ├── cioccolato.jpg
│   │   └── ...
│   │
│   ├── gallery/              # General gallery images
│   │   ├── shop-front.jpg
│   │   ├── interior-1.jpg
│   │   └── ...
│   │
│   ├── team/                 # Team/staff photos
│   │   └── ...
│   │
│   ├── blog/                 # Blog article images
│   │   └── ...
│   │
│   └── placeholders/         # Placeholder images
│       ├── product-placeholder.jpg
│       └── article-placeholder.jpg
│
├── videos/
│   ├── hero-gelato.mp4       # Hero background video
│   └── gelato-making.mp4     # Process video
│
├── logo.png                  # Root logo copy
└── favicon.ico              # Root favicon copy
```

## Using Images in Code

### In JSX/Components:

```jsx
// Local images from public folder
<img src="/images/products/pistacchio.jpg" alt="Pistachio Gelato" />

// With Next.js Image component
import Image from 'next/image';
<Image 
  src="/images/products/pistacchio.jpg" 
  alt="Pistachio Gelato" 
  width={800} 
  height={600}
  priority // For above-the-fold images
/>

// External images (Unsplash, etc.)
<img src="https://images.unsplash.com/photo-xxx?w=800" alt="Gelato" />
```

### Recommended Image Sizes:

| Image Type | Recommended Size | Aspect Ratio |
|------------|------------------|--------------|
| Hero/Background | 1920x1080 | 16:9 |
| Product/Flavor | 800x800 | 1:1 |
| Gallery | 1200x800 | 3:2 |
| Blog Featured | 1200x630 | 1.91:1 |
| Thumbnail | 400x300 | 4:3 |
| Logo | 400x150 | ~3:1 |

### Image Formats:
- **Photos**: JPG (with 80% quality)
- **Graphics/Icons**: PNG (with transparency)
- **Animated**: WebP or GIF
- **Favicon**: ICO format

## Adding New Images

1. Save your image to the appropriate folder in `public/images/`
2. Use the path `/images/folder/filename.jpg` in your code
3. For optimized loading, resize images before uploading

## External Image Sources (for development)

You can use Unsplash for placeholder images during development:

```jsx
// Unsplash URL format
https://images.unsplash.com/photo-{id}?w=800&h=800&fit=crop&q=80

// Find images at: https://unsplash.com/s/photos/gelato
```
