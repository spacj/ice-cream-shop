# 📁 Project Structure & File Organization Guide

## Complete Directory Tree

```
ice-cream-shop/
│
├── 📂 app/                              # Next.js App Router (pages & layouts)
│   ├── 📄 layout.js                     # Root layout wrapper
│   ├── 📄 page.js                       # Home page (/)
│   ├── 📄 globals.css                   # Global styles & animations
│   ├── 📄 not-found.js                  # 404 error page
│   │
│   ├── 📂 products/
│   │   └── 📄 page.js                   # Products/Flavors page
│   │
│   ├── 📂 info/
│   │   └── 📄 page.js                   # About/Info page
│   │
│   ├── 📂 contact/
│   │   └── 📄 page.js                   # Contact form page
│   │
│   ├── 📂 apply/
│   │   └── 📄 page.js                   # Job application page
│   │
│   ├── 📂 blog/
│   │   ├── 📄 page.js                   # Blog listing
│   │   └── 📂 [id]/
│   │       └── 📄 page.js               # Article detail page
│   │
│   └── 📂 admin/
│       ├── 📄 page.js                   # Admin dashboard
│       ├── 📂 login/
│       │   └── 📄 page.js               # Admin login page
│       └── 📂 blog/
│           ├── 📂 new/
│           │   └── 📄 page.js           # Create article page
│           └── 📂 manage/
│               └── 📄 page.js           # Manage articles page
│
├── 📂 components/                       # Reusable React components
│   ├── 📄 Navigation.js                 # Header/Navigation component
│   ├── 📄 Logo.js                       # Animated circular logo
│   └── 📄 Testimonials.js               # Customer testimonials
│
├── 📂 lib/                              # Utility functions & configs
│   ├── 📄 firebase.js                   # Firebase initialization
│   ├── 📄 store.js                      # Zustand auth store
│   └── 📄 utils.js                      # Helper utilities
│
├── 📂 public/                           # Static assets
│   ├── 📂 images/                       # Product & content images
│   │   └── 📄 (add your .jpg, .png files here)
│   └── 📂 videos/                       # Video files
│       └── 📄 (add your .mp4 files here)
│
├── 📂 node_modules/                     # Dependencies (auto-generated)
│   └── 📄 (many packages)
│
├── 📄 package.json                      # Project dependencies
├── 📄 package-lock.json                 # Dependency lock file
├── 📄 next.config.js                    # Next.js configuration
├── 📄 tailwind.config.js                # Tailwind CSS configuration
├── 📄 postcss.config.js                 # PostCSS configuration
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 .eslintrc.json                    # ESLint configuration
│
├── 📄 .env.local.example                # Environment variables template
├── 📄 .env.local                        # Environment variables (LOCAL ONLY)
├── 📄 .gitignore                        # Git ignore rules
│
├── 📄 README.md                         # Project overview
├── 📄 SETUP_GUIDE.md                    # Detailed setup instructions
├── 📄 DEPLOYMENT.md                     # Deployment guide
├── 📄 FEATURES.md                       # Feature checklist
├── 📄 API_REFERENCE.md                  # API & data structure docs
├── 📄 FIREBASE_RULES.js                 # Firebase security rules
│
└── 📄 setup.sh                          # Quick setup script
```

---

## File Descriptions

### App Directory (`/app`)

| File | Purpose |
|------|---------|
| `layout.js` | Root layout, wraps all pages |
| `page.js` | Home page (/) |
| `globals.css` | Global styles, fonts, animations |
| `not-found.js` | 404 error page |

### Pages

| Path | File | Description |
|------|------|-------------|
| `/` | `app/page.js` | Home with hero, animations, testimonials |
| `/products` | `app/products/page.js` | Ice cream flavors showcase |
| `/info` | `app/info/page.js` | Shop story, values, team |
| `/contact` | `app/contact/page.js` | Contact form |
| `/apply` | `app/apply/page.js` | Job application form |
| `/blog` | `app/blog/page.js` | Blog articles listing |
| `/blog/[id]` | `app/blog/[id]/page.js` | Single article view |
| `/admin` | `app/admin/page.js` | Admin dashboard |
| `/admin/login` | `app/admin/login/page.js` | Admin login |
| `/admin/blog/new` | `app/admin/blog/new/page.js` | Create article |
| `/admin/blog/manage` | `app/admin/blog/manage/page.js` | Edit articles |

### Components (`/components`)

| File | Purpose |
|------|---------|
| `Navigation.js` | Header with logo and menu |
| `Logo.js` | Animated circular ice cream logo |
| `Testimonials.js` | Customer reviews section |

### Library (`/lib`)

| File | Purpose |
|------|---------|
| `firebase.js` | Firebase app initialization |
| `store.js` | Zustand auth state management |
| `utils.js` | Helper functions, validation, animations |

### Public Assets (`/public`)

```
public/
├── images/
│   ├── logo.svg               # Logo (optional)
│   ├── flavor-1.jpg           # Ice cream photos
│   ├── flavor-2.jpg
│   ├── hero.jpg               # Hero background
│   ├── team-member-1.jpg      # Team photos
│   └── ...other images
│
└── videos/
    ├── ice-cream-making.mp4   # Process videos
    ├── shop-tour.mp4
    └── ...other videos
```

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata and dependencies |
| `next.config.js` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS theme and colors |
| `postcss.config.js` | PostCSS plugins (Tailwind, Autoprefixer) |
| `tsconfig.json` | TypeScript configuration |
| `.eslintrc.json` | ESLint rules for code quality |
| `.env.local.example` | Environment variables template |
| `.env.local` | Actual environment variables (git-ignored) |
| `.gitignore` | Files to ignore in git |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and features |
| `SETUP_GUIDE.md` | Step-by-step setup instructions |
| `DEPLOYMENT.md` | Deployment to production |
| `FEATURES.md` | Feature checklist and status |
| `API_REFERENCE.md` | Firebase collections and data structures |
| `FIREBASE_RULES.js` | Firestore security rules |

### Scripts

| File | Purpose |
|------|---------|
| `setup.sh` | Automated initial setup |

---

## Directory Purposes

### `/app`
**Next.js App Router directory**
- Contains all pages and layouts
- Each directory becomes a route
- `page.js` is the page component
- `layout.js` wraps child pages

### `/components`
**Reusable React components**
- Navigation
- Logo
- Testimonials
- Other UI components

### `/lib`
**Utility functions and configurations**
- Firebase setup
- Authentication store
- Helper functions
- Constants

### `/public`
**Static assets**
- Images (store locally)
- Videos
- Icons
- Fonts (if hosted locally)

### `/node_modules`
**Dependencies (auto-generated)**
- Don't edit directly
- Never commit to git
- Regenerate with `npm install`

---

## File Naming Conventions

### React Components
```javascript
// Use PascalCase for component files
Navigation.js
Logo.js
Testimonials.js

// They export default components
export default function Navigation() { ... }
```

### Pages
```javascript
// Use lowercase with dashes for directories
products/
contact/
admin/

// Page component file is always page.js
app/contact/page.js
```

### Utility Files
```javascript
// Use camelCase for utilities
firebase.js
store.js
utils.js
```

### Styles
```css
/* Global styles */
globals.css

/* Component styles in same file or inline CSS */
/* Using Tailwind CSS classes */
```

---

## Key Files to Modify

When customizing the project, focus on these files:

1. **Colors & Theme**
   - `tailwind.config.js` - Change color palette
   - `app/globals.css` - Update CSS variables

2. **Content**
   - `app/page.js` - Home page content
   - `app/info/page.js` - Shop information
   - `app/products/page.js` - Flavors list
   - Components - Feature descriptions

3. **Images**
   - Add to `/public/images/`
   - Update references in pages

4. **Admin Features**
   - `app/admin/page.js` - Dashboard
   - `app/admin/blog/new/page.js` - Create articles
   - `app/admin/blog/manage/page.js` - Edit articles

5. **Forms**
   - `app/contact/page.js` - Contact form
   - `app/apply/page.js` - Job application

---

## Environment Setup

### .env.local File Structure
```env
# Firebase (required)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Site Info (optional)
NEXT_PUBLIC_SITE_NAME=
NEXT_PUBLIC_SITE_EMAIL=
NEXT_PUBLIC_SITE_PHONE=
```

---

## Build Output

After running `npm run build`:

```
ice-cream-shop/
├── .next/                    # Next.js build output
│   ├── static/              # Static files
│   ├── server/              # Server-side code
│   └── ...other files
│
└── public/                  # Static assets (unchanged)
```

---

## Best Practices

### Code Organization
- ✅ Keep components small and focused
- ✅ Use shared utilities in `/lib`
- ✅ Organize styles with Tailwind classes
- ✅ Add comments for complex logic

### Git Management
- ✅ Never commit `.env.local`
- ✅ Never commit `node_modules/`
- ✅ Commit `.env.local.example` instead
- ✅ Keep `.gitignore` updated

### Performance
- ✅ Optimize images
- ✅ Use code splitting
- ✅ Lazy load components
- ✅ Monitor bundle size

### Development
- ✅ Use meaningful commit messages
- ✅ Test changes locally first
- ✅ Keep dependencies updated
- ✅ Follow ESLint rules

---

## Quick File Location Reference

Need to find something? Here's where to look:

| What | Location |
|------|----------|
| Change colors | `tailwind.config.js` |
| Update home page | `app/page.js` |
| Add new flavor | `app/products/page.js` |
| Update menu | `components/Navigation.js` |
| Add images | `public/images/` |
| Change animations | `app/globals.css` |
| Firebase config | `lib/firebase.js` |
| Admin features | `app/admin/` |
| Blog posts | Firestore (database) |
| Contact forms | Firestore (database) |
| Job applications | Firestore (database) |
| Environment vars | `.env.local` |
| Dependencies | `package.json` |
| Setup help | `SETUP_GUIDE.md` |

---

## Adding New Files

### New Page
```
1. Create directory: app/newpage/
2. Add page.js: app/newpage/page.js
3. Route available at: /newpage
```

### New Component
```
1. Create: components/MyComponent.js
2. Import in pages: import MyComponent from '@/components/MyComponent'
3. Use: <MyComponent />
```

### New Utility
```
1. Add function to: lib/utils.js
2. Export: export const myFunction = () => { ... }
3. Import: import { myFunction } from '@/lib/utils'
```

---

**Last Updated:** March 2026
**Version:** 1.0.0
