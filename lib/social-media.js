'use client';

import { motion } from 'framer-motion';

/**
 * Social Media Share URLs Generator
 */
export function getSocialShareUrls(url, title, description, hashtags = '') {
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(hashtags)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\\n\\n' + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  };
}

/**
 * Social Media Share Buttons Component
 */
export function SocialShareButtons({ url, title, description = '', size = 'md' }) {
  const shareUrls = getSocialShareUrls(url, title, description, 'gelatoluxe');
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const platforms = [
    { icon: '👍', name: 'Facebook', url: shareUrls.facebook, color: '#1877F2' },
    { icon: '𝕏', name: 'Twitter', url: shareUrls.twitter, color: '#000000' },
    { icon: '🔗', name: 'LinkedIn', url: shareUrls.linkedin, color: '#0A66C2' },
    { icon: '💬', name: 'WhatsApp', url: shareUrls.whatsapp, color: '#25D366' },
    { icon: '📌', name: 'Pinterest', url: shareUrls.pinterest, color: '#E60023' },
    { icon: '✉️', name: 'Email', url: shareUrls.email, color: '#EA4335' },
  ];

  return (
    <motion.div
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {platforms.map((platform) => (
        <motion.a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${platform.name}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`${sizeClasses[size]} flex items-center justify-center rounded-full glass hover:bg-ice-pink/20 transition-colors`}
        >
          {platform.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}

/**
 * Social Media Follow Buttons Component
 */
export function SocialFollowButtons() {
  const socialLinks = [
    {
      platform: 'Instagram',
      url: 'https://instagram.com/gelatoluxe',
      icon: '📷',
      color: 'hover:text-pink-500',
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/gelatoluxe',
      icon: '👍',
      color: 'hover:text-blue-500',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/gelatoluxe',
      icon: '𝕏',
      color: 'hover:text-gray-500',
    },
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@gelatoluxe',
      icon: '🎵',
      color: 'hover:text-black',
    },
  ];

  return (
    <motion.div
      className="flex flex-wrap gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {socialLinks.map((link) => (
        <motion.a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Follow us on ${link.platform}`}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          className={`text-3xl ${link.color} transition-colors`}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}

/**
 * Instagram Feed Widget (placeholder)
 */
export function InstagramFeed() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-gradient-gold text-center mb-12">
          Follow Our Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="aspect-square glass rounded-lg overflow-hidden cursor-pointer group"
            >
              <div className="w-full h-full bg-gradient-to-br from-ice-pink/20 to-ice-blue/20 flex items-center justify-center group-hover:from-ice-pink/40 group-hover:to-ice-blue/40 transition-colors">
                <span className="text-4xl">📸</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.a
            href="https://instagram.com/gelatoluxe"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-3 border-2 border-ice-pink text-ice-pink rounded-full font-semibold hover:bg-ice-pink hover:text-white transition-colors"
          >
            Follow @gelatoluxe
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}

/**
 * Social Proof Widget
 */
export function SocialProof() {
  const proofItems = [
    {
      icon: '⭐',
      text: '4.9/5 stars on Google',
      count: '500+',
    },
    {
      icon: '👥',
      text: 'Active followers',
      count: '15K+',
    },
    {
      icon: '💬',
      text: 'Amazing reviews',
      count: '2.5K+',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {proofItems.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-6 text-center"
        >
          <div className="text-4xl mb-2">{item.icon}</div>
          <p className="font-display text-2xl text-ice-gold mb-2">{item.count}</p>
          <p className="text-gray-400">{item.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Social Meta Tags for Open Graph
 */
export function socialMetaTags(page) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gelatoluxe.com';
  
  const tags = {
    home: {
      ogTitle: 'Gelato Luxe - Premium Ice Cream',
      ogDescription: 'Experience premium ice cream crafted with excellence',
      ogImage: `${baseUrl}/images/og-home.jpg`,
      twitterCard: 'summary_large_image',
    },
    products: {
      ogTitle: 'Our Premium Flavors - Gelato Luxe',
      ogDescription: 'Discover our collection of exquisite ice cream flavors',
      ogImage: `${baseUrl}/images/og-products.jpg`,
      twitterCard: 'summary_large_image',
    },
    blog: {
      ogTitle: 'Blog & Stories - Gelato Luxe',
      ogDescription: 'Read exclusive insights and recipes from our team',
      ogImage: `${baseUrl}/images/og-blog.jpg`,
      twitterCard: 'summary',
    },
  };

  return tags[page] || tags.home;
}

/**
 * Hashtag suggestions for social media
 */
export const socialHashtags = {
  general: ['#GelatolLuxe', '#PremiumIceCream', '#Gelato', '#IceCreamLovers', '#ArtisanalGelato'],
  instagram: ['#FoodieFavorites', '#TreatYourself', '#Desserts', '#FoodPhotography'],
  twitter: ['#NewFlavor', '#SweetTreats', '#LocalBusiness', '#FoodieLife'],
  seasonal: {
    summer: ['#SummerTreats', '#CoolDownWIth', '#SummerFlavor'],
    winter: ['#CozyWinterVibe', '#SpecialWinterFlavor'],
    spring: ['#SpringRefresh', '#NewSeason'],
    fall: ['#FallFlavors', '#SeasonalSpecial'],
  },
};

/**
 * Social media best practices
 */
export const socialMediaTips = {
  instagram: [
    'Post 3-5 times per week',
    'Use 20-30 relevant hashtags',
    'Post reels and stories for engagement',
    'Engage with followers comments daily',
    'Share behind-the-scenes content',
  ],
  facebook: [
    'Post daily or every other day',
    'Use community engagement',
    'Share customer testimonials',
    'Post video content',
    'Create events for special occasions',
  ],
  twitter: [
    'Tweet 1-3 times daily',
    'Reply to mentions quickly',
    'Share trending topics',
    'Use trending hashtags',
    'Engage with customers',
  ],
  tiktok: [
    'Post 3-4 times per week',
    'Use trending sounds and effects',
    'Keep videos short (15-60 seconds)',
    'Engage with comments',
    'Follow trends in niche',
  ],
};
