# 🍦 Gelato Luxe - Premium Ice Cream Shop Website

A stunning, premium Next.js website for a luxury ice cream shop featuring Firebase backend, admin dashboard, and incredible animations.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0+-black)
![React](https://img.shields.io/badge/React-18.0+-61dafb)

---

## ✨ Features

### 🎨 **Premium Design**
- Stunning circular animated logo with custom SVG
- Glass morphism UI with premium gradients
- Smooth animations using Framer Motion
- Fully responsive design
- Dark theme with sophisticated color palette

### 🛍️ **Product Showcase**
- 8 curated ice cream flavors
- Beautiful flavor cards with hover animations
- Category filtering system
- Detailed flavor information

### 📝 **Blog System**
- Create, edit, and delete articles
- Publish/unpublish functionality
- Featured image support
- Article detail pages
- Admin article management

### 🔐 **Admin Dashboard**
- Secure email/password authentication
- Manage contact inquiries
- Review job applications
- Blog content management
- Dashboard statistics
- Status tracking for submissions

### 📧 **Contact & Applications**
- Anonymous contact form
- Job application form
- Direct database storage
- Email notifications support

### 🎥 **Media Support**
- Video showcase grid
- Local image storage
- Responsive media handling

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
cd ice-cream-shop
npm install
```

2. **Configure Firebase**
```bash
cp .env.local.example .env.local
# Edit .env.local with your Firebase credentials
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

---

## 📁 Project Structure

```
ice-cream-shop/
├── app/
│   ├── layout.js              # Root layout
│   ├── page.js                # Home with hero & animations
│   ├── products/page.js       # Ice cream flavors (8 items)
│   ├── info/page.js           # About us / Shop story
│   ├── contact/page.js        # Contact form
│   ├── apply/page.js          # Job applications
│   ├── blog/
│   │   ├── page.js            # Blog listing
│   │   └── [id]/page.js       # Article detail
│   ├── admin/
│   │   ├── page.js            # Admin dashboard
│   │   ├── login/page.js      # Admin login
│   │   └── blog/
│   │       ├── new/page.js    # Create article
│   │       └── manage/page.js # Edit articles
│   ├── not-found.js           # 404 page
│   └── globals.css            # Global styles
├── components/
│   ├── Navigation.js          # Header with logo
│   ├── Logo.js               # Animated circular logo
│   └── Testimonials.js       # Customer reviews
├── lib/
│   ├── firebase.js           # Firebase config
│   └── store.js             # Zustand auth store
├── public/                   # Static assets
│   ├── images/              # Local images
│   └── videos/              # Video files
└── Configuration files...
```

---

## 🎨 Pages Overview

### **Home** (`/`)
- Hero section with animated gradient background
- Circular logo with multiple animations
- Call-to-action buttons
- Video showcase grid
- Feature highlights
- Testimonials section

### **Products** (`/products`)
- 8 premium flavor cards
- Hover animations and interactions
- Category filters
- Flavor descriptions with icons
- Limited edition section

### **About/Info** (`/info`)
- Shop story and values
- Team member profiles
- Statistics and achievements
- Call-to-action section

### **Blog** (`/blog`)
- Published articles listing
- Featured images
- Article previews
- Read more links
- Newsletter signup

### **Blog Article** (`/blog/[id]`)
- Full article content
- Featured image
- Publication date
- Related articles section

### **Contact** (`/contact`)
- Contact form (anonymous)
- Contact information
- Form validation
- Firebase storage

### **Apply** (`/apply`)
- Job application form
- Position selection
- Experience field
- Cover letter section
- Form validation

### **Admin Login** (`/admin/login`)
- Email/password authentication
- Firebase integration
- Error handling
- Premium styling

### **Admin Dashboard** (`/admin`)
- Inquiry management
- Application review
- Blog management
- Settings panel
- Statistics cards
- Status tracking

---

## 🔥 Firebase Setup

### Collections Structure

**admins**
```json
{
  "uid": "firebase_user_id",
  "role": "admin",
  "email": "admin@example.com"
}
```

**inquiries**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry topic",
  "message": "Message content",
  "type": "inquiry",
  "status": "new|read|responded",
  "createdAt": "timestamp"
}
```

**applications**
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "position": "Ice Cream Maker",
  "experience": 5,
  "coverLetter": "Why I want to join...",
  "type": "job_application",
  "status": "new|reviewing|contacted|rejected",
  "createdAt": "timestamp"
}
```

**articles**
```json
{
  "title": "Article Title",
  "excerpt": "Short preview",
  "content": "Full article content",
  "image": "https://example.com/image.jpg",
  "published": true,
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "authorId": "admin_user_id"
}
```

---

## 🎬 Features in Detail

### **Authentication**
- Email/password login
- Firebase Auth integration
- Admin role verification
- Secure session management
- Logout functionality

### **Admin Functions**
- ✅ View all inquiries
- ✅ View all applications
- ✅ Change submission status
- ✅ Delete submissions
- ✅ Create articles
- ✅ Edit articles
- ✅ Delete articles
- ✅ Publish/unpublish articles
- ✅ Manage settings

### **Animations**
- Floating logo animation
- Gradient text effects
- Hover lift effects
- Staggered animations
- Scroll-triggered animations
- Smooth page transitions
- Glow effects

### **Styling**
- Tailwind CSS
- Custom animations
- Gradient backgrounds
- Glass morphism effects
- Responsive design
- Dark theme
- Custom color palette

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework |
| **React 18** | UI library |
| **Firebase** | Backend & Auth |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Zustand** | State management |
| **React Hook Form** | Form handling |

---

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop experience
- ✅ Touch-friendly navigation
- ✅ Optimized performance

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy via Vercel dashboard
```

### Netlify
```bash
npm run build
# Deploy via Netlify dashboard
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase deploy
```

---

## 🔐 Security Features

- ✅ Firebase authentication
- ✅ Secure Firestore rules
- ✅ Admin role verification
- ✅ Environment variables for secrets
- ✅ Protected routes
- ✅ Input validation

---

## 📊 Performance

- Optimized images
- Code splitting
- CSS minification
- Smooth animations (60fps)
- Responsive layouts
- Fast page loads

---

## 🎯 Customization Guide

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'ice-pink': '#FF6B9D',
  'ice-blue': '#00D4FF',
  'ice-gold': '#FFD700',
}
```

### Change Fonts
Edit `app/globals.css` and `tailwind.config.js`

### Add Images/Videos
1. Create `/public/images` and `/public/videos`
2. Add files
3. Reference in code: `/images/filename.jpg`

### Modify Flavors
Edit `app/products/page.js` FLAVORS array

### Change Theme
Update color variables in `tailwind.config.js`

---

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed installation
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🐛 Troubleshooting

### Firebase Connection Issues
- Check `.env.local` credentials
- Verify Firestore rules
- Check Firebase console

### Styling Issues
- Clear `.next` folder
- Run `npm install`
- Restart dev server

### Authentication Problems
- Verify admin document exists
- Clear browser cookies
- Check browser console

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more troubleshooting.

---

## 📄 License

MIT License - Feel free to use this project!

---

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review [SETUP_GUIDE.md](./SETUP_GUIDE.md)
3. Check Firebase and Next.js documentation

---

## 🎉 Getting Started Checklist

- [ ] Set up Firebase project
- [ ] Configure `.env.local`
- [ ] Create Firestore collections
- [ ] Create admin user
- [ ] Add images/videos to `/public`
- [ ] Customize colors and content
- [ ] Create first blog post
- [ ] Test admin dashboard
- [ ] Deploy to production

---

**Made with ❤️ for Gelato Luxe**

🍦 ✨ Premium Ice Cream, Premium Website ✨ 🍦
