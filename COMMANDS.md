# ⚡ Quick Commands Reference

## Development

### Start Development Server
```bash
npm run dev
# Runs on http://localhost:3000
```

### Build for Production
```bash
npm run build
# Creates optimized build in .next folder
```

### Start Production Server
```bash
npm run start
# Runs optimized production build
```

### Lint Code
```bash
npm run lint
# Checks code quality with ESLint
```

---

## Firebase

### Login to Firebase
```bash
firebase login
# Authenticate with Google account
```

### Deploy to Firebase Hosting
```bash
npm run build
firebase deploy
# Deploys to Firebase Hosting + Functions
```

### View Firebase Logs
```bash
firebase functions:log
# Shows Cloud Function logs
```

---

## Database Management

### Export Firestore Data
```bash
# Using Firebase CLI
firebase firestore:export ./backup
```

### Import Firestore Data
```bash
firebase firestore:import ./backup
```

### Backup Database
```bash
# Create backup in Firebase Console
# Firestore > Backups > Create Backup
```

---

## Image Optimization

### Optimize Single Image (ImageMagick)
```bash
convert input.jpg -quality 80 -strip output.jpg
```

### Optimize All Images
```bash
# Using ImageMagick
for file in *.jpg; do
  convert "$file" -quality 80 -strip "opt_$file"
done
```

### Convert to WebP
```bash
cwebp -q 80 input.jpg -o output.webp
```

### Batch Convert Multiple Formats
```bash
# Using ImageMagick
mogrify -quality 80 -format webp *.jpg
```

---

## Git Commands

### Initialize Git
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/repo.git
git push -u origin main
```

### Common Git Operations
```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push to remote
git push

# Pull from remote
git pull

# Create branch
git checkout -b feature-name

# Switch branch
git checkout main

# Merge branch
git merge feature-name

# Delete branch
git branch -d feature-name
```

---

## Environment Variables

### Create .env.local
```bash
cp .env.local.example .env.local
# Edit with your Firebase credentials
```

### Required Variables
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## File Management

### Create Directories
```bash
mkdir -p public/images
mkdir -p public/videos
```

### Copy Files
```bash
cp source.jpg public/images/

# Copy folder
cp -r source-folder/ public/
```

### Remove Files
```bash
rm filename
rm -r folder-name
```

### List Directory Contents
```bash
ls -la public/images/
```

---

## Deployment Commands

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Firebase
```bash
# Install Firebase CLI
npm i -g firebase-tools

# Deploy
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

---

## Development Tools

### Install Dependencies
```bash
npm install
# or
npm i
```

### Update Dependencies
```bash
npm update
npm outdated  # Check for outdated packages
```

### Install Specific Package
```bash
npm install package-name
npm install --save-dev package-name  # Dev dependency
```

### Remove Package
```bash
npm uninstall package-name
```

### Clear Cache
```bash
npm cache clean --force
```

---

## Debugging

### Enable Debug Mode
```bash
DEBUG=* npm run dev
```

### View Network Requests
```
DevTools > Network > Reload page
```

### Check Console Errors
```
DevTools > Console > Look for red errors
```

### Debug Firestore
```javascript
// In your code
import { enableLogging } from 'firebase/firestore';
enableLogging(true);
```

---

## Performance

### Check Bundle Size
```bash
npm install --save-dev @next/bundle-analyzer

# In next.config.js:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Run
ANALYZE=true npm run build
```

### Lighthouse Audit
```
DevTools > Lighthouse > Generate report
```

### PageSpeed Insights
```
https://pagespeed.web.dev/
```

---

## Database Queries

### Read All Documents
```javascript
import { collection, getDocs } from 'firebase/firestore';

const snapshot = await getDocs(collection(db, 'articles'));
snapshot.forEach(doc => console.log(doc.data()));
```

### Query with Where
```javascript
import { query, where, getDocs } from 'firebase/firestore';

const q = query(collection(db, 'articles'), where('published', '==', true));
const snapshot = await getDocs(q);
```

### Add Document
```javascript
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

await addDoc(collection(db, 'test'), {
  name: 'Test',
  createdAt: serverTimestamp()
});
```

### Update Document
```javascript
import { updateDoc, doc } from 'firebase/firestore';

await updateDoc(doc(db, 'articles', 'docId'), {
  title: 'New Title'
});
```

### Delete Document
```javascript
import { deleteDoc, doc } from 'firebase/firestore';

await deleteDoc(doc(db, 'articles', 'docId'));
```

---

## Useful URLs

### Local Development
- App: http://localhost:3000
- Next.js API: http://localhost:3000/api
- Admin: http://localhost:3000/admin

### Firebase Console
- Firebase: https://console.firebase.google.com
- Authentication: https://console.firebase.google.com/project/[PROJECT]/authentication
- Firestore: https://console.firebase.google.com/project/[PROJECT]/firestore

### Deployment
- Vercel: https://vercel.com/dashboard
- Netlify: https://app.netlify.com
- Firebase Hosting: https://console.firebase.google.com/project/[PROJECT]/hosting/sites

### Developer Tools
- PageSpeed: https://pagespeed.web.dev/
- Can I Use: https://caniuse.com/
- MDN Web Docs: https://developer.mozilla.org/

---

## Clean Up

### Clear .next Cache
```bash
rm -rf .next
npm run dev
```

### Clear node_modules (Last Resort)
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Browser Cache
```
DevTools > Application > Storage > Clear site data
```

### Clean Up Build Files
```bash
rm -rf .next
rm -rf out
rm -rf dist
```

---

## Logs & Monitoring

### View App Logs (Vercel)
```bash
vercel logs
```

### View Deployment Logs (Netlify)
```bash
netlify logs:functions
```

### View Firebase Logs
```bash
firebase functions:log
firebase database:get /
```

---

## Configuration

### Edit Configuration Files
```bash
# Tailwind theme
nano tailwind.config.js

# Next.js config
nano next.config.js

# Environment variables
nano .env.local

# ESLint rules
nano .eslintrc.json
```

---

## Common Workflows

### Create New Page
```bash
# 1. Create directory
mkdir app/newpage

# 2. Create page.js
cat > app/newpage/page.js << 'EOF'
'use client';

export default function NewPage() {
  return <div>New Page</div>;
}
EOF

# 3. Visit http://localhost:3000/newpage
```

### Create New Component
```bash
cat > components/MyComponent.js << 'EOF'
export default function MyComponent() {
  return <div>Component</div>;
}
EOF
```

### Add New Collection to Firestore
```
1. Firebase Console > Firestore
2. Click "Create collection"
3. Enter collection ID
4. Add documents with fields
5. Use in code: collection(db, 'collection-id')
```

---

## Help Commands

### Show npm Scripts
```bash
npm run
```

### Show Next.js Help
```bash
npx next --help
```

### Show Firebase CLI Help
```bash
firebase --help
```

### Show Git Help
```bash
git help
git help commit
```

---

## Speed Tips

### Faster npm Install
```bash
# Use npm ci for CI/CD
npm ci

# Use pnpm for faster installs
npm install -g pnpm
pnpm install
```

### Faster Development
```bash
# Run linter only on changed files
npm run lint -- --fix

# Clear cache and build fast
rm -rf .next && npm run build
```

---

## Environment

### Check Node Version
```bash
node --version  # Should be 18+
```

### Check npm Version
```bash
npm --version   # Should be 8+
```

### Check Git Version
```bash
git --version
```

### Check Firebase CLI Version
```bash
firebase --version
```

---

## Pro Tips

1. **Alias npm scripts in .bashrc:**
   ```bash
   alias nr='npm run'
   alias nrd='npm run dev'
   ```

2. **Use git aliases:**
   ```bash
   git config --global alias.st status
   git config --global alias.co checkout
   git config --global alias.br branch
   ```

3. **Keep terminal tabs organized:**
   - Tab 1: `npm run dev`
   - Tab 2: `git` operations
   - Tab 3: General commands

4. **Use .gitignore effectively:**
   - Already configured in project
   - Add custom entries as needed

---

**Last Updated:** March 2026
**Version:** 1.0.0
