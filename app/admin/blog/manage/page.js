'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDb } from '@/lib/firebase';
import Link from 'next/link';

export default function ManageBlog() {
  const { user, isAdmin, initializeAuth } = useAuthStore();
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push('/admin/login');
      return;
    }

    const fetchArticles = async () => {
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
      setLoading(false);
    };

    fetchArticles();
  }, [user, isAdmin, router]);

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

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold text-slate-100">
            Manage Blog
          </h1>
          <div className="flex gap-3">
            <Link href="/admin/blog/new" className="px-4 py-2 bg-pistach-600 text-white rounded-lg hover:bg-pistach-500 transition-colors">
              + New Article
            </Link>
            <Link href="/admin" className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </motion.div>

        {loading ? (
          <p className="text-slate-400">Loading articles...</p>
        ) : articles.length === 0 ? (
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
    </div>
  );
}