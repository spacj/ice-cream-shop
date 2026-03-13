'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, 'articles'), where('published', '==', true));
        const snapshot = await getDocs(q);
        setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

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
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-6xl md:text-7xl text-gradient mb-4">
            Blog & Stories
          </h1>
          <p className="text-gray-400 text-lg">
            Insights from the world of premium ice cream
          </p>
        </motion.div>

        {/* Articles Grid */}
        {loading ? (
          <div className="text-center text-gray-400">Loading articles...</div>
        ) : articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-12"
          >
            <p className="mb-4">No articles published yet.</p>
            <p className="text-sm">Check back soon for exclusive insights and stories!</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {articles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${article.id}`}>
                  <motion.div
                    className="glass rounded-2xl overflow-hidden hover-lift h-full flex flex-col"
                    whileHover={{ y: -8 }}
                  >
                    {/* Image */}
                    {article.image && (
                      <div className="relative h-48 bg-gradient-to-br from-ice-pink/20 to-ice-blue/20 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Date */}
                      <p className="text-ice-gold text-sm mb-2">
                        {article.createdAt?.toDate?.()?.toLocaleDateString?.() || 'Recent'}
                      </p>

                      {/* Title */}
                      <h3 className="font-display text-xl mb-3 text-white group-hover:text-ice-pink transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm leading-relaxed flex-1">
                        {article.excerpt || article.content?.substring(0, 100)}...
                      </p>

                      {/* Read More */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="mt-4 text-ice-blue hover:text-ice-gold transition-colors font-semibold"
                      >
                        Read More →
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Featured Section */}
        {articles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="glass rounded-3xl p-8 md:p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl text-gradient-gold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-400 mb-6">
                Get exclusive recipes, tips, and stories delivered to your inbox
              </p>
              <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink"
                />
                <button className="px-6 py-3 gradient-primary rounded-lg text-white font-semibold hover-lift">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
