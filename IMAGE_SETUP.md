# Image Setup Guide

## Overview

This project uses **local image storage** for website images. No Firebase Storage or external image hosting required.

## Image Directory Structure

```
public/
├── images/
│   ├── blog/           # Blog post images
│   │   ├── article-1.jpg
│   │   └── article-2.png
│   ├── products/       # Product/gelato images
│   │   ├── pistacchio-classico.jpg
│   │   └── nocciola.jpg
│   ├── team/           # Team member photos
│   │   └── artisan.jpg
│   └── general/        # General website images
│       ├── hero-bg.jpg
│       └── shop-interior.jpg
└── logo.png            # Website logo
```

## How to Add Images

### For Blog Posts

You can use **either** of these methods:

#### Method 1: External URLs (Recommended for quick setup)
```javascript
{
  id: 'my-article',
  title: 'My Article Title',
  image: 'https://images.unsplash.com/photo-1234567890-abcdef123456?w=800&h=500&fit=crop&q=85',
  // ... other fields
}
```

**Free stock image sources:**
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com

#### Method 2: Local Images (Better for brand consistency)
1. Save your image to `public/images/blog/`
2. Use the path in your article:
```javascript
{
  id: 'my-article',
  title: 'My Article Title',
  image: '/images/blog/my-article.jpg',
  // ... other fields
}
```

### For Product Images

1. Save images to `public/images/products/`
2. Update the product data:
```javascript
{
  name: 'Pistacchio Classico',
  image: '/images/products/pistacchio-classico.jpg',
  // ... other fields
}
```

### For General Website Images

1. Save images to `public/images/` (or subfolders)
2. Use absolute paths from public:
```javascript
// In components
<img src="/images/hero-bg.jpg" alt="Hero background" />

// Or in Tailwind CSS (if needed)
className="bg-[url('/images/hero-bg.jpg')]"
```

## Image Requirements

### Recommended Formats
- **JPG/JPEG**: Best for photos
- **PNG**: Best for graphics with transparency
- **WebP**: Best for web optimization (modern browsers)

### Recommended Sizes

| Image Type | Recommended Size | Aspect Ratio |
|-----------|-----------------|--------------|
| Blog Featured | 1200x630px | 1.91:1 |
| Blog Thumbnail | 800x500px | 16:10 |
| Product | 600x600px | 1:1 |
| Team Photo | 400x400px | 1:1 |
| Hero Background | 1920x1080px | 16:9 |
| Logo | 200x200px | 1:1 |

### File Size
- Keep images under 500KB when possible
- Use image compression tools:
  - TinyPNG: https://tinypng.com
  - Squoosh: https://squoosh.app
  - ImageOptim: https://imageoptim.com

## Using Images in Code

### In JSX Components
```jsx
// External URL
<img 
  src="https://images.unsplash.com/photo-1234567890" 
  alt="Description"
  className="w-full h-64 object-cover rounded-lg"
/>

// Local Image
<img 
  src="/images/blog/my-photo.jpg" 
  alt="Description"
  className="w-full h-64 object-cover rounded-lg"
/>
```

### In Next.js Image Component (Advanced)
```jsx
import Image from 'next/image';

<Image
  src="/images/blog/my-photo.jpg"
  alt="Description"
  width={800}
  height={500}
  className="rounded-lg"
/>
```

## Optimizing Images

### 1. Compress Before Upload
Use tools like TinyPNG or Squoosh to reduce file size without losing quality.

### 2. Use Appropriate Formats
- Use JPG for photographs
- Use PNG for graphics/logos
- Consider WebP for better compression

### 3. Lazy Loading
All images in this project use lazy loading by default for better performance.

## Adding Images via Firebase (Optional)

If you want to store images in Firebase Storage later:

1. Enable Firebase Storage in your Firebase Console
2. Upload images to Firebase Storage
3. Get the public URL
4. Use it as an external URL in your code

However, this is **optional** - local images in `public/images/` work perfectly fine.

## Troubleshooting

### Image Not Loading?
1. Check the path is correct (start with `/`)
2. Ensure file exists in `public/images/`
3. Check browser console for 404 errors
4. Verify file extension matches (jpg vs jpeg)

### Image Too Large?
1. Compress using TinyPNG or Squoosh
2. Resize to recommended dimensions
3. Convert to WebP format

### External Image Not Loading?
1. Check URL is correct and complete
2. Ensure CORS allows embedding (most stock sites do)
3. Try downloading and using locally instead

## Quick Start

To get started quickly with placeholder images:

1. **Use Unsplash URLs** - Already configured in sample data
2. **Or download sample images** to `public/images/`
3. **Update paths** in your data files

Example with Unsplash:
```javascript
// Just copy the image URL from Unsplash
image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop&q=85'
```

The `?w=600&h=600&fit=crop&q=85` parameters:
- `w=600`: Width 600px
- `h=600`: Height 600px
- `fit=crop`: Crop to fit dimensions
- `q=85`: Quality 85%

---

**For help or questions, check the main README or open an issue.**
