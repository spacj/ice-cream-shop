'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Only fetch from Firebase if it's initialized
        if (db) {
          // Fetch inquiries
          const inquiriesSnap = await getDocs(
            query(collection(db, 'inquiries'), where('type', '==', 'inquiry'))
          );
          setInquiries(inquiriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

          // Fetch applications
          const appsSnap = await getDocs(
            query(collection(db, 'applications'), where('type', '==', 'job_application'))
          );
          setApplications(appsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user, isAdmin, router]);

  const handleDelete = async (collectionName, docId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, collectionName, docId));
        if (collectionName === 'inquiries') {
          setInquiries(inquiries.filter(i => i.id !== docId));
        } else {
          setApplications(applications.filter(i => i.id !== docId));
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleStatusChange = async (collectionName, docId, newStatus) => {
    try {
      await updateDoc(doc(db, collectionName, docId), { status: newStatus });
      if (collectionName === 'inquiries') {
        setInquiries(inquiries.map(i => i.id === docId ? { ...i, status: newStatus } : i));
      } else {
        setApplications(applications.map(i => i.id === docId ? { ...i, status: newStatus } : i));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const stats = [
    { label: 'Total Inquiries', value: inquiries.length, color: 'ice-pink' },
    { label: 'Total Applications', value: applications.length, color: 'ice-blue' },
    { label: 'New Inquiries', value: inquiries.filter(i => i.status === 'new').length, color: 'ice-gold' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-4xl md:text-5xl text-gradient"
        >
          Admin Dashboard
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={logout}
          className="px-6 py-2 border border-ice-pink text-ice-pink rounded-full hover:bg-ice-pink hover:text-white transition-colors"
        >
          Logout
        </motion.button>
      </div>

      {/* Stats */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className={`font-display text-4xl text-${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          {[
            { id: 'inquiries', label: 'Inquiries', icon: '📧' },
            { id: 'applications', label: 'Applications', icon: '📋' },
            { id: 'content', label: 'Blog & Content', icon: '✍️' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-ice-pink text-ice-pink'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : inquiries.length === 0 ? (
                <p className="text-gray-400">No inquiries yet</p>
              ) : (
                inquiries.map((inquiry) => (
                  <motion.div
                    key={inquiry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-1">{inquiry.subject}</h3>
                        <p className="text-gray-400 text-sm">From: {inquiry.name}</p>
                        <p className="text-gray-500 text-xs mt-1">{inquiry.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={inquiry.status || 'new'}
                          onChange={(e) => handleStatusChange('inquiries', inquiry.id, e.target.value)}
                          className="px-3 py-1 bg-dark/50 border border-ice-pink/20 rounded text-sm text-white"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="responded">Responded</option>
                        </select>
                        <button
                          onClick={() => handleDelete('inquiries', inquiry.id)}
                          className="px-3 py-1 text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {expandedItem === inquiry.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-700"
                      >
                        <p className="text-gray-300">{inquiry.message}</p>
                      </motion.div>
                    )}
                    <button
                      onClick={() => setExpandedItem(expandedItem === inquiry.id ? null : inquiry.id)}
                      className="mt-3 text-ice-pink hover:text-ice-gold text-sm"
                    >
                      {expandedItem === inquiry.id ? 'Hide' : 'View'} Message
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : applications.length === 0 ? (
                <p className="text-gray-400">No applications yet</p>
              ) : (
                applications.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-1">{app.position}</h3>
                        <p className="text-gray-400 text-sm">{app.fullName}</p>
                        <p className="text-gray-500 text-xs mt-1">{app.email} • {app.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={app.status || 'new'}
                          onChange={(e) => handleStatusChange('applications', app.id, e.target.value)}
                          className="px-3 py-1 bg-dark/50 border border-ice-pink/20 rounded text-sm text-white"
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="contacted">Contacted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button
                          onClick={() => handleDelete('applications', app.id)}
                          className="px-3 py-1 text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {expandedItem === app.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-700"
                      >
                        <div className="space-y-2 text-sm text-gray-300">
                          <p><strong>Experience:</strong> {app.experience} years</p>
                          <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                        </div>
                      </motion.div>
                    )}
                    <button
                      onClick={() => setExpandedItem(expandedItem === app.id ? null : app.id)}
                      className="mt-3 text-ice-pink hover:text-ice-gold text-sm"
                    >
                      {expandedItem === app.id ? 'Hide' : 'View'} Details
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="glass rounded-xl p-6">
              <Link href="/admin/blog/new" className="inline-block px-6 py-3 gradient-primary rounded-lg text-white font-semibold hover-lift mb-6">
                + Create New Article
              </Link>
              <p className="text-gray-400">Article management coming soon...</p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="glass rounded-xl p-6 space-y-6">
              <h3 className="font-display text-2xl text-ice-pink mb-4">Settings</h3>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Shop Name</label>
                <input type="text" defaultValue="Gelato Luxe" className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Shop Email</label>
                <input type="email" defaultValue="hello@gelatoluxe.com" className="w-full bg-dark/50 border border-ice-pink/20 rounded-lg px-4 py-3 text-white" />
              </div>
              <button className="px-6 py-3 gradient-primary rounded-lg text-white font-semibold hover-lift">
                Save Changes
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
