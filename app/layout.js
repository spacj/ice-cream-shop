'use client';

import './globals.css';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import Navigation from '@/components/Navigation';

export default function RootLayout({ children }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pistacchio - Authentic Sicilian Gelato</title>
        <meta name="description" content="Experience authentic Sicilian pistachio gelato crafted with love and the finest ingredients from Italy" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
