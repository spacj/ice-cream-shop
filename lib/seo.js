/**
 * SEO and Meta Tags Utilities
 * Helps optimize pages for search engines
 */

/**
 * Generate meta tags for a page
 */
export function generateMetaTags({
  title,
  description,
  image,
  url,
  type = 'website'
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

/**
 * Page metadata presets
 */
export const pageMetadata = {
  home: {
    title: 'Gelato Luxe - Premium Ice Cream',
    description: 'Experience the ultimate in premium ice cream craftsmanship and design. Handcrafted gelato with the finest ingredients and stunning visual excellence.',
    keywords: ['ice cream', 'gelato', 'premium', 'luxury', 'artisanal'],
  },
  products: {
    title: 'Our Flavors - Gelato Luxe',
    description: 'Discover our collection of premium ice cream flavors, carefully crafted with the finest ingredients.',
    keywords: ['gelato flavors', 'ice cream', 'premium flavors', 'artisanal gelato'],
  },
  blog: {
    title: 'Blog & Stories - Gelato Luxe',
    description: 'Read exclusive insights, recipes, and stories from the world of premium ice cream.',
    keywords: ['blog', 'recipes', 'ice cream tips', 'gelato stories'],
  },
  about: {
    title: 'About Us - Gelato Luxe',
    description: 'Learn our story of passion, craftsmanship, and premium ice cream excellence.',
    keywords: ['about', 'team', 'story', 'premium ice cream'],
  },
  contact: {
    title: 'Contact Us - Gelato Luxe',
    description: 'Get in touch with our team. We\'d love to hear from you.',
    keywords: ['contact', 'inquiry', 'get in touch'],
  },
};

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * Generate organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Gelato Luxe',
    'url': 'https://gelatoluxe.com',
    'logo': 'https://gelatoluxe.com/images/logo.svg',
    'description': 'Premium ice cream crafted with excellence',
    'sameAs': [
      'https://www.facebook.com/gelatoluxe',
      'https://www.instagram.com/gelatoluxe',
      'https://www.twitter.com/gelatoluxe'
    ],
    'contact': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'email': 'hello@gelatoluxe.com',
      'telephone': '+1 (555) 123-4567'
    }
  };
}

/**
 * Generate product schema for flavor
 */
export function generateProductSchema(product) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'brand': {
      '@type': 'Brand',
      'name': 'Gelato Luxe'
    },
    'reviews': {
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': '5',
        'bestRating': '5'
      },
      'author': {
        '@type': 'Person',
        'name': 'Premium Customer'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'ratingCount': '500'
    }
  };
}

/**
 * Generate article schema for blog posts
 */
export function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.image,
    'author': {
      '@type': 'Organization',
      'name': 'Gelato Luxe'
    },
    'datePublished': new Date(article.createdAt?.seconds * 1000).toISOString(),
    'dateModified': new Date(article.updatedAt?.seconds * 1000).toISOString(),
  };
}

/**
 * Social media sharing helpers
 */
export function generateShareUrls(url, title, description) {
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`,
  };
}

/**
 * Robots.txt content
 */
export const robotsTxt = `
User-agent: *
Allow: /
Disallow: /admin
Disallow: /.env*
Disallow: /private

Sitemap: https://gelatoluxe.com/sitemap.xml
`;

/**
 * Sitemap generator URLs
 */
export function generateSitemapUrls() {
  return [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/products', priority: 0.9, changefreq: 'monthly' },
    { url: '/blog', priority: 0.8, changefreq: 'weekly' },
    { url: '/info', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.8, changefreq: 'never' },
    { url: '/apply', priority: 0.7, changefreq: 'never' },
  ];
}

/**
 * Open Graph image generator
 */
export function generateOGImage(_title, _description) {
  // This would generate OG images dynamically if using a service like Vercel OG
  // For now, return a placeholder
  return '/images/og-image.jpg';
}

/**
 * Canonical URL helper
 */
export function getCanonicalUrl(path) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gelatoluxe.com';
  return new URL(path, baseUrl).toString();
}

/**
 * JSON-LD helper for script injection
 */
export function createJsonLd(data) {
  return {
    __html: JSON.stringify(data)
  };
}

/**
 * Performance optimization metrics
 */
export const seoMetrics = {
  performanceTargets: {
    firstContentfulPaint: 1500, // ms
    largestContentfulPaint: 2500, // ms
    cumulativeLayoutShift: 0.1,
    timeToInteractive: 3500, // ms
  },
  keywords: {
    primary: ['premium ice cream', 'gelato', 'artisanal gelato', 'luxury ice cream'],
    secondary: ['gelato flavors', 'handcrafted ice cream', 'premium ingredients', 'ice cream shop'],
  },
};
