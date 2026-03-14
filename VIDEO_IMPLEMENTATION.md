# Video Implementation Guide - Pistacchio Utrecht

This document provides comprehensive guidance for adding video content to the Pistacchio website.

## Overview

The website uses videos in two main locations:
1. **Hero Background Video** - Auto-playing background on homepage
2. **Gelato-Making Process Video** - Educational video in "The Craft" section

## Video Locations & Current Setup

### Files Referenced
```
public/videos/
├── hero-gelato.mp4      (currently placeholder)
├── hero-gelato.webm     (fallback format)
├── gelato-making.mp4    (currently placeholder)
└── gelato-making.webm   (fallback format)
```

### Where Videos Are Used

#### 1. Hero Background (app/page.js, line 39)
```jsx
<VideoBackground 
  src="/videos/hero-gelato.mp4"
  poster="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&h=1200&fit=crop&q=80"
  className="w-full h-full"
/>
```

#### 2. Gelato-Making Process (app/page.js, line 177)
```jsx
<VideoPlayer
  src="/videos/gelato-making.mp4"
  poster="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop&q=85"
  title="Our Gelato Making Process"
/>
```

## Video Specifications

### 1. Hero Video (`hero-gelato.mp4`)

**Purpose**: Full-screen background video on homepage with overlay gradient

**Specifications**:
- **Duration**: 8-15 seconds (loops)
- **Resolution**: 1920x1080px minimum (Full HD)
- **Aspect Ratio**: 16:9
- **Frame Rate**: 30-60fps
- **Bitrate**: 5-8 Mbps for MP4 (H.264 codec)
- **File Size**: 5-15 MB (MP4), 3-8 MB (WebM)
- **Format**: MP4 + WebM backup
- **Audio**: No audio (muted)
- **Playback**: Auto-play, muted, looped

**Content Requirements**:
- Close-up shots of pistachio gelato being scooped
- Visual emphasis on texture and creamy quality
- Professional lighting showing the product beautifully
- Smooth transitions and motion (no jarring cuts)
- Can include shop ambiance and preparation
- Should evoke premium quality and craftsmanship

**Visual Style**:
- Warm lighting (golden hour preferred)
- Focus on food photography techniques
- Clean, high-contrast colors
- Smooth, cinematic motion
- Color grading should match brand palette (cream/green/caramel tones)

**Equipment Suggestions**:
- 4K camera (Canon EOS R5, Sony A7IV, etc.)
- Macro lens for close-up shots
- Professional lighting setup
- Tripod or gimbal for smooth motion
- Post-production color grading

### 2. Gelato-Making Process Video (`gelato-making.mp4`)

**Purpose**: Educational video showing artisan gelato production process

**Specifications**:
- **Duration**: 30-60 seconds (non-looping)
- **Resolution**: 1920x1080px minimum (Full HD)
- **Aspect Ratio**: 16:9
- **Frame Rate**: 30-60fps
- **Bitrate**: 5-8 Mbps for MP4
- **File Size**: 15-40 MB (MP4), 8-20 MB (WebM)
- **Format**: MP4 + WebM backup
- **Audio**: Optional (can include ambient sounds or music)
- **Playback**: User-initiated (click to play), shows controls

**Content Requirements**:
- Show the complete gelato-making process
- Include ingredient selection/preparation
- Display mixing and churning
- Show freezing process
- Final scooping to serve
- Close-ups of texture and quality
- Interview or voiceover (optional) explaining the craft

**Scene Sequence**:
1. **Opening** (5 seconds) - Ingredients arranged beautifully
2. **Preparation** (10 seconds) - Combining base ingredients
3. **Churning** (10 seconds) - Gelato maker in action
4. **Freezing** (8 seconds) - Proper consistency development
5. **Finishing** (10 seconds) - Scooping and serving
6. **Closing** (5-10 seconds) - Final product showcase

**Visual Style**:
- Documentary/educational tone
- Professional food photography techniques
- Show artisan care and attention to detail
- Include close-ups and wide shots
- Natural lighting where possible
- Color grade to match brand aesthetic

**Audio Options**:
- Ambient background music (instrumental, uplifting)
- Natural sounds (chiming of gelato maker, scooping)
- Voiceover explaining the process (English or Italian accent)
- Or completely silent with ambient music only

## Technical Implementation

### Video Components

The site uses custom video components from `lib/media-components.js`:

#### VideoBackground Component
```jsx
<VideoBackground 
  src="/videos/hero-gelato.mp4"
  poster="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&h=1200&fit=crop&q=80"
  className="w-full h-full"
/>
```

Features:
- Auto-play, muted, looped
- Responsive sizing
- Fallback poster image
- Dark overlay for text readability
- WebM fallback support

#### VideoPlayer Component
```jsx
<VideoPlayer
  src="/videos/gelato-making.mp4"
  poster="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop&q=85"
  title="Our Gelato Making Process"
/>
```

Features:
- User-controlled playback
- Standard HTML5 controls
- Responsive sizing
- Custom poster image
- WebM fallback support

### Video Compression & Optimization

#### For MP4 (Primary Format)
Use FFmpeg or Adobe Media Encoder:
```bash
# Hero video (high quality, optimized)
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 22 -s 1920x1080 \
  -c:a aac -b:a 128k -movflags +faststart hero-gelato.mp4

# Gelato-making video
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 23 -s 1920x1080 \
  -c:a aac -b:a 192k -movflags +faststart gelato-making.mp4
```

#### For WebM (Backup Format)
```bash
# Hero video
ffmpeg -i input.mov -c:v libvpx -crf 25 -s 1920x1080 \
  -c:a libopus -b:a 128k hero-gelato.webm

# Gelato-making video
ffmpeg -i input.mov -c:v libvpx -crf 25 -s 1920x1080 \
  -c:a libopus -b:a 192k gelato-making.webm
```

#### Tool Alternatives
- **Handbrake** (GUI, easy to use)
- **Adobe Media Encoder** (professional workflow)
- **DaVinci Resolve** (free, includes color grading)
- **Premiere Pro** (industry standard)

### Browser Compatibility

**Video Formats Support**:
- MP4 (H.264) - Safari, Edge, Chrome, Firefox ✓
- WebM (VP9) - Chrome, Firefox, Edge ✓
- Both formats ensure 99%+ browser coverage

**Adaptive Bitrate** (optional, for future CDN setup):
- Can implement HLS or DASH streaming
- Recommended for larger audiences
- Services: Cloudinary, Mux, AWS MediaConvert

## Video Sources & Production

### Option 1: Professional Videography
**Best for**: Premium brand presentation
- Hire local video production company in Utrecht
- Shoot at your actual location
- Professional equipment and color grading
- Estimated cost: €2,000-€5,000 per video

**Recommended local (Netherlands)**:
- Check local production companies
- Request portfolio with food videography experience

### Option 2: Stock Video Footage
**Best for**: Quick implementation, temporary solution
- Stock sources: Unsplash Videos, Pexels, Pixabay, Shutterstock
- Search terms: "Gelato making", "Ice cream preparation", "Pistachio gelato", "Artisan food"
- Cost: Free-€500 per video
- Quality: Professional but generic (not brand-specific)

### Option 3: DIY with Consumer Equipment
**Best for**: Budget-conscious, personal touch
- Use smartphone (iPhone/Android) or consumer camera
- Learn basic video composition and lighting
- Edit with free software (DaVinci Resolve, Shotcut)
- Time investment: 10-30 hours
- Cost: €0-€500 (if buying minimal equipment)

### Option 4: Stock Motion & Music Overlay
**Best for**: Rapid prototyping
- Use stock product footage
- Add captions and motion graphics
- Overlay with licensed background music
- Services: Envato Elements, Adobe Stock

## Implementation Steps

### 1. Prepare Video Files
- [ ] Record/source video content (both videos)
- [ ] Edit and color grade
- [ ] Compress to MP4 format (see specs above)
- [ ] Convert to WebM fallback format
- [ ] Create poster images (still frames from video)

### 2. Upload to Public Folder
```
public/videos/
├── hero-gelato.mp4
├── hero-gelato.webm
├── gelato-making.mp4
└── gelato-making.webm
```

### 3. Test Playback
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Test autoplay functionality
- [ ] Test fallback poster images
- [ ] Check file sizes and load times

### 4. Optimize for Web
- [ ] Ensure MP4 bitrate is 5-8 Mbps
- [ ] Enable HTTP progressive download
- [ ] Add `+faststart` flag to MP4 for faster streaming
- [ ] Test on slow 3G connections

### 5. Monitor Performance
- [ ] Check page load times
- [ ] Monitor bandwidth usage
- [ ] Consider CDN for large files (Cloudinary, Bunny CDN)
- [ ] Setup performance monitoring

## Alternative: Video Streaming Services

If video hosting becomes bandwidth-heavy:

### Cloudinary (Recommended)
- Free tier: 25 GB bandwidth/month
- Automatic optimization and WebM conversion
- Easy Next.js integration
- Cost: Free-$99/month

### Vimeo Pro
- Professional video hosting
- Analytics and viewer engagement
- Privacy controls
- Cost: $75-600/month

### YouTube (Private)
- Free unlimited hosting
- Good for internal/public videos
- Can embed on website
- Shows YouTube branding
- Cost: Free

### Bunny CDN Video Stream
- High-speed video delivery
- Low cost ($0.01/GB)
- Global CDN
- Cost: Pay-per-use

## Poster Images

Each video should have a poster image (thumbnail/preview):

### Hero Video Poster
- **Size**: 1920x1080px
- **Purpose**: Shows before video loads, on unsupported browsers
- **Content**: Beautiful pistachio gelato scoop or shop interior
- **Current**: Using Unsplash URL (can be replaced)

### Gelato-Making Poster
- **Size**: 1280x720px minimum
- **Purpose**: YouTube-style thumbnail before play
- **Content**: Artisan hands making gelato or finished product
- **Current**: Using Unsplash URL (can be replaced)

## Troubleshooting

### Video Won't Play
- Check file format (MP4 with H.264 codec)
- Verify file paths are correct (`/public/videos/`)
- Check browser console for errors
- Ensure browser supports H.264 (all modern browsers do)

### Video Autoplay Doesn't Work
- Browser must have `muted` attribute for autoplay
- Safari requires `muted` + `playsinline` attributes
- Some mobile browsers restrict autoplay

### Slow Load Times
- Compress video further (reduce bitrate)
- Consider WebM format (better compression)
- Upload to CDN instead of self-hosting
- Use lower resolution (1280x720) as alternative

### Audio Issues
- Ensure MP4 includes audio track (if needed)
- For gelato-making video, can mute and add music in post
- Test audio on different devices

## Next Steps

1. **Decide on video source**: Professional, stock, DIY, or hybrid
2. **Create production timeline**: 2-4 weeks for professional videography
3. **Plan equipment/budget**: €0-€5,000 depending on approach
4. **Storyboard content**: Create shot list for production
5. **Hire/coordinate**: Connect with videographer or source stock footage
6. **Edit and optimize**: Process videos according to specs above
7. **Upload and test**: Add to public folder and verify playback
8. **Monitor performance**: Track bandwidth and Core Web Vitals

## Quick Reference Checklist

- [ ] Hero video: 8-15 sec, 1920x1080, MP4 + WebM, 5-8 Mbps
- [ ] Gelato-making video: 30-60 sec, 1920x1080, MP4 + WebM, 5-8 Mbps
- [ ] Poster images: Matching dimensions and branding
- [ ] Browser testing: Desktop + mobile, all major browsers
- [ ] Performance testing: File sizes under limits, fast load times
- [ ] Accessibility: Consider captions for gelato-making video
- [ ] Backup plan: Stock video links if production delayed

## Resources

### Video Creation Tools
- DaVinci Resolve (Free) - Professional editing and color grading
- CapCut (Free) - Simple editing
- Shotcut (Free) - Open-source video editor
- Adobe Premiere Pro - Industry standard (subscription)

### Stock Video Sources
- https://pixabay.com/videos/ - Free
- https://www.pexels.com/videos/ - Free
- https://unsplash.com/videos - Free
- https://www.shutterstock.com/video - Paid

### Audio/Music
- https://www.bensound.com - Free background music
- https://freepd.com - Free music for projects
- Epidemic Sound - Professional background music (paid)

### Compression Tools
- FFmpeg (free, command-line)
- Handbrake (free, GUI)
- CloudConvert (free online tool)
- MediaEncoder (paid Adobe tool)
