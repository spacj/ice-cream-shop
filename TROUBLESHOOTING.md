# 🔧 Troubleshooting Guide

## Common Issues & Solutions

---

## 1. Firebase Connection Issues

### Problem: "Firebase config is invalid"
**Symptoms:** Cannot connect to Firestore, auth fails

**Solutions:**
```bash
# 1. Check .env.local exists
ls -la .env.local

# 2. Verify credentials are correct
# Compare .env.local with Firebase Console

# 3. Check API key is enabled
# Firebase Console > APIs > Cloud Firestore API (enabled?)

# 4. Restart development server
npm run dev

# 5. Clear Next.js cache
rm -rf .next
npm run dev
```

### Problem: "PERMISSION_DENIED" error
**Symptoms:** Cannot read/write to Firestore despite authentication

**Solutions:**
1. **Check Firestore Rules:**
   - Go to Firebase Console > Firestore > Rules
   - Verify rules allow the operation
   - Check rule syntax is correct

2. **Check User Authentication:**
   - Verify user is logged in: `console.log(auth.currentUser)`
   - Check user UID matches rules
   - Verify email/password are correct

3. **Check Collection Exists:**
   - Go to Firebase Console > Firestore > Collections
   - Ensure collection name matches code
   - Check document structure

---

## 2. Authentication Issues

### Problem: Admin login not working
**Symptoms:** "Invalid credentials" error, cannot log in

**Solutions:**
```javascript
// 1. Verify admin user exists in Firebase Auth
// Firebase Console > Authentication > Users
// User should have email and password set

// 2. Check admin document exists in Firestore
// Collections > admins > Check document with user UID

// 3. Test credentials locally
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

try {
  const result = await signInWithEmailAndPassword(auth, email, password);
  console.log('Login successful:', result.user.uid);
} catch (error) {
  console.error('Login failed:', error.message);
}

// 4. Clear browser storage
// DevTools > Application > Local Storage > Clear All
// Then try login again
```

### Problem: Admin access not granted
**Symptoms:** Login works but no admin features visible

**Solutions:**
1. **Verify admin document:**
   - Go to Firestore > admins collection
   - Check document exists with user UID as ID
   - Verify fields are correct:
     ```json
     {
       "uid": "user_id_here",
       "role": "admin",
       "email": "admin@example.com"
     }
     ```

2. **Check store initialization:**
   ```javascript
   // In app/layout.js
   useEffect(() => {
     initializeAuth(); // This checks admin status
   }, []);
   ```

3. **Clear Zustand store:**
   ```javascript
   // Clear browser storage
   localStorage.clear()
   sessionStorage.clear()
   ```

---

## 3. Form Submission Issues

### Problem: Forms not submitting
**Symptoms:** Form appears to submit but nothing happens, no error message

**Solutions:**
```javascript
// 1. Check console for errors
// Browser DevTools > Console > Look for error messages

// 2. Verify Firestore permissions
// Make sure collection allows anonymous writes if public form

// 3. Check form validation
console.log('Form values:', formData);
console.log('Validation errors:', errors);

// 4. Test Firebase connection
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const testAdd = async () => {
  try {
    const ref = await addDoc(collection(db, 'test'), { test: true });
    console.log('Firebase works:', ref.id);
  } catch (error) {
    console.error('Firebase error:', error);
  }
};

// 5. Check network requests
// DevTools > Network > Look for fetch requests
// Check response status and body
```

### Problem: Form shows success but data not saved
**Symptoms:** Success message appears, but data not in Firestore

**Solutions:**
1. **Verify Firestore rules allow write:**
   ```javascript
   // Rules should include:
   match /inquiries/{doc} {
     allow create: if true; // Allow public submissions
   }
   ```

2. **Check collection name:**
   ```javascript
   // Code: collection(db, 'inquiries')
   // Firestore: Collection should be named 'inquiries'
   // Case-sensitive!
   ```

3. **Verify serverTimestamp:**
   ```javascript
   import { serverTimestamp } from 'firebase/firestore';
   
   await addDoc(collection(db, 'test'), {
     createdAt: serverTimestamp() // Must use this for timestamps
   });
   ```

---

## 4. Styling & Display Issues

### Problem: Tailwind CSS not working
**Symptoms:** Styles not applied, classes ignored

**Solutions:**
```bash
# 1. Check tailwind.config.js includes all file paths
# tailwind.config.js should have:
content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
]

# 2. Rebuild Tailwind
npm run dev

# 3. Clear .next cache
rm -rf .next
npm run dev

# 4. Check CSS file is imported
# app/layout.js should import './globals.css'

# 5. Verify class names are valid
# Only Tailwind core classes, no custom names
```

### Problem: Images not loading
**Symptoms:** Broken image icons, images not visible

**Solutions:**
```bash
# 1. Check image path
# ✓ /images/flavor.jpg
# ✗ ./images/flavor.jpg
# ✗ images/flavor.jpg

# 2. Verify image exists
ls public/images/

# 3. Check file name and extension
# Case-sensitive! flavor.jpg != flavor.JPG

# 4. Test image URL directly in browser
# http://localhost:3000/images/flavor.jpg

# 5. For Next.js Image component
import Image from 'next/image';

// Must have width and height
<Image
  src="/images/flavor.jpg"
  width={800}
  height={600}
  alt="Flavor"
/>
```

---

## 5. Performance Issues

### Problem: Site loading slowly
**Symptoms:** Page takes 5+ seconds to load

**Solutions:**
```bash
# 1. Check performance in DevTools
# DevTools > Lighthouse > Run audit

# 2. Check bundle size
# Use Next.js analyzer:
npm install --save-dev @next/bundle-analyzer

# 3. Optimize images
# See IMAGE_OPTIMIZATION.md

# 4. Enable caching
# next.config.js:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# 5. Check Firebase quota
# Firebase Console > Usage > Check read/write operations
```

### Problem: High Firestore costs
**Symptoms:** Firestore charges are high

**Solutions:**
1. **Reduce reads:**
   ```javascript
   // ✗ Bad: Reading entire collection
   const allDocs = await getDocs(collection(db, 'articles'));
   
   // ✓ Good: Query specific documents
   const q = query(
     collection(db, 'articles'),
     where('published', '==', true)
   );
   const docs = await getDocs(q);
   ```

2. **Use pagination:**
   ```javascript
   // Limit results
   const q = query(
     collection(db, 'articles'),
     limit(10)
   );
   ```

3. **Implement caching:**
   - Cache frequently accessed data
   - Use local state management
   - Set appropriate TTL

---

## 6. Deployment Issues

### Problem: "Build failed" on Vercel/Netlify
**Symptoms:** Deployment fails, error in logs

**Solutions:**
```bash
# 1. Build locally first
npm run build

# 2. Check Node version matches deployment platform
node --version # Should be 18+

# 3. Check environment variables are set
# Vercel/Netlify dashboard > Settings > Environment Variables
# All variables from .env.local should be added

# 4. Check for TypeScript errors
# If using TypeScript
npm run type-check

# 5. Check imports are correct
# All imports should be absolute paths with @/
import { db } from '@/lib/firebase'

# 6. Check for CommonJS issues
# Ensure all imports use ES6 modules
```

### Problem: Forms don't work after deployment
**Symptoms:** Forms work locally but not live

**Solutions:**
1. **Check environment variables:**
   - Verify Firebase credentials are in deployment
   - Check NEXT_PUBLIC_ variables are set

2. **Check Firestore rules:**
   - Rules might be different for production
   - Verify rules allow public submissions

3. **Check CORS:**
   - Firebase should handle CORS
   - Check browser console for CORS errors

4. **Test with curl:**
   ```bash
   curl https://gelatoluxe.vercel.app/api/test
   ```

---

## 7. Browser Compatibility

### Problem: Site broken in older browsers
**Symptoms:** Styling wrong, features don't work

**Solutions:**
```javascript
// 1. Check browser support for features used
// Use Can I Use: caniuse.com

// 2. Add polyfills if needed
// next.config.js:
const withPollyFills = require('next-polyfill-module')();

// 3. Use feature detection
if ('IntersectionObserver' in window) {
  // Use intersection observer
} else {
  // Fallback for older browsers
}

// 4. Test in different browsers
// Chrome, Firefox, Safari, Edge, IE 11
```

---

## 8. Database Issues

### Problem: Can't connect to Firestore
**Symptoms:** "Failed to fetch" errors, cannot load data

**Solutions:**
```bash
# 1. Check Firestore is enabled
# Firebase Console > Firestore Database > Create Database

# 2. Check internet connection
ping firebase.google.com

# 3. Check firewall isn't blocking Firebase
# Try from different network

# 4. Check database region
# Firestore should be in supported region
# Firebase Console > Firestore > Settings > Locations

# 5. Temporarily disable VPN/Proxy
# Some VPNs block Firebase connections
```

### Problem: Data not persisting
**Symptoms:** Data appears to save but disappears after page reload

**Solutions:**
1. **Verify Firestore write succeeded:**
   ```javascript
   const docRef = await addDoc(collection(db, 'test'), data);
   console.log('Document written with ID: ', docRef.id); // Should print ID
   ```

2. **Check Firestore quota:**
   - Firebase Console > Usage
   - Might have hit write quota

3. **Check browser storage:**
   - Data might be cached locally
   - DevTools > Application > Storage > Clear

---

## 9. Email Notifications

### Problem: Email notifications not sending
**Symptoms:** Forms submit but no email received

**Solutions:**
1. **Check email service is configured:**
   - nodemailer/SendGrid API keys set?
   - Service credentials correct?

2. **Check email server is running:**
   - If using nodemailer with Gmail, needs App Password
   - If using SendGrid, API key must be valid

3. **Check spam folder:**
   - Email might be marked as spam
   - Add to contacts to whitelist

4. **Test email service:**
   ```javascript
   import { sendTestEmail } from '@/lib/email';
   
   await sendTestEmail('test@example.com');
   ```

---

## 10. Performance Monitoring

### Problem: Page metrics show poor performance
**Symptoms:** LCP > 2.5s, CLS > 0.1, FID > 100ms

**Solutions:**
1. **Check Core Web Vitals:**
   - Google PageSpeed Insights: pagespeed.web.dev
   - WebVitals extension

2. **Optimize images first:**
   - Largest Contentful Paint usually image-related
   - See IMAGE_OPTIMIZATION.md

3. **Reduce JavaScript:**
   - Code splitting
   - Lazy loading
   - Remove unused dependencies

4. **Use monitoring tools:**
   - Vercel Analytics
   - Firebase Performance Monitoring
   - Sentry for errors

---

## Quick Diagnostic Checklist

When something breaks, check these in order:

- [ ] Console errors? (DevTools > Console)
- [ ] Network errors? (DevTools > Network)
- [ ] Firebase connected? (Can write to test collection?)
- [ ] Environment variables set? (.env.local exists?)
- [ ] Firestore rules allow operation? (Check rules)
- [ ] Collection exists in Firestore? (Check console)
- [ ] Images/files exist? (Check public folder)
- [ ] Port 3000 available? (Try different port)
- [ ] Dependencies installed? (npm install)
- [ ] Build succeeds? (npm run build)

---

## Getting Help

1. **Check console first** - Most errors are there
2. **Search the docs** - SETUP_GUIDE.md, API_REFERENCE.md
3. **Check Firebase docs** - firebase.google.com/docs
4. **Search GitHub issues** - Common problems solved
5. **Ask in communities** - Stack Overflow, Reddit, Discord

---

## Debug Mode

Enable debug logging:

```javascript
// lib/firebase.js
import { enableLogging } from 'firebase/firestore';

if (process.env.NODE_ENV === 'development') {
  enableLogging(true);
}
```

---

**Last Updated:** March 2026
**Version:** 1.0.0
