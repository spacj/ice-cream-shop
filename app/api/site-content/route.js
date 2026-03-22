import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { default: admin } = await import('firebase-admin');
    
    if (!admin.apps.length) {
      const firebaseConfig = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      };

      if (!firebaseConfig.projectId || !firebaseConfig.clientEmail || !firebaseConfig.privateKey) {
        return NextResponse.json({ error: 'Firebase Admin not configured' }, { status: 500 });
      }

      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
      });
    }

    const db = admin.firestore();
    
    const contentSnap = await db.collection('website').doc('content').get();
    const settingsSnap = await db.collection('website').doc('settings').get();
    
    return NextResponse.json({
      content: contentSnap.exists() ? contentSnap.data() : {},
      settings: settingsSnap.exists() ? settingsSnap.data() : {},
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
