import './globals.css';
import Navigation from '@/components/Navigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import CookieConsent from '@/components/CookieConsent';

export const metadata = {
  title: 'Pistacchio - Authentic Sicilian Gelato in Utrecht',
  description: 'Experience authentic Sicilian pistachio gelato crafted with love and the finest ingredients from Italy',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ErrorBoundary>
          <Navigation />
          <main>{children}</main>
          <CookieConsent />
        </ErrorBoundary>
      </body>
    </html>
  );
}
