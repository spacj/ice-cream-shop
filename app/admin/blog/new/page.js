'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default function CreateBlogPost() {
  const { user, isAdmin } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'articles'), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        authorId: user.uid,
      });
      setSubmitStatus('success');
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error creating article:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="font-display text-4xl md:text-5xl text-gradient">
            Create Blog Post
          </h1>
          <Link href="/admin" className="text-ice-pink hover:text-ice-gold">
            ← Back to Dashboard
          </Link>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 md:p-12 space-y-6"
        >
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200"
            >
              ✓ Article created successfully! Redirecting...
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
            >
              ✗ Error creating article. Please try again.
            </motion.div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Article Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors text-lg"
              placeholder="Your article title..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Excerpt (preview text)
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={2}
              className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors resize-none"
              placeholder="Brief summary of your article..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Featured Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-ice-pink/20">
                <img src={formData.image} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Article Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={12}
              className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ice-pink transition-colors resize-none font-body"
              placeholder="Write your article content here..."
            />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="published" className="text-gray-300 cursor-pointer">
              Publish immediately
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full gradient-primary py-4 rounded-lg text-white font-semibold hover-lift disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Article'}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
