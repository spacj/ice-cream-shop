// Firebase Firestore Security Rules
// Copy this to: Firebase Console > Firestore Database > Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is admin
    function isAdmin() {
      return exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // === ARTICLES COLLECTION ===
    // Articles are public to read, only admins can write
    match /articles/{articleId} {
      // Anyone can read published articles
      allow read: if resource.data.published == true;
      
      // Admins can read all articles (draft + published)
      allow read: if isAuthenticated() && isAdmin();
      
      // Only admins can create, update, delete
      allow create: if isAuthenticated() && isAdmin();
      allow update: if isAuthenticated() && isAdmin();
      allow delete: if isAuthenticated() && isAdmin();
    }
    
    // === INQUIRIES COLLECTION ===
    // Public can create (submit form), only admins can read/manage
    match /inquiries/{inquiryId} {
      // Anyone can create (submit inquiry)
      allow create: if true;
      
      // Only admins can read
      allow read: if isAuthenticated() && isAdmin();
      
      // Only admins can update (change status)
      allow update: if isAuthenticated() && isAdmin();
      
      // Only admins can delete
      allow delete: if isAuthenticated() && isAdmin();
    }
    
    // === APPLICATIONS COLLECTION ===
    // Public can create (submit form), only admins can read/manage
    match /applications/{applicationId} {
      // Anyone can create (submit application)
      allow create: if true;
      
      // Only admins can read
      allow read: if isAuthenticated() && isAdmin();
      
      // Only admins can update (change status)
      allow update: if isAuthenticated() && isAdmin();
      
      // Only admins can delete
      allow delete: if isAuthenticated() && isAdmin();
    }
    
    // === ADMINS COLLECTION ===
    // Admins can read their own document
    match /admins/{adminId} {
      allow read: if isAuthenticated() && request.auth.uid == adminId;
      allow write: if false; // Manage via Firebase Console
    }
    
    // === DEFAULT DENY ===
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
