'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { FadeInOnScroll } from '@/lib/scroll-animations';

// Sample articles to display when Firebase is empty or for preview
const SAMPLE_ARTICLES = [
  {
    id: 'sicilian-pistachio',
    title: 'The Art of Sicilian Pistachio',
    excerpt: 'Discover why Sicilian pistachio is considered the gold standard in the gelato world, and the history behind our sourcing practices.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=500&fit=crop&q=85',
    category: 'Sourcing',
    date: 'March 10, 2025',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 'gelato-vs-ice-cream',
    title: 'Gelato vs Ice Cream: What\'s the Difference?',
    excerpt: 'Explore the key differences between gelato and ice cream, from ingredients and production methods to texture and taste.',
    image: 'https://images.unsplash.com/photo-1583114614970-cd1525b85b88?w=800&h=500&fit=crop&q=85',
    category: 'Education',
    date: 'March 5, 2025',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 'pistacchio-season',
    title: 'Inside Our Seasonal Pistachio Selection',
    excerpt: 'Learn about our seasonal pistachio sourcing, harvest cycles, and how we ensure consistency year-round in a production setting.',
    image: 'https://images.unsplash.com/photo-1629866066033-28d6af2d51b6?w=800&h=500&fit=crop&q=85',
    category: 'Craftsmanship',
    date: 'February 28, 2025',
    readTime: '7 min read',
    featured: false
  },
  {
    id: 'gelato-craft',
    title: 'The Craft Behind Every Scoop',
    excerpt: 'A behind-the-scenes look at how our artisans create gelato, from ingredient selection to the final freeze.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=500&fit=crop&q=85',
    category: 'Craftsmanship',
    date: 'February 20, 2025',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 'pairing-guide',
    title: 'The Ultimate Pistachio Pairing Guide',
    excerpt: 'Discover the best accompaniments for our pistachio gelato—from espresso to pastries to dessert wines.',
    image: 'https://images.unsplash.com/photo-1583114614970-cd1525b85b88?w=800&h=500&fit=crop&q=85',
    category: 'Tasting',
    date: 'February 15, 2025',
    readTime: '5 min read',
    featured: false
  },
  {
    id: 'farm-visit',
    title: 'Farm Visit: Bronte Sicily',
    excerpt: 'Our annual journey to Sicily to meet the farmers who grow the pistachio nuts we treasure and the relationships we build.',
    image: 'https://images.unsplash.com/photo-1629866066033-28d6af2d51b6?w=800&h=500&fit=crop&q=85',
    category: 'Stories',
    date: 'February 8, 2025',
    readTime: '9 min read',
    featured: true
  },
];

export default function Blog() {
  const [articles, setArticles] = useState(SAMPLE_ARTICLES);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Only fetch from Firebase if it's initialized
        if (db) {
          const q = query(collection(db, 'articles'), where('published', '==', true));
          const snapshot = await getDocs(q);
          const fbArticles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          if (fbArticles.length > 0) {
            setArticles(fbArticles);
          }
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Use sample articles on error
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const categories = ['all', ...new Set(articles.map(a => a.category))];
  const filteredArticles = selectedCategory === 'all' ? articles : articles.filter(a => a.category === selectedCategory);
  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream">
      {/* ===== HERO SECTION ===== */}
      <section className="px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="text-pistach-500 text-sm tracking-widest uppercase mb-4 font-semibold">
                Stories & Insights
              </p>
              <h1 className="font-serif text-6xl md:text-7xl text-charcoal mb-6">
                The Pistacchio Blog
              </h1>
              <div className="w-20 h-1 bg-caramel mx-auto mb-8"></div>
              <p className="text-xl text-grey-dark max-w-2xl mx-auto">
                Explore the art, science, and passion behind premium Sicilian pistachio gelato. From sourcing to tasting, discover what makes Pistacchio special.
              </p>
            </motion.div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-2 mb-20 px-4 flex-wrap"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
              selectedCategory === category
                ? 'bg-pistach-600 text-white shadow-lg'
                : 'bg-white border border-beige text-charcoal hover:border-pistach-500'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* ===== FEATURED ARTICLES ===== */}
      {featuredArticles.length > 0 && (
        <section className="px-4 mb-20">
          <div className="max-w-7xl mx-auto">
            <FadeInOnScroll>
              <h2 className="font-serif text-4xl font-bold text-charcoal mb-8">Featured Stories</h2>
            </FadeInOnScroll>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {featuredArticles.slice(0, 2).map((article) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                >
                  <Link href={`/blog/${article.id}`}>
                    <motion.div
                      className="group h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all bg-white flex flex-col"
                      whileHover={{ y: -8 }}
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden bg-grey-light">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-caramel/20 text-caramel text-xs font-bold rounded-full">
                              {article.category}
                            </span>
                            <span className="text-grey-light text-xs">{article.date}</span>
                          </div>
                          <h3 className="font-serif text-2xl font-bold text-charcoal mb-3 group-hover:text-pistach-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-grey-dark text-sm leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-beige">
                          <span className="text-grey-light text-xs font-semibold">{article.readTime}</span>
                          <motion.span
                            whileHover={{ x: 5 }}
                            className="text-pistach-600 font-semibold text-sm"
                          >
                            Read More →
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== ALL ARTICLES GRID ===== */}
      {loading ? (
        <div className="text-center text-grey-light py-20">
          <div className="animate-pulse">Loading articles...</div>
        </div>
      ) : regularArticles.length === 0 && featuredArticles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-grey-dark py-20"
        >
          <p className="mb-4 text-lg font-semibold">No articles found</p>
          <p className="text-sm">Check back soon for exclusive insights and stories!</p>
        </motion.div>
      ) : (
        <section className="px-4">
          <div className="max-w-7xl mx-auto">
            {featuredArticles.length > 0 && (
              <FadeInOnScroll>
                <h2 className="font-serif text-4xl font-bold text-charcoal mb-8">Latest Articles</h2>
              </FadeInOnScroll>
            )}

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {regularArticles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                >
                  <Link href={`/blog/${article.id}`}>
                    <motion.div
                      className="group h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all bg-white flex flex-col"
                      whileHover={{ y: -8 }}
                    >
                      {/* Image */}
                      {article.image && (
                        <div className="relative h-48 overflow-hidden bg-grey-light">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-pistach-50 text-pistach-700 text-xs font-bold rounded-full">
                              {article.category}
                            </span>
                            <span className="text-grey-light text-xs">{article.date}</span>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-charcoal mb-2 group-hover:text-pistach-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-grey-dark text-sm leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-beige">
                          <span className="text-grey-light text-xs font-semibold">{article.readTime}</span>
                          <motion.span
                            whileHover={{ x: 5 }}
                            className="text-pistach-600 font-semibold text-xs"
                          >
                            Read →
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="px-4 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-gradient-to-r from-pistach-50 to-ivory rounded-lg p-12 text-center border border-beige"
        >
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">
            Don't Miss Our Stories
          </h2>
          <p className="text-grey-dark mb-6">
            Subscribe to our newsletter for monthly insights about pistachio, gelato, and the art of artisanal craftsmanship.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-grey-light focus:outline-none focus:border-pistach-600 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-pistach-600 text-white rounded-lg font-semibold hover:bg-pistach-700 transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
