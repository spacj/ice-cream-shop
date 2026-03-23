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
  plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
};

function Icon({ name, className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {ICONS[name]}
    </svg>
  );
}

export default function ManageBlog() {
  const { user, isAdmin, logout, initializeAuth } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (loading) return;
    if (!user || !isAdmin) {
      router.push('/admin/login?redirect=/admin/blog/manage');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!user || !isAdmin) return;
      try {
        const db = await getDb();
        if (db) {
          const { collection, getDocs } = await import('firebase/firestore');
          const snapshot = await getDocs(collection(db, 'articles'));
          setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [user, isAdmin]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const db = await getDb();
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'articles', id));
        setArticles(articles.filter(a => a.id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const db = await getDb();
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'articles', id), {
        published: !currentStatus
      });
      setArticles(articles.map(a => 
        a.id === id ? { ...a, published: !currentStatus } : a
      ));
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleEditClick = (article) => {
    setEditingId(article.id);
    setEditData(article);
  };

  const handleEditSave = async (id) => {
    try {
      const db = await getDb();
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'articles', id), {
        title: editData.title,
        excerpt: editData.excerpt,
        content: editData.content,
        image: editData.image,
      });
      setArticles(articles.map(a => 
        a.id === id ? { ...a, ...editData } : a
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating article:', error);
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

      <main className="ml-64 pt-8 px-8 pb-8">
        <div className="max-w-6xl mx-auto">
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
                Manage Articles
              </h1>
            </div>
            <Link href="/admin/blog/new" className="flex items-center gap-2 px-4 py-2 bg-pistach-600 text-white rounded-lg hover:bg-pistach-500 transition-colors">
              <Icon name="plus" className="w-4 h-4" />
              New Article
            </Link>
          </motion.div>

          {articles.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <p className="text-slate-400 mb-6">No articles yet. Create your first one!</p>
              <Link href="/admin/blog/new" className="inline-block px-6 py-3 bg-pistach-600 text-white rounded-lg hover:bg-pistach-500 transition-colors">
                Create Article
              </Link>
            </div>
          ) : (
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-800/80 border border-slate-700/50 rounded-xl overflow-hidden"
                >
                  {editingId === article.id ? (
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                        <input
                          value={editData.title || ''}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-pistach-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Excerpt</label>
                        <textarea
                          value={editData.excerpt || ''}
                          onChange={(e) => setEditData({ ...editData, excerpt: e.target.value })}
                          rows={2}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 resize-none focus:outline-none focus:border-pistach-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Image URL</label>
                        <input
                          value={editData.image || ''}
                          onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-pistach-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Content</label>
                        <textarea
                          value={editData.content || ''}
                          onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                          rows={8}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 resize-none focus:outline-none focus:border-pistach-500"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditSave(article.id)}
                          className="px-4 py-2 bg-pistach-600 text-white rounded-lg hover:bg-pistach-500 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 border border-slate-600 text-slate-400 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 flex items-start justify-between gap-6">
                      {article.image && (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl font-semibold text-slate-100 truncate">{article.title}</h3>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleTogglePublish(article.id, article.published)}
                              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                article.published
                                  ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                  : 'bg-slate-600/50 text-slate-400 hover:bg-slate-600'
                              }`}
                            >
                              {article.published ? '✓ Published' : '○ Draft'}
                            </button>
                            <button
                              onClick={() => handleEditClick(article)}
                              className="px-3 py-1 text-pistach-400 hover:text-pistach-300 rounded text-sm transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="px-3 py-1 text-red-400 hover:text-red-300 rounded text-sm transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                        <p className="text-slate-500 text-xs">
                          {article.createdAt?.toDate?.()?.toLocaleDateString?.() || 'Recent'}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}