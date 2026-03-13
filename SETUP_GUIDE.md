# Gelato Luxe - Premium Ice Cream Shop Website
## Complete Setup Guide

### 📋 Prerequisites
- Node.js 18+ (https://nodejs.org/)
- npm or yarn package manager
- Firebase account (https://firebase.google.com/)
- Git (for version control)

---

## 🚀 Quick Start

### 1. **Clone or Download the Project**
```bash
cd ice-cream-shop
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Configure Firebase**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable these services:
   - **Authentication** (Email/Password)
   - **Firestore Database** (Production mode)
   - **Storage** (for image uploads)

4. Get your configuration from Firebase Console:
   - Settings → Project settings → General
   - Scroll to "Your apps" → Select or create a web app
   - Copy the configuration

5. Create `.env.local` file in the project root:
```bash
cp .env.local.example .env.local
```

6. Fill in your Firebase credentials in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. **Create Firebase Collections**

In Firestore, create these collections:

#### **admins** (for storing admin user IDs)
- Add a document with your user UID
- Fields: `uid` (string), `role` (string) = "admin"

#### **inquiries** (contact form submissions)
Structure:
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "type": "inquiry",
  "status": "new|read|responded",
  "createdAt": "timestamp"
}
```

#### **applications** (job applications)
Structure:
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "position": "string",
  "experience": "number",
  "coverLetter": "string",
  "type": "job_application",
  "status": "new|reviewing|contacted|rejected",
  "createdAt": "timestamp"
}
```

#### **articles** (blog posts)
Structure:
```json
{
  "title": "string",
  "excerpt": "string",
  "content": "string",
  "image": "string (URL)",
  "published": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "authorId": "string"
}
```

### 5. **Create an Admin User**

1. In Firebase Console → Authentication → Add user
2. Create account with test email/password
3. Get the user UID
4. In Firestore → admins collection → Add document with that UID

### 6. **Set Up Firestore Security Rules**

In Firestore → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public collections - anyone can read
    match /articles/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.keys();
    }
    
    // Admin only collections
    match /inquiries/{document=**} {
      allow read, write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    match /applications/{document=**} {
      allow read, write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    match /admins/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == document;
    }
    
    // Public can submit forms
    match /inquiries/{document=**} {
      allow create: if true;
    }
    
    match /applications/{document=**} {
      allow create: if true;
    }
  }
}
```

### 7. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
ice-cream-shop/
├── app/
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page
│   ├── products/page.js          # Products/Flavors
│   ├── contact/page.js           # Contact form
│   ├── apply/page.js             # Job applications
│   ├── info/page.js              # About/Info
│   ├── blog/
│   │   ├── page.js               # Blog listing
│   │   └── [id]/page.js          # Article detail
│   ├── admin/
│   │   ├── page.js               # Admin dashboard
│   │   ├── login/page.js         # Admin login
│   │   └── blog/
│   │       ├── new/page.js       # Create article
│   │       └── manage/page.js    # Edit articles
│   └── globals.css               # Global styles
├── components/
│   ├── Navigation.js             # Header nav
│   └── Logo.js                   # Animated logo
├── lib/
│   ├── firebase.js               # Firebase config
│   └── store.js                  # Auth store
├── public/                       # Static assets
│   ├── images/                   # Local images
│   └── videos/                   # Videos
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Customization

### **Colors**
Edit `tailwind.config.js` to change the color palette:
```javascript
colors: {
  'ice-pink': '#FF6B9D',    // Main pink
  'ice-purple': '#C44569',  // Secondary
  'ice-blue': '#00D4FF',    // Accent blue
  'ice-gold': '#FFD700',    // Gold accent
}
```

### **Fonts**
Edit `globals.css` to change fonts. Currently using:
- **Display**: Playfair Display (headings)
- **Body**: Poppins (text)

### **Images & Videos**
1. Create `/public/images` and `/public/videos` folders
2. Add your image/video files
3. Reference in code: `/images/filename.jpg`

---

## 🔐 Admin Setup

### First Time Admin Login:
1. Go to `/admin/login`
2. Enter email and password you created in Firebase Auth
3. If set up correctly, you'll be redirected to dashboard

### Admin Dashboard Features:
- **Inquiries Tab**: View & manage contact form submissions
- **Applications Tab**: View & manage job applications
- **Blog & Content Tab**: Create, edit, delete articles
- **Settings Tab**: Configure shop information

---

## 📝 Creating Blog Posts

1. Login to admin dashboard
2. Go to "Blog & Content" tab
3. Click "+ Create New Article"
4. Fill in:
   - Title
   - Excerpt (preview text)
   - Featured Image URL
   - Content (markdown supported)
   - Toggle "Publish immediately" to make it live
5. Click "Create Article"

Blog posts appear on `/blog` automatically when published.

---

## 🚀 Deployment

### **Deploy to Vercel** (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables from `.env.local`
6. Click "Deploy"

### **Deploy to Netlify**

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### **Deploy to Firebase Hosting**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🎥 Adding Videos

1. Upload video files to `/public/videos/`
2. Use in components:
```jsx
<video controls width="100%">
  <source src="/videos/ice-cream-making.mp4" type="video/mp4" />
</video>
```

---

## 🖼️ Adding Local Images

1. Place images in `/public/images/`
2. Reference in code:
```jsx
<img src="/images/flavor.jpg" alt="description" />
```

---

## 🐛 Troubleshooting

### Firebase Connection Issues:
- Verify `.env.local` has correct credentials
- Check Firebase console is accessible
- Ensure Firestore rules allow your requests

### Authentication Problems:
- Make sure admin document exists in `admins` collection
- Clear browser cookies and retry
- Check browser console for error messages

### Styling Issues:
- Run `npm install` to ensure Tailwind is installed
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

---

## 📞 Support & Maintenance

### Regular Tasks:
- Monitor inquiries and applications
- Publish new blog posts regularly
- Update product information
- Review and respond to messages

### Backups:
- Regularly export Firestore data via Firebase Console
- Keep code backed up on GitHub

---

## 🚀 Next Steps

1. ✅ Set up Firebase
2. ✅ Configure environment variables
3. ✅ Create admin user
4. ✅ Customize colors and content
5. ✅ Add your images and videos
6. ✅ Create first blog post
7. ✅ Deploy to production

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📄 License

This project is provided as-is for the Gelato Luxe ice cream shop.

---

**Happy Creating! 🍦✨**
