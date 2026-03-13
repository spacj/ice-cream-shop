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
        <title>Gelato Luxe - Premium Ice Cream</title>
        <meta name="description" content="Experience the ultimate in premium ice cream craftsmanship and design" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
