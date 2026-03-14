# Quick Start: Adding Videos to Your Site

This is a simplified guide to get videos up and running quickly.

## TL;DR - Do This Now (5 Minutes)

### 1. Find Stock Videos (3 minutes)

**For Hero Video** (8-15 seconds of pistachio gelato):
- Go to https://www.pexels.com/videos/
- Search: "ice cream" or "gelato"
- Click "Download" button
- Choose 1080p version

**For Gelato-Making Video** (30-60 seconds):
- Go to https://pixabay.com/videos/
- Search: "food preparation" or "ice cream making"
- Click "Download" button
- Choose 1080p version

### 2. Compress Videos (1 minute)

Use free online tool CloudConvert:
1. Go to https://cloudconvert.com/mp4-to-mp4
2. Upload your video
3. Under "Output options", set:
   - Resolution: 1920x1080
   - Bitrate: 5000 kbps
4. Click "Convert"
5. Download MP4 file

*Note: If video is already good quality, skip this step*

### 3. Upload Videos (1 minute)

1. Save files with these exact names:
   - `hero-gelato.mp4`
   - `gelato-making.mp4`

2. Upload to: `public/videos/` folder in your project

3. That's it! Videos should now play on your site.

---

## Testing Videos Work

1. Go to your local website (http://localhost:3000)
2. Scroll to homepage - hero video should play in background
3. Scroll down to "Passion for Gelato" section - click play button on video
4. Videos should play without errors

**If videos don't play:**
- Check file names are EXACTLY correct
- Check files are in `public/videos/` folder
- Check browser console for error messages (F12 > Console tab)
- Ensure files are less than 50MB

---

## Slightly Better Option (15 Minutes)

Add WebM format for better compression:

1. Convert MP4 to WebM using free CloudConvert:
   - https://cloudconvert.com/mp4-to-webm
   - Set output quality to ~5000 kbps
   - Download the .webm file

2. Save as:
   - `hero-gelato.webm`
   - `gelato-making.webm`

3. Upload both to `public/videos/`

**Result**: Faster loading on modern browsers (Chrome, Firefox)

---

## Best Option (1-2 Hours)

### Use Pexels Stock Video + Edit It

1. **Find and Download** (10 minutes)
   - Visit https://www.pexels.com/videos/
   - Search "pistachio" or "ice cream making"
   - Download 4K version (you'll compress later)

2. **Edit Length** (30-40 minutes)
   - Open in DaVinci Resolve (free: https://www.blackmagicdesign.com/products/davinciresolve/)
   - Trim to required length (hero: 8-15 sec, gelato-making: 30-60 sec)
   - Add color correction (make greens/creams richer)
   - Export as MP4

3. **Convert Formats** (20-30 minutes)
   - Use CloudConvert to create WebM backup
   - Set bitrate to 5000 kbps for both formats

4. **Upload** (5 minutes)
   - Upload MP4 + WebM files to `public/videos/`
   - Done!

---

## Professional Option (4-6 Weeks)

1. Email local videographers your requirements
2. Get 2-3 quotes
3. Review portfolios
4. Sign contract
5. Shoot at your shop
6. Receive professional MP4/WebM files
7. Upload to site

**Cost**: €2,000-€5,000 (but looks premium)

---

## File Requirements Checklist

Before uploading, verify:

- [ ] **Hero Video** (`hero-gelato.mp4`)
  - Duration: 8-15 seconds
  - Resolution: 1920x1080 (or at least 1280x720)
  - File size: Under 15 MB
  - Format: MP4 with H.264 codec

- [ ] **Gelato-Making Video** (`gelato-making.mp4`)
  - Duration: 30-60 seconds
  - Resolution: 1920x1080 (or at least 1280x720)
  - File size: Under 40 MB
  - Format: MP4 with H.264 codec

- [ ] **Optional WebM Versions**
  - Same specs as MP4 versions
  - Files named `hero-gelato.webm` and `gelato-making.webm`

---

## Stock Video Recommendations (No Login Required)

### Free Sites to Browse Right Now:
1. **Pexels Videos** - https://www.pexels.com/videos/
   - Search: "ice cream", "gelato", "food"
   - Quality: Excellent
   - License: Free to use

2. **Pixabay Videos** - https://pixabay.com/videos/
   - Search: "food preparation", "cooking"
   - Quality: Very good
   - License: Free to use

3. **Unsplash Videos** - https://unsplash.com/videos
   - Search: "dessert", "gelato", "pistachio"
   - Quality: Professional
   - License: Free to use

### Pro Tip:
Search for specific terms:
- "Gelato making process"
- "Ice cream scooping"
- "Pistachio close up"
- "Food preparation close up"
- "Artisan dessert"

---

## Poster Images (Background Image When Video Loads)

Each video shows a poster image before it plays. Currently using:
- Hero: Pistachio gelato product image
- Gelato-making: Food preparation image

These are already set in the code, so you don't need to change them unless you want custom images.

---

## Troubleshooting

### "Videos aren't playing"
1. Make sure files are in `public/videos/` folder
2. Check file names are EXACTLY: `hero-gelato.mp4` and `gelato-making.mp4`
3. Restart development server: `npm run dev`
4. Clear browser cache (Ctrl+Shift+Del)

### "Hero video won't autoplay"
- This is normal on some mobile browsers
- Desktop/Chrome should show it
- Check that file isn't corrupted

### "Video is buffering / loading slowly"
- Compress video more aggressively
- Reduce bitrate to 3-4 Mbps instead of 5-8 Mbps
- Use WebM format (better compression)
- Convert to lower resolution (1280x720 instead of 1920x1080)

### "File is too large"
- Use CloudConvert to re-compress
- Reduce bitrate to 3000 kbps
- Reduce to 1280x720 resolution
- Use WebM format instead of MP4

---

## Next Steps After Adding Videos

1. ✅ Add videos to `public/videos/`
2. ⏭️ Test on website (should see videos playing)
3. ⏭️ Check mobile browsers work
4. ⏭️ Check page speed impact
5. ⏭️ Deploy to live server

---

## Still Have Questions?

Refer to the detailed guides:
- **VIDEO_IMPLEMENTATION.md** - Technical specs and detailed instructions
- **VIDEO_SOURCES.md** - Where to find and how to hire video creators

---

## Fastest Path Forward

**Right now (next 30 minutes):**
1. Go to Pexels Videos
2. Download 2 stock videos matching your needs
3. Rename them to `hero-gelato.mp4` and `gelato-making.mp4`
4. Upload to `public/videos/`
5. Restart dev server
6. Visit website and verify videos play

**This is good enough to launch!** You can upgrade to professional videos later.
