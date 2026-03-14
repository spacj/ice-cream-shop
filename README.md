# 🌿 Pistacchio Utrecht - Premium Sicilian Gelato Shop

A stunning, premium Next.js website for **Pistacchio**, an artisanal Sicilian pistachio gelato boutique in Utrecht, Netherlands. Features a sophisticated design, rich media galleries, blog system, and Firebase backend.

![Status](https://img.shields.io/badge/status-85%25%20complete-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0+-black)
![React](https://img.shields.io/badge/React-18.0+-61dafb)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0+-06b6d4)

---

## ✨ Features

### 🎨 **Premium Brand Design**
- Sophisticated color palette (cream, pistachio green, warm caramel)
- Playfair Display & Poppins typography
- Glass morphism effects and smooth animations
- Fully responsive mobile-first design
- Professional food photography presentation
- Rich visual storytelling

### 🌿 **Pistachio-Focused Content**
- 6 curated pistachio flavor variants
- Sicilian sourcing information
- Origin details (Bronte, Sicily)
- Flavor tasting notes
- Quality standards showcase
- Artisan craftsmanship highlighting

### 🎬 **Rich Media Experience**
- Hero video background (auto-playing)
- Gelato-making process video
- Interactive image galleries with lightbox
- Image carousels and sliders
- Lazy-loaded images with blur-up effect
- Responsive video players

### 📝 **Content Management**
- Blog system with Firebase integration
- 6 sample pistachio-themed articles
- Featured article highlighting
- Category filtering
- Article detail pages with related content
- Newsletter subscription ready

### 🏪 **Shop Information**
- Location details with map integration (planned)
- Shop hours and contact info
- Google Reviews display (currently static, API ready)
- Customer testimonials
- Behind-the-scenes storytelling
- Team and craftsmanship focus

### 🔐 **Admin Dashboard**
- Email/password authentication
- Contact inquiry management
- Article creation and editing
- Content publishing workflow
- Dashboard statistics
- Firebase Realtime Database integration

### 📧 **Contact & Engagement**
- Contact form with Firebase storage
- Location-based visiting information
- Social media links
- Newsletter subscription signup
- Email notification support (configurable)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account (optional, some features require it)

### Installation

1. **Clone and install**
```bash
cd ice-cream-shop
npm install
```

2. **Configure Firebase** (if using backend features)
```bash
cp .env.local.example .env.local
# Edit .env.local with your Firebase credentials
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

---

## 📚 Documentation

### 🎨 Design & Branding
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design guidelines, color palette, typography, component library
- **[REDESIGN_STRATEGY.md](./REDESIGN_STRATEGY.md)** - Brand philosophy and design evolution
- **[PROGRESS_SUMMARY.md](./PROGRESS_SUMMARY.md)** - Project completion status (85%), achievements, roadmap

### 🎬 Media & Videos
- **[QUICK_START_VIDEOS.md](./QUICK_START_VIDEOS.md)** - 5-minute guide to add videos (stock or professional)
- **[VIDEO_IMPLEMENTATION.md](./VIDEO_IMPLEMENTATION.md)** - Technical specs, compression, optimization
- **[VIDEO_SOURCES.md](./VIDEO_SOURCES.md)** - 10+ video sourcing options (free to €5,000)
- **[MEDIA_ASSETS.md](./MEDIA_ASSETS.md)** - Image specifications and directory structure

### 🛠️ Technical Setup
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Environment configuration, dependencies, Firebase setup
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions (Vercel, Netlify, Firebase Hosting)

---

## 📁 Project Structure

```
ice-cream-shop/
├── app/
│   ├── page.js                 # 🏠 Homepage (hero, products, craftsmanship, reviews)
│   ├── products/page.js        # 🍦 Pistachio flavors showcase (6 products)
│   ├── blog/
│   │   ├── page.js             # 📖 Blog listing with categories
│   │   └── [id]/page.js        # 📄 Individual article detail
│   ├── contact/page.js         # 📧 Contact form + location info
│   ├── layout.js               # Root layout with Navigation
│   ├── globals.css             # Global styles with Tailwind
│   ├── admin/                  # Admin dashboard (Firebase auth)
│   └── not-found.js            # 404 page
├── components/
│   └── Navigation.js           # Fixed header with logo
├── lib/
│   ├── media-components.js     # 🎬 Image galleries, video players
│   ├── scroll-animations.js    # Animation utilities
│   ├── firebase.js             # Firebase configuration
│   ├── store.js                # Zustand state management
│   └── location-reviews.js     # Maps & reviews components
├── public/
│   ├── images/                 # Local image directory
│   ├── videos/                 # Local video directory
│   └── logo.png                # Brand logo
├── Documentation/
│   ├── DESIGN_SYSTEM.md
│   ├── VIDEO_IMPLEMENTATION.md
│   ├── VIDEO_SOURCES.md
│   └── ... (6 more guides)
└── Configuration files (package.json, tailwind.config.js, etc.)
```

---

## 🎨 Pages Overview

### **Home** (`/`)
Full-page scrolling experience with:
- Hero section with video background overlay
- Featured pistachio flavors carousel
- "The Craft" section with gelato-making video
- Quality standards grid (4 pillars)
- Customer reviews with 4.9★ rating
- Location section with map placeholder
- Call-to-action sections

### **Products** (`/products`)
- Premium product showcase with 6 pistachio variants
- Flavor filtering (Signature vs Seasonal)
- Detailed cards with origin, notes, descriptions
- Quality standards section
- Responsive grid layout
- Visit boutique CTA

### **Blog** (`/blog`)
- Featured articles section
- Latest articles grid
- Category filtering
- Article metadata (date, read time, category)
- Newsletter subscription
- 6 sample articles included:
  - The Art of Sicilian Pistachio
  - Gelato vs Ice Cream
  - Seasonal Pistachio Selection
  - The Craft Behind Every Scoop
  - Pairing Guide
  - Farm Visit: Bronte Sicily

### **Contact** (`/contact`)
- Contact form with validation
- Location information
- Shop hours and contact details
- Social media links
- Reviews section
- Follow us call-to-action

### **Admin Dashboard** (`/admin`)
- Authentication required
- Manage inquiries and applications
- Blog post creation/editing
- Content publishing workflow
- Dashboard statistics

---

## 🎯 Current Status

### ✅ Completed (Phase 1-2)
- [x] Brand identity & design system
- [x] All 6 core pages built and styled
- [x] Component library (media, animations)
- [x] Firebase integration setup
- [x] Blog system with sample articles
- [x] Contact form with backend
- [x] Comprehensive documentation
- [x] Git repository with 25+ commits

### 🔄 In Progress (Phase 3)
- [ ] Add video files (hero and gelato-making)
- [ ] Replace placeholder images
- [ ] Test on all devices/browsers

### ⏳ Planned (Phase 3-4)
- [ ] Google Maps API integration
- [ ] Google Reviews API connection
- [ ] Contact form email notifications
- [ ] Performance optimization
- [ ] Production deployment

**Estimated completion**: Q2 2025

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework | 14.0+ |
| **React** | UI library | 18.0+ |
| **Tailwind CSS** | Styling system | 3.0+ |
| **Framer Motion** | Animations | 10.0+ |
| **Firebase** | Backend & Auth | 10.5+ |
| **Zustand** | State management | 4.4+ |
| **React Hook Form** | Form handling | 7.47+ |

---

## 🎨 Brand Colors

```css
/* Primary */
--pistach-500: #4A7C59;
--pistach-600: #3D6B4A;
--pistach-700: #2F5237;

/* Accents */
--caramel: #D4A574;
--cream: #FFFAF5;
--ivory: #F8F5F0;
--beige: #E8DFD5;

/* Text */
--charcoal: #3D3D3D;
--grey-dark: #6B6B6B;
--grey-light: #ABABAB;
```

---

## 🚀 Getting Started Checklist

### Development
- [ ] Install dependencies: `npm install`
- [ ] Configure Firebase (if using backend)
- [ ] Run dev server: `npm run dev`
- [ ] Test at http://localhost:3000

### Content
- [ ] Add video files to `public/videos/`
- [ ] Replace placeholder images (or keep Unsplash)
- [ ] Update contact form email settings
- [ ] Configure Google Maps API (optional)

### Deployment
- [ ] Build project: `npm run build`
- [ ] Test production build: `npm run start`
- [ ] Deploy to Vercel, Netlify, or similar
- [ ] Configure domain
- [ ] Set up HTTPS

### Post-Launch
- [ ] Monitor Core Web Vitals
- [ ] Track user engagement
- [ ] Optimize based on analytics
- [ ] Plan feature enhancements

---

## 📊 Performance

- ✅ Optimized images with lazy loading
- ✅ Responsive design (mobile-first)
- ✅ Smooth animations (60fps target)
- ✅ Code splitting for faster loads
- ✅ CSS minification
- ✅ Video compression & WebM fallback

---

## 🔐 Security

- ✅ Firebase authentication
- ✅ Environment variables for secrets
- ✅ Admin role verification
- ✅ Secure form handling
- ✅ No hardcoded credentials
- ✅ HTTPS ready

---

## 📱 Browser Support

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎥 Video Content

The website includes video support in two locations:

1. **Hero Background Video** (`/videos/hero-gelato.mp4`)
   - 8-15 seconds
   - 1920x1080 resolution
   - Autoplay, muted, looped

2. **Gelato-Making Process** (`/videos/gelato-making.mp4`)
   - 30-60 seconds
   - 1920x1080 resolution
   - User-initiated playback

**To add videos:**
1. See [QUICK_START_VIDEOS.md](./QUICK_START_VIDEOS.md) for fastest setup (5 min)
2. Or [VIDEO_SOURCES.md](./VIDEO_SOURCES.md) for all options (free to €5,000)
3. Or [VIDEO_IMPLEMENTATION.md](./VIDEO_IMPLEMENTATION.md) for technical details

---

## 🎯 Customization

### Change Brand Colors
Edit `tailwind.config.js` color palette:
```javascript
colors: {
  'pistach-500': '#4A7C59',
  'caramel': '#D4A574',
  // ... etc
}
```

### Modify Flavors
Edit product array in `app/products/page.js`

### Update Blog Articles
Use admin dashboard or edit sample articles in `app/blog/page.js`

### Add Your Images
1. Add files to `public/images/`
2. Reference as `/images/filename.jpg`

---

## 📞 Support & Documentation

- **Questions about videos?** → See [QUICK_START_VIDEOS.md](./QUICK_START_VIDEOS.md)
- **Need design guidelines?** → See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Setup issues?** → See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Want to deploy?** → See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Project status?** → See [PROGRESS_SUMMARY.md](./PROGRESS_SUMMARY.md)

---

## 🌍 Pistacchio Utrecht

**Location**: Korte Jansstraat 23, 3512 GN Utrecht, Netherlands  
**Hours**: Mon-Thu 12:00-22:00 | Fri-Sat 11:00-23:00 | Sun 12:00-21:00  
**Contact**: +31 (0)6 1234 5678 | hello@pistacchio-utrecht.nl

---

## 📄 License

MIT License - Feel free to use this project as a foundation for your own website!

---

## 🎉 Credits

Built with passion for premium artisanal gelato and sophisticated web design.

**Made with ❤️ for Pistacchio Utrecht**

🌿 ✨ Authentic Sicilian Pistachio, Premium Web Experience ✨ 🌿
