# Media Assets Guide - Pistacchio Utrecht

This document outlines all media assets needed for the website and their specifications.

## Directory Structure

```
public/
├── images/
│   ├── products/
│   │   ├── pistacchio-classico.jpg
│   │   ├── pistacchio-nocciola.jpg
│   │   └── pistacchio-cioccolato.jpg
│   ├── shop/
│   │   ├── shop-interior-1.jpg
│   │   ├── shop-interior-2.jpg
│   │   └── shop-ambiance.jpg
│   ├── process/
│   │   ├── gelato-making-1.jpg
│   │   ├── gelato-making-2.jpg
│   │   └── ingredients.jpg
│   └── team/
│       ├── team-photo.jpg
│       └── artisan-crafting.jpg
└── videos/
    ├── hero-gelato.mp4
    └── gelato-making.mp4
```

## Image Specifications

### Product Images (3 required)
- **File**: `products/pistacchio-classico.jpg`, `pistacchio-nocciola.jpg`, `pistacchio-cioccolato.jpg`
- **Dimensions**: 600x600px minimum (aspect ratio: 1:1)
- **Quality**: High-resolution, 85-100 dpi
- **Format**: JPG or WebP
- **Content**: Close-up shots of gelato scoops showing texture and color
- **Current URL**: Using Unsplash premium gelato images as placeholders

### Shop Images (3+ required)
- **File**: `shop/shop-interior-*.jpg`
- **Dimensions**: 800x800px minimum
- **Quality**: High-resolution photography
- **Format**: JPG or WebP
- **Content**: Shop interior, display cases, ambiance, welcoming atmosphere
- **Current URL**: Using Unsplash café/restaurant interiors as placeholders

### Process/Behind-the-Scenes Images (3 required)
- **File**: `process/gelato-making-*.jpg`, `process/ingredients.jpg`
- **Dimensions**: 800x600px (16:9 aspect ratio for video thumbnails)
- **Quality**: Professional photography
- **Format**: JPG or WebP
- **Content**: Gelato-making process, ingredient display, artisan at work

### Team/Artisan Images (2 required)
- **File**: `team/team-photo.jpg`, `team/artisan-crafting.jpg`
- **Dimensions**: 800x600px
- **Format**: JPG or WebP
- **Content**: Team members, craft in action

## Video Specifications

### Hero Video
- **File**: `videos/hero-gelato.mp4`
- **Duration**: 8-15 seconds
- **Dimensions**: 1920x1080px minimum (Full HD)
- **Bitrate**: 5-8 Mbps (MP4 codec: H.264)
- **Format**: MP4 + WebM backup
- **Content**: Beautiful gelato scooping, close-ups of texture, shop ambiance
- **Current Status**: Placeholder path - needs actual video file

### Process Video
- **File**: `videos/gelato-making.mp4`
- **Duration**: 30-60 seconds
- **Dimensions**: 1920x1080px minimum
- **Bitrate**: 5-8 Mbps (H.264)
- **Format**: MP4 + WebM backup
- **Content**: Step-by-step gelato-making process, ingredient mixing, freezing, scooping
- **Current Status**: Placeholder path - needs actual video file

## Current Implementation

### Image URLs Currently Used (from Unsplash)
These are temporary placeholders that match the premium aesthetic:

1. **Hero Background**: 
   - `https://images.unsplash.com/photo-1563805042-7684c019e1cb` (pistachio gelato)

2. **Featured Carousel**:
   - Same premium gelato images rotated

3. **Featured Flavors Section**:
   - Pistacchio Classico: Pistachio gelato
   - Pistacchio & Nocciola: Hazelnut gelato
   - Pistacchio & Cioccolato: Chocolate gelato

4. **Video Posters**: Premium gelato product shots

5. **Location Image**: Interior café/shop setting

### Gallery Images
The ImageGallery component displays 6 sample images (currently from Unsplash) in a 3-column grid with lightbox functionality.

## Next Steps

1. **Replace Placeholder URLs**: When you have actual Pistacchio photos, replace the Unsplash URLs in `app/page.js`
   - Update image src attributes for products, shop, and process photos
   - Update video poster images

2. **Add Video Files**: Upload MP4 and WebM versions to `/public/videos/`
   - `hero-gelato.mp4` and `hero-gelato.webm`
   - `gelato-making.mp4` and `gelato-making.webm`

3. **Optimize Images**: When adding local images
   - Compress for web (use ImageOptim, TinyPNG, or similar)
   - Consider WebP format for modern browsers
   - Add srcset attributes for responsive images

4. **Component Locations to Update**:
   - `app/page.js` - Lines 10-23 (sampleImages and carouselImages arrays)
   - `app/page.js` - Lines 114-128 (flavor product images)
   - `app/page.js` - Line 178 (video poster)
   - `app/page.js` - Line 428 (location shop image)

## Image Quality Guidelines

- **Pistachio Green**: Ensure products showcase the distinctive pistachio color (#4A7C59 brand color)
- **Lighting**: Warm, professional lighting that emphasizes premium quality
- **Composition**: Clean, centered product shots with minimal distracting backgrounds
- **Consistency**: Maintain consistent color grading and lighting across product shots
- **Typography**: If adding text overlays, use Playfair Display or Poppins fonts

## Performance Optimization

Currently, images are lazy-loaded via the `PremiumImage` component which:
- Loads images only when in viewport
- Applies blur-up effect during loading
- Supports responsive sizing
- Caches images in browser

Video optimization:
- Videos are set to autoplay (muted, looped)
- Responsive sizing with object-cover
- WebM format fallback for better compression
