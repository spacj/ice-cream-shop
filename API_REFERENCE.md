# 📚 API Reference & Data Structure Guide

## Overview

This document describes the data structures, Firebase collections, and API patterns used in Gelato Luxe.

---

## Firestore Collections

### 1. **articles** Collection

Published and draft blog articles.

#### Document Structure
```json
{
  "title": "string - Article title (required)",
  "excerpt": "string - Short preview text (required)",
  "content": "string - Full article content (required)",
  "image": "string - Featured image URL (optional)",
  "published": "boolean - Publication status (required)",
  "createdAt": "timestamp - Creation date",
  "updatedAt": "timestamp - Last update date",
  "authorId": "string - Creator's user ID"
}
```

#### Example Document
```json
{
  "title": "The Art of Premium Gelato",
  "excerpt": "Discover what makes our ice cream truly premium...",
  "content": "Long article content here...",
  "image": "/images/gelato-art.jpg",
  "published": true,
  "createdAt": {"_seconds": 1700000000, "_nanoseconds": 0},
  "updatedAt": {"_seconds": 1700000000, "_nanoseconds": 0},
  "authorId": "user_id_12345"
}
```

#### Queries
```javascript
// Get all published articles
const q = query(collection(db, 'articles'), where('published', '==', true));
const snapshot = await getDocs(q);

// Get specific article
const docSnap = await getDoc(doc(db, 'articles', articleId));
```

#### Indexes Required
- `articles` > `published` (Ascending)

---

### 2. **inquiries** Collection

Contact form submissions (anonymous).

#### Document Structure
```json
{
  "name": "string - Sender's name (required)",
  "email": "string - Sender's email (required)",
  "subject": "string - Inquiry subject (required)",
  "message": "string - Full message (required)",
  "type": "string - Always 'inquiry'",
  "status": "string - 'new' | 'read' | 'responded'",
  "createdAt": "timestamp - Submission date"
}
```

#### Example Document
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Bulk Order Inquiry",
  "message": "I'm interested in ordering gelato for my event...",
  "type": "inquiry",
  "status": "new",
  "createdAt": {"_seconds": 1700000000, "_nanoseconds": 0}
}
```

#### Queries
```javascript
// Get all new inquiries
const q = query(collection(db, 'inquiries'), where('status', '==', 'new'));

// Get all inquiries
const snapshot = await getDocs(collection(db, 'inquiries'));
```

#### Admin Operations
```javascript
// Update status
await updateDoc(doc(db, 'inquiries', inquiryId), {
  status: 'read'
});

// Delete inquiry
await deleteDoc(doc(db, 'inquiries', inquiryId));
```

---

### 3. **applications** Collection

Job application submissions (anonymous).

#### Document Structure
```json
{
  "fullName": "string - Applicant's full name (required)",
  "email": "string - Contact email (required)",
  "phone": "string - Phone number (required)",
  "position": "string - Applied position (required)",
  "experience": "number - Years of experience (required)",
  "coverLetter": "string - Motivation/about applicant (required)",
  "type": "string - Always 'job_application'",
  "status": "string - 'new' | 'reviewing' | 'contacted' | 'rejected'",
  "createdAt": "timestamp - Application date"
}
```

#### Example Document
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "position": "Ice Cream Maker",
  "experience": 5,
  "coverLetter": "I'm passionate about ice cream making and...",
  "type": "job_application",
  "status": "new",
  "createdAt": {"_seconds": 1700000000, "_nanoseconds": 0}
}
```

#### Queries
```javascript
// Get all new applications
const q = query(collection(db, 'applications'), where('status', '==', 'new'));

// Get applications for specific position
const q = query(collection(db, 'applications'), where('position', '==', 'Ice Cream Maker'));
```

#### Admin Operations
```javascript
// Update status
await updateDoc(doc(db, 'applications', appId), {
  status: 'contacted'
});

// Delete application
await deleteDoc(doc(db, 'applications', appId));
```

---

### 4. **admins** Collection

Admin user definitions.

#### Document Structure
```json
{
  // Document ID should be the Firebase User UID
  "uid": "string - Firebase Auth UID",
  "email": "string - Admin email",
  "role": "string - Always 'admin'",
  "createdAt": "timestamp - Admin creation date"
}
```

#### Example Document
```json
{
  "uid": "user_id_abc123",
  "email": "admin@gelatoluxe.com",
  "role": "admin",
  "createdAt": {"_seconds": 1700000000, "_nanoseconds": 0}
}
```

#### Setup
1. Create user in Firebase Auth
2. Copy the User UID
3. Create document in `admins` collection with UID as document ID
4. Add fields above

---

## Authentication

### Firebase Authentication

Uses email/password authentication.

#### User Creation (Firebase Console)
1. Go to Firebase Console > Authentication
2. Click "Add user"
3. Enter email and password
4. Copy the UID
5. Add document to `admins` collection with that UID

#### Login Flow
```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

try {
  const result = await signInWithEmailAndPassword(auth, email, password);
  // User logged in successfully
  const user = result.user;
} catch (error) {
  // Handle error
  console.error(error.message);
}
```

#### Logout
```javascript
import { signOut } from 'firebase/auth';

await signOut(auth);
```

#### Session Management
```javascript
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
  } else {
    // User is logged out
  }
});
```

---

## Data Validation

### Contact Form
```javascript
{
  name: string (2-100 chars) - Required
  email: string (valid email) - Required
  subject: string (5-200 chars) - Required
  message: string (10-5000 chars) - Required
}
```

### Job Application
```javascript
{
  fullName: string (2-100 chars) - Required
  email: string (valid email) - Required
  phone: string (10+ digits) - Required
  position: string (one of defined positions) - Required
  experience: number (0+) - Required
  coverLetter: string (20-5000 chars) - Required
}
```

### Blog Article
```javascript
{
  title: string (5-200 chars) - Required
  excerpt: string (10-300 chars) - Required
  content: string (50+ chars) - Required
  image: string (valid URL) - Optional
  published: boolean - Required
}
```

---

## Firebase Security Rules

See `FIREBASE_RULES.js` for complete security rules.

### Summary
- **articles:** Anyone can read published, only admins write
- **inquiries:** Anyone can create, only admins read
- **applications:** Anyone can create, only admins read
- **admins:** Only self-read, no direct write (manage via Firebase Console)

---

## Common Operations

### Create Document
```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const docRef = await addDoc(collection(db, 'articles'), {
  title: 'New Article',
  content: 'Content here...',
  published: false,
  createdAt: serverTimestamp(),
});
```

### Read Document
```javascript
import { doc, getDoc } from 'firebase/firestore';

const docSnap = await getDoc(doc(db, 'articles', 'article_id'));
if (docSnap.exists()) {
  console.log(docSnap.data());
}
```

### Read Collection
```javascript
import { collection, getDocs, query, where } from 'firebase/firestore';

const q = query(collection(db, 'articles'), where('published', '==', true));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.data());
});
```

### Update Document
```javascript
import { doc, updateDoc } from 'firebase/firestore';

await updateDoc(doc(db, 'articles', 'article_id'), {
  status: 'read',
  updatedAt: serverTimestamp(),
});
```

### Delete Document
```javascript
import { doc, deleteDoc } from 'firebase/firestore';

await deleteDoc(doc(db, 'articles', 'article_id'));
```

---

## Real-Time Listeners

### Listen to Document Changes
```javascript
import { doc, onSnapshot } from 'firebase/firestore';

const unsubscribe = onSnapshot(doc(db, 'articles', 'article_id'), (doc) => {
  console.log('Current data: ', doc.data());
});

// Stop listening
unsubscribe();
```

### Listen to Collection Changes
```javascript
import { collection, query, onSnapshot } from 'firebase/firestore';

const q = query(collection(db, 'articles'));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.data());
  });
});

// Stop listening
unsubscribe();
```

---

## Error Handling

### Common Firebase Errors

```javascript
catch (error) {
  const code = error.code;
  
  if (code === 'auth/user-not-found') {
    // User doesn't exist
  } else if (code === 'auth/wrong-password') {
    // Wrong password
  } else if (code === 'auth/invalid-email') {
    // Invalid email format
  } else if (code === 'permission-denied') {
    // Firestore security rule violation
  } else if (code === 'not-found') {
    // Document doesn't exist
  }
}
```

---

## Rate Limits

### Firebase Free Tier
- **Reads:** 50,000 per day
- **Writes:** 20,000 per day
- **Deletes:** 20,000 per day
- **Documents:** 100 free reads per day

### Firebase Blaze (Pay as You Go)
- **Reads:** $0.06 per 100,000 reads
- **Writes:** $0.18 per 100,000 writes
- **Deletes:** $0.02 per 100,000 deletes

---

## Pagination

### Implement Pagination
```javascript
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

const pageSize = 10;

// First page
let q = query(
  collection(db, 'articles'),
  orderBy('createdAt', 'desc'),
  limit(pageSize)
);

let snapshot = await getDocs(q);
let articles = snapshot.docs.map(doc => doc.data());

// Next page
if (!snapshot.empty) {
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  
  q = query(
    collection(db, 'articles'),
    orderBy('createdAt', 'desc'),
    startAfter(lastVisible),
    limit(pageSize)
  );
  
  snapshot = await getDocs(q);
  articles = snapshot.docs.map(doc => doc.data());
}
```

---

## Indexes

### Required Indexes
- `articles` collection:
  - `published` (Ascending)
  - `createdAt` (Descending)

### Optional Indexes
- `inquiries` collection:
  - `status` (Ascending)
  - `createdAt` (Descending)

- `applications` collection:
  - `position` (Ascending)
  - `status` (Ascending)

Firestore will auto-create suggested indexes.

---

## Performance Tips

1. **Index frequently queried fields**
2. **Use specific queries instead of reading all documents**
3. **Implement pagination for large result sets**
4. **Use real-time listeners only when necessary**
5. **Cache data locally when possible**
6. **Use batch operations for multiple writes**

---

## Example: Complete Flow

### Create and Publish Article
```javascript
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { auth } from '@/lib/firebase';

// 1. Create article (as draft)
const docRef = await addDoc(collection(db, 'articles'), {
  title: 'My Great Article',
  excerpt: 'Short preview...',
  content: 'Long content here...',
  image: '/images/article.jpg',
  published: false,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  authorId: auth.currentUser.uid,
});

// 2. Later, publish article
await updateDoc(doc(db, 'articles', docRef.id), {
  published: true,
  updatedAt: serverTimestamp(),
});

// 3. Read published articles
const q = query(
  collection(db, 'articles'),
  where('published', '==', true),
  orderBy('createdAt', 'desc')
);
const snapshot = await getDocs(q);
const articles = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

---

## Debugging

### Enable Debug Logging
```javascript
import { enableLogging } from 'firebase/firestore';

enableLogging(true); // In development only
```

### Monitor Firestore Usage
1. Go to Firebase Console > Firestore > Insights
2. View read/write operations
3. Check quota usage

### Common Issues
- **Quota exceeded:** Check usage limits
- **Permission denied:** Review security rules
- **Document not found:** Verify document ID
- **Network error:** Check internet connection

---

## Resources

- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [Security Rules Documentation](https://firebase.google.com/docs/firestore/security/start)
- [Query Documentation](https://firebase.google.com/docs/firestore/query-data/queries)

---

**Last Updated:** March 2026
**Version:** 1.0.0
