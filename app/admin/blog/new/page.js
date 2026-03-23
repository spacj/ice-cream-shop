'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDb } from '@/lib/firebase';
import Link from 'next/link';

export default function CreateBlogPost() {
  const { user, isAdmin, initializeAuth } = useAuthStore();
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
    initializeAuth();
  }, [initializeAuth]);

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
      const db = await getDb();
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
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

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold text-slate-100">
            Create Blog Post
          </h1>
          <Link href="/admin" className="text-pistach-400 hover:text-pistach-300 transition-colors">
            ← Back to Dashboard
          </Link>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-6 md:p-8 space-y-6"
        >
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-200"
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

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Article Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500 transition-colors text-lg"
              placeholder="Your article title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Excerpt (preview text)
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={2}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500 transition-colors resize-none"
              placeholder="Brief summary of your article..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-slate-600">
                <img src={formData.image} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Article Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={12}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500 transition-colors resize-none"
              placeholder="Write your article content here..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="w-4 h-4 rounded cursor-pointer bg-slate-700 border-slate-600"
            />
            <label htmlFor="published" className="text-slate-300 cursor-pointer">
              Publish immediately
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-pistach-600 text-white py-3 rounded-lg font-semibold hover:bg-pistach-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Article'}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}