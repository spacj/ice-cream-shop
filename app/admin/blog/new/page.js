'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDb } from '@/lib/firebase';
import Link from 'next/link';

const ICONS = {
  home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
  'file-text': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
  chevronLeft: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />,
};

function Icon({ name, className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {ICONS[name]}
    </svg>
  );
}

export default function CreateBlogPost() {
  const { user, isAdmin, logout, initializeAuth } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    published: false,
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (loading) return;
    if (!user || !isAdmin) {
      router.push('/admin/login?redirect=/admin/blog/new');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');

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
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pistach-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="font-bold text-white">Pistacchio</h1>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {[
              { id: '/admin', label: 'Dashboard', icon: 'home' },
              { id: '/admin/blog/manage', label: 'Articles', icon: 'file-text' },
            ].map((item) => (
              <li key={item.id}>
                <Link
                  href={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <Icon name={item.icon} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <Icon name="logout" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 pt-20 px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 text-slate-400 hover:text-white transition-colors">
                <Icon name="chevronLeft" className="w-6 h-6" />
              </Link>
              <h1 className="text-3xl font-bold text-slate-100">
                Create Blog Post
              </h1>
            </div>
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
              disabled={submitStatus === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-pistach-600 text-white py-3 rounded-lg font-semibold hover:bg-pistach-500 transition-colors disabled:opacity-50"
            >
              {submitStatus === 'loading' ? 'Creating...' : 'Create Article'}
            </motion.button>
          </motion.form>
        </div>
      </main>
    </div>
  );
}