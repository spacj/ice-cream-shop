'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getDb } from '@/lib/firebase';
import Link from 'next/link';

export default function ArticleDetail({ params }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error('Firebase not initialized');
        }
        
        const { doc, getDoc } = await import('firebase/firestore');
        const docSnap = await getDoc(doc(db, 'articles', params.id));
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Error loading article');
        console.error(err);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-ice-pink border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl text-ice-pink mb-4">{error}</h1>
          <Link href="/blog" className="text-ice-blue hover:text-ice-gold">
            ← Back to Blog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {article.image && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-96 bg-gradient-to-br from-ice-pink/20 to-ice-blue/20 overflow-hidden"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto px-4 py-12"
      >
        <div className="mb-8">
          <Link href="/blog" className="text-ice-blue hover:text-ice-gold text-sm mb-4 inline-block">
            ← Back to Blog
          </Link>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl md:text-6xl text-gradient mb-4"
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 text-gray-400 text-sm flex-wrap"
          >
            <span>{article.createdAt?.toDate?.()?.toLocaleDateString?.() || 'Recent'}</span>
            <span className={`px-3 py-1 rounded-full ${
              article.published ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
            }`}>
              {article.published ? 'Published' : 'Draft'}
            </span>
          </motion.div>
        </div>

        {article.excerpt && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 italic mb-8 pb-8 border-b border-gray-700"
          >
            {article.excerpt}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="prose prose-invert max-w-none"
        >
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
            {article.content}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-700"
        >
          <h3 className="font-display text-2xl text-gradient-gold mb-6">
            More from our Blog
          </h3>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 gradient-primary rounded-lg text-white font-semibold hover-lift"
          >
            Explore All Articles
          </Link>
        </motion.div>
      </motion.article>
    </div>
  );
}
