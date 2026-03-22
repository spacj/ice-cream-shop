'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDb } from '@/lib/firebase';
import Link from 'next/link';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home', href: '/admin' },
  { id: 'inquiries', label: 'Inquiries', icon: 'mail', href: null },
  { id: 'applications', label: 'Applications', icon: 'users', href: null },
  { id: 'blog', label: 'Blog', icon: 'file-text', href: null },
  { id: 'settings', label: 'Settings', icon: 'settings', href: null },
];

const ICONS = {
  home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
  'file-text': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
  plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
  trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
  chevronDown: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />,
  calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
};

function Icon({ name, className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {ICONS[name]}
    </svg>
  );
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border ${colors[color]} backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium opacity-80">{label}</span>
        <div className="p-2 rounded-lg bg-white/5">
          <Icon name={icon} className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}

function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-bold text-white">Pistacchio</h1>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-pistach-600 text-white shadow-lg shadow-pistach-600/25'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon name={item.icon} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-pistach-600 flex items-center justify-center text-white font-bold">
            {user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.email}</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <Icon name="logout" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function InquiriesTab({ inquiries, handleDelete, handleStatusChange }) {
  const [expandedId, setExpandedId] = useState(null);

  const statusColors = {
    new: 'bg-blue-500/20 text-blue-400',
    read: 'bg-yellow-500/20 text-yellow-400',
    responded: 'bg-green-500/20 text-green-400',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Contact Inquiries</h2>
        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-400">
          {inquiries.length} total
        </span>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Icon name="mail" className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No inquiries yet</p>
        </div>
      ) : (
        inquiries.map((inquiry) => (
          <motion.div
            key={inquiry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white">{inquiry.subject}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[inquiry.status] || statusColors.new}`}>
                      {inquiry.status || 'new'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-1">{inquiry.name} • {inquiry.email}</p>
                  <p className="text-slate-500 text-xs">{inquiry.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={inquiry.status || 'new'}
                    onChange={(e) => handleStatusChange('inquiries', inquiry.id, e.target.value)}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pistach-500"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                  </select>
                  <button
                    onClick={() => handleDelete('inquiries', inquiry.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Icon name="trash" className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                className="flex items-center gap-2 text-pistach-400 hover:text-pistach-300 text-sm"
              >
                <Icon name="chevronDown" className={`w-4 h-4 transition-transform ${expandedId === inquiry.id ? 'rotate-180' : ''}`} />
                {expandedId === inquiry.id ? 'Hide' : 'View'} Message
              </button>

              <AnimatePresence>
                {expandedId === inquiry.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/5"
                  >
                    <p className="text-slate-300 leading-relaxed">{inquiry.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

function ApplicationsTab({ applications, handleDelete, handleStatusChange }) {
  const [expandedId, setExpandedId] = useState(null);

  const statusColors = {
    new: 'bg-blue-500/20 text-blue-400',
    reviewing: 'bg-yellow-500/20 text-yellow-400',
    contacted: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Job Applications</h2>
        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-400">
          {applications.length} total
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Icon name="users" className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No applications yet</p>
        </div>
      ) : (
        applications.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white">{app.position}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status] || statusColors.new}`}>
                      {app.status || 'new'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-1">{app.fullName}</p>
                  <p className="text-slate-500 text-sm">{app.email} • {app.phone}</p>
                  <p className="text-slate-600 text-xs mt-1">
                    <Icon name="calendar" className="w-3 h-3 inline mr-1" />
                    {app.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'} • {app.experience} years experience
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={app.status || 'new'}
                    onChange={(e) => handleStatusChange('applications', app.id, e.target.value)}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pistach-500"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="contacted">Contacted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => handleDelete('applications', app.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Icon name="trash" className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                className="flex items-center gap-2 text-pistach-400 hover:text-pistach-300 text-sm"
              >
                <Icon name="chevronDown" className={`w-4 h-4 transition-transform ${expandedId === app.id ? 'rotate-180' : ''}`} />
                {expandedId === app.id ? 'Hide' : 'View'} Cover Letter
              </button>

              <AnimatePresence>
                {expandedId === app.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/5"
                  >
                    <p className="text-slate-300 leading-relaxed">{app.coverLetter}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

function BlogTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Blog Management</h2>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-pistach-600 text-white rounded-lg hover:bg-pistach-500 transition-colors"
        >
          <Icon name="plus" className="w-4 h-4" />
          New Article
        </Link>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-8 text-center">
        <Icon name="file-text" className="w-12 h-12 mx-auto mb-4 text-slate-600" />
        <p className="text-slate-400 mb-4">Manage your blog articles</p>
        <Link
          href="/admin/blog/manage"
          className="inline-flex items-center gap-2 text-pistach-400 hover:text-pistach-300"
        >
          Go to Article Manager
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
      
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Shop Name</label>
          <input
            type="text"
            defaultValue="Pistacchio Utrecht"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pistach-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Contact Email</label>
          <input
            type="email"
            defaultValue="hello@pistacchio-utrecht.nl"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pistach-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
          <input
            type="tel"
            defaultValue="+31 (0)6 1234 5678"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pistach-500"
          />
        </div>

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-pistach-600 text-white rounded-lg font-semibold hover:bg-pistach-500 transition-colors"
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAdmin, logout, loading: authLoading, initializeAuth } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const db = await getDb();
        if (!db) {
          setLoading(false);
          return;
        }

        const { collection, getDocs, query, where } = await import('firebase/firestore');
        
        const inquiriesSnap = await getDocs(
          query(collection(db, 'inquiries'), where('type', '==', 'inquiry'))
        );
        setInquiries(inquiriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const appsSnap = await getDocs(
          query(collection(db, 'applications'), where('type', '==', 'job_application'))
        );
        setApplications(appsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user, isAdmin, authLoading, router]);

  const handleDelete = async (collectionName, docId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const db = await getDb();
        const { doc, deleteDoc } = await import('firebase/firestore');
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
      const db = await getDb();
      const { doc, updateDoc } = await import('firebase/firestore');
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

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pistach-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-8">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Inquiries" value={inquiries.length} icon="mail" color="blue" />
                <StatCard label="Applications" value={applications.length} icon="users" color="purple" />
                <StatCard label="New Inquiries" value={inquiries.filter(i => i.status === 'new').length} icon="check" color="green" />
                <StatCard label="Pending Review" value={applications.filter(a => a.status === 'new' || a.status === 'reviewing').length} icon="calendar" color="orange" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">Recent Inquiries</h3>
                    <button 
                      onClick={() => setActiveTab('inquiries')}
                      className="text-sm text-pistach-400 hover:text-pistach-300"
                    >
                      View All
                    </button>
                  </div>
                  {inquiries.slice(0, 3).map((inquiry) => (
                    <div key={inquiry.id} className="py-3 border-b border-white/5 last:border-0">
                      <p className="text-white text-sm font-medium">{inquiry.subject}</p>
                      <p className="text-slate-400 text-xs">{inquiry.name} • {inquiry.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}</p>
                    </div>
                  ))}
                  {inquiries.length === 0 && <p className="text-slate-500 text-sm">No inquiries yet</p>}
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">Recent Applications</h3>
                    <button 
                      onClick={() => setActiveTab('applications')}
                      className="text-sm text-pistach-400 hover:text-pistach-300"
                    >
                      View All
                    </button>
                  </div>
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="py-3 border-b border-white/5 last:border-0">
                      <p className="text-white text-sm font-medium">{app.fullName}</p>
                      <p className="text-slate-400 text-xs">{app.position} • {app.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}</p>
                    </div>
                  ))}
                  {applications.length === 0 && <p className="text-slate-500 text-sm">No applications yet</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <InquiriesTab 
              inquiries={inquiries} 
              handleDelete={handleDelete} 
              handleStatusChange={handleStatusChange} 
            />
          )}

          {activeTab === 'applications' && (
            <ApplicationsTab 
              applications={applications} 
              handleDelete={handleDelete} 
              handleStatusChange={handleStatusChange} 
            />
          )}

          {activeTab === 'blog' && <BlogTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}
