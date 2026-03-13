'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default function ManageBlog() {
  const { user, isAdmin } = useAuthStore();
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push('/admin/login');
      return;
    }

    const fetchArticles = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'articles'));
        setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
        await deleteDoc(doc(db, 'articles', id));
        setArticles(articles.filter(a => a.id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
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

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="font-display text-4xl md:text-5xl text-gradient">
            Manage Blog
          </h1>
          <div className="flex gap-3">
            <Link href="/admin/blog/new" className="px-6 py-3 gradient-primary rounded-lg text-white font-semibold hover-lift">
              + New Article
            </Link>
            <Link href="/admin" className="px-6 py-3 border border-ice-pink text-ice-pink rounded-lg hover:bg-ice-pink hover:text-white transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Articles List */}
        {loading ? (
          <p className="text-gray-400">Loading articles...</p>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-6">No articles yet. Create your first one!</p>
            <Link href="/admin/blog/new" className="inline-block px-6 py-3 gradient-primary rounded-lg text-white font-semibold hover-lift">
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
                className="glass rounded-xl overflow-hidden"
              >
                {editingId === article.id ? (
                  // Edit Mode
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Title</label>
                      <input
                        value={editData.title || ''}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Excerpt</label>
                      <textarea
                        value={editData.excerpt || ''}
                        onChange={(e) => setEditData({ ...editData, excerpt: e.target.value })}
                        rows={2}
                        className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-2 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Image URL</label>
                      <input
                        value={editData.image || ''}
                        onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                        className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Content</label>
                      <textarea
                        value={editData.content || ''}
                        onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                        rows={8}
                        className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-2 text-white resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditSave(article.id)}
                        className="px-4 py-2 gradient-primary rounded-lg text-white font-semibold"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 border border-gray-500 text-gray-400 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
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
                        <h3 className="font-display text-xl text-white truncate">{article.title}</h3>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleTogglePublish(article.id, article.published)}
                            className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                              article.published
                                ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                                : 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30'
                            }`}
                          >
                            {article.published ? '✓ Published' : '○ Draft'}
                          </button>
                          <button
                            onClick={() => handleEditClick(article)}
                            className="px-3 py-1 text-ice-blue hover:text-ice-gold rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="px-3 py-1 text-red-400 hover:text-red-300 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                      <p className="text-gray-500 text-xs">
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
