'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDb } from '@/lib/firebase';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'inquiries', label: 'Inquiries', icon: 'mail' },
  { id: 'applications', label: 'Applications', icon: 'users' },
  { id: 'articles', label: 'Articles', icon: 'file-text' },
  { id: 'content', label: 'Site Content', icon: 'edit' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

const ICONS = {
  home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
  'file-text': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
  plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
  trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
  chevronDown: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />,
  chevronRight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
  eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />,
  save: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />,
  pluscircle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
  x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
  external: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />,
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
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    purple: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    orange: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-xl border ${colors[color]} bg-slate-800/80`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        <div className="p-2 rounded-lg bg-white/5">
          <Icon name={icon} className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
}

function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-700/50 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <p className="text-xs font-bold text-white">PISTACCHIO</p>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-pistach-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon name={item.icon} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-pistach-600 flex items-center justify-center text-white font-bold">
            {user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.email}</p>
            <p className="text-xs text-slate-500">Administrator</p>
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
    responded: 'bg-emerald-500/20 text-emerald-400',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Contact Inquiries</h2>
        <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-400">{inquiries.length} total</span>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <Icon name="mail" className="w-12 h-12 mx-auto mb-4 text-slate-600" />
          <p className="text-slate-500">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <motion.div 
              key={inquiry.id} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{inquiry.subject}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[inquiry.status] || statusColors.new}`}>
                        {inquiry.status || 'new'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">{inquiry.name} · {inquiry.email}</p>
                    <p className="text-slate-500 text-xs">{inquiry.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={inquiry.status || 'new'} 
                      onChange={(e) => handleStatusChange('inquiries', inquiry.id, e.target.value)} 
                      className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-pistach-500"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                    </select>
                    <button 
                      onClick={() => handleDelete('inquiries', inquiry.id)} 
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Icon name="trash" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)} 
                  className="flex items-center gap-2 text-pistach-400 hover:text-pistach-300 text-sm mt-3"
                >
                  <Icon name={expandedId === inquiry.id ? 'chevronDown' : 'chevronDown'} className={`w-4 h-4 transition-transform ${expandedId === inquiry.id ? 'rotate-180' : ''}`} />
                  {expandedId === inquiry.id ? 'Hide' : 'View'} Message
                </button>
                <AnimatePresence>
                  {expandedId === inquiry.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }} 
                      className="mt-4 pt-4 border-t border-slate-700/50"
                    >
                      <p className="text-slate-300 leading-relaxed">{inquiry.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ApplicationsTab({ applications, handleDelete, handleStatusChange }) {
  const [expandedId, setExpandedId] = useState(null);
  const statusColors = {
    new: 'bg-blue-500/20 text-blue-400',
    reviewing: 'bg-yellow-500/20 text-yellow-400',
    contacted: 'bg-emerald-500/20 text-emerald-400',
    rejected: 'bg-red-500/20 text-red-400',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Job Applications</h2>
        <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-400">{applications.length} total</span>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <Icon name="users" className="w-12 h-12 mx-auto mb-4 text-slate-600" />
          <p className="text-slate-500">No applications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <motion.div 
              key={app.id} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{app.position}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status] || statusColors.new}`}>
                        {app.status || 'new'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">{app.fullName}</p>
                    <p className="text-slate-500 text-sm">{app.email} · {app.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={app.status || 'new'} 
                      onChange={(e) => handleStatusChange('applications', app.id, e.target.value)} 
                      className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-pistach-500"
                    >
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="contacted">Contacted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button 
                      onClick={() => handleDelete('applications', app.id)} 
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Icon name="trash" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setExpandedId(expandedId === app.id ? null : app.id)} 
                  className="flex items-center gap-2 text-pistach-400 hover:text-pistach-300 text-sm mt-3"
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
                      className="mt-4 pt-4 border-t border-slate-700/50"
                    >
                      <p className="text-slate-300 leading-relaxed">{app.coverLetter}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ArticlesTab({ articles, handleDelete, handleTogglePublish }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Blog Articles</h2>
        <a href="/admin/blog/new" className="flex items-center gap-2 px-4 py-2 bg-pistach-600 text-white rounded-lg hover:bg-pistach-500 transition-colors">
          <Icon name="plus" className="w-4 h-4" />
          New Article
        </a>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <Icon name="file-text" className="w-12 h-12 mx-auto mb-4 text-slate-600" />
          <p className="text-slate-500 mb-4">No articles yet</p>
          <a href="/admin/blog/new" className="text-pistach-400 hover:text-pistach-300">Create your first article →</a>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{article.title}</p>
                    <p className="text-sm text-slate-500 truncate max-w-md">{article.excerpt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleTogglePublish(article.id, article.published)} 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${article.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600/50 text-slate-400'}`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{article.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/blog/${article.id}`} target="_blank" className="p-2 text-slate-400 hover:text-pistach-400 hover:bg-slate-700/50 rounded-lg transition-colors">
                        <Icon name="external" className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => handleDelete('articles', article.id)} 
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ContentTab({ content, onSave }) {
  const [formData, setFormData] = useState(content);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(formData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Editable Site Content</h2>
          <p className="text-sm text-slate-500">These sections appear on your homepage and affect SEO</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-emerald-400 text-sm flex items-center gap-1"><Icon name="check" className="w-4 h-4" /> Saved!</span>}
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="flex items-center gap-2 px-4 py-2 bg-pistach-600 text-white rounded-lg hover:bg-pistach-500 transition-colors disabled:opacity-50"
          >
            <Icon name="save" className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Icon name="mail" className="w-5 h-5 text-pistach-400" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={formData.contact?.email || ''} 
                    onChange={(e) => handleChange('contact', 'email', e.target.value)} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-pistach-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={formData.contact?.phone || ''} 
                    onChange={(e) => handleChange('contact', 'phone', e.target.value)} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-sale-200 focus:outline-none focus:border-pistach-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Address</label>
                  <textarea 
                    value={formData.contact?.address || ''} 
                    onChange={(e) => handleChange('contact', 'address', e.target.value)} 
                    rows={2} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500 resize-none" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Icon name="edit" className="w-5 h-5 text-pistach-400" />
                Flavors Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Section Title</label>
                  <input 
                    type="text" 
                    value={formData.flavors?.title || ''} 
                    onChange={(e) => handleChange('flavors', 'title', e.target.value)} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-pistach-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Section Subtitle</label>
                  <input 
                    type="text" 
                    value={formData.flavors?.subtitle || ''} 
                    onChange={(e) => handleChange('flavors', 'subtitle', e.target.value)} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-pistach-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                  <textarea 
                    value={formData.flavors?.description || ''} 
                    onChange={(e) => handleChange('flavors', 'description', e.target.value)} 
                    rows={3} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-pistach-500 resize-none" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Icon name="alert-triangle" className="w-5 h-5 text-pistach-400" />
              Allergens Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Allergens Description</label>
                <textarea 
                  value={formData.allergens || ''} 
                  onChange={(e) => handleChange('allergens', '', e.target.value)} 
                  rows={4} 
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500 resize-none"
                  placeholder="List any allergens present (e.g., contains milk, nuts, gluten)..."
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Icon name="pluscircle" className="w-5 h-5 text-pistach-400" />
          Featured Flavors
        </h3>
        <p className="text-sm text-slate-500 mb-6">Edit your featured flavors displayed on the homepage</p>
        
        <div className="space-y-4">
          {(formData.flavors?.items || []).map((flavor, idx) => (
            <div key={idx} className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Flavor {idx + 1}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={flavor.name || ''} 
                    onChange={(e) => {
                      const newItems = [...(formData.flavors?.items || [])];
                      newItems[idx] = { ...newItems[idx], name: e.target.value };
                      setFormData(prev => ({ ...prev, flavors: { ...prev.flavors, items: newItems } }));
                      setSaved(false);
                    }} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-pistach-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Description</label>
                  <input 
                    type="text" 
                    value={flavor.description || ''} 
                    onChange={(e) => {
                      const newItems = [...(formData.flavors?.items || [])];
                      newItems[idx] = { ...newItems[idx], description: e.target.value };
                      setFormData(prev => ({ ...prev, flavors: { ...prev.flavors, items: newItems } }));
                      setSaved(false);
                    }} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-pistach-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Image URL</label>
                  <input 
                    type="url" 
                    value={flavor.image || ''} 
                    onChange={(e) => {
                      const newItems = [...(formData.flavors?.items || [])];
                      newItems[idx] = { ...newItems[idx], image: e.target.value };
                      setFormData(prev => ({ ...prev, flavors: { ...prev.flavors, items: newItems } }));
                      setSaved(false);
                    }} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-pistach-500" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ settings, onSave }) {
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(formData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <p className="text-sm text-slate-500">General website configuration</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-emerald-400 text-sm flex items-center gap-1"><Icon name="check" className="w-4 h-4" /> Saved!</span>}
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="flex items-center gap-2 px-4 py-2 bg-pistach-600 text-white rounded-lg hover:bg-pistach-500 transition-colors disabled:opacity-50"
          >
            <Icon name="save" className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
      
      <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Shop Name</label>
          <input 
            type="text" 
            value={formData.shopName || ''} 
            onChange={(e) => handleChange('shopName', e.target.value)} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Contact Email</label>
          <input 
            type="email" 
            value={formData.email || ''} 
            onChange={(e) => handleChange('email', e.target.value)} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
          <input 
            type="tel" 
            value={formData.phone || ''} 
            onChange={(e) => handleChange('phone', e.target.value)} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Address</label>
          <textarea 
            value={formData.address || ''} 
            onChange={(e) => handleChange('address', e.target.value)} 
            rows={2} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-pistach-500 resize-none" 
          />
        </div>
      </div>
    </div>
  );
}

function DashboardTab({ inquiries, applications, articles, setActiveTab }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Inquiries" value={inquiries.length} icon="mail" color="blue" />
        <StatCard label="Applications" value={applications.length} icon="users" color="purple" />
        <StatCard label="New Inquiries" value={inquiries.filter(i => i.status === 'new').length} icon="check" color="green" />
        <StatCard label="Articles" value={articles.length} icon="file-text" color="orange" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Inquiries</h3>
            <button onClick={() => setActiveTab('inquiries')} className="text-sm text-pistach-400 hover:text-pistach-300 flex items-center gap-1">
              View All <Icon name="chevronRight" className="w-4 h-4" />
            </button>
          </div>
          {inquiries.slice(0, 3).map((inquiry) => (
            <div key={inquiry.id} className="py-3 border-b border-slate-700/50 last:border-0">
              <p className="text-slate-200 text-sm font-medium">{inquiry.subject}</p>
              <p className="text-slate-500 text-xs">{inquiry.name} · {inquiry.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}</p>
            </div>
          ))}
          {inquiries.length === 0 && <p className="text-slate-600 text-sm">No inquiries yet</p>}
        </div>
        
        <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Applications</h3>
            <button onClick={() => setActiveTab('applications')} className="text-sm text-pistach-400 hover:text-pistach-300 flex items-center gap-1">
              View All <Icon name="chevronRight" className="w-4 h-4" />
            </button>
          </div>
          {applications.slice(0, 3).map((app) => (
            <div key={app.id} className="py-3 border-b border-slate-700/50 last:border-0">
              <p className="text-slate-200 text-sm font-medium">{app.fullName}</p>
              <p className="text-slate-500 text-xs">{app.position} · {app.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}</p>
            </div>
          ))}
          {applications.length === 0 && <p className="text-slate-600 text-sm">No applications yet</p>}
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
  const [articles, setArticles] = useState([]);
  const [content, setContent] = useState({
    contact: { email: '', phone: '', address: '' },
    flavors: { title: 'Our Signature Collection', subtitle: 'Handcrafted Flavors', description: 'Explore our premium gelato flavors', items: [] },
    allergens: '',
  });
  const [settings, setSettings] = useState({
    shopName: 'Pistacchio Utrecht',
    email: 'hello@pistacchio-utrecht.nl',
    phone: '+31 (0)6 1234 5678',
    address: 'Korte Jansstraat 23, 3512 GN Utrecht',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { initializeAuth(); }, [initializeAuth]);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin) { router.push('/admin/login'); return; }

    const fetchData = async () => {
      try {
        const db = await getDb();
        if (!db) { setLoading(false); return; }

        const { collection, getDocs, query, where, doc, getDoc } = await import('firebase/firestore');
        
        const inquiriesSnap = await getDocs(query(collection(db, 'inquiries'), where('type', '==', 'inquiry')));
        setInquiries(inquiriesSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const appsSnap = await getDocs(query(collection(db, 'applications'), where('type', '==', 'job_application')));
        setApplications(appsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const articlesSnap = await getDocs(collection(db, 'articles'));
        setArticles(articlesSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const contentDoc = await getDoc(doc(db, 'website', 'content'));
        if (contentDoc.exists()) { setContent(contentDoc.data()); }

        const settingsDoc = await getDoc(doc(db, 'website', 'settings'));
        if (settingsDoc.exists()) { setSettings(settingsDoc.data()); }
      } catch (error) { console.error('Error fetching data:', error); }
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
        if (collectionName === 'inquiries') setInquiries(inquiries.filter(i => i.id !== docId));
        else if (collectionName === 'applications') setApplications(applications.filter(i => i.id !== docId));
        else if (collectionName === 'articles') setArticles(articles.filter(i => i.id !== docId));
      } catch (error) { console.error('Error deleting:', error); }
    }
  };

  const handleStatusChange = async (collectionName, docId, newStatus) => {
    try {
      const db = await getDb();
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, collectionName, docId), { status: newStatus });
      if (collectionName === 'inquiries') setInquiries(inquiries.map(i => i.id === docId ? { ...i, status: newStatus } : i));
      else setApplications(applications.map(i => i.id === docId ? { ...i, status: newStatus } : i));
    } catch (error) { console.error('Error updating status:', error); }
  };

  const handleTogglePublish = async (docId, currentStatus) => {
    try {
      const db = await getDb();
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'articles', docId), { published: !currentStatus });
      setArticles(articles.map(a => a.id === docId ? { ...a, published: !currentStatus } : a));
    } catch (error) { console.error('Error updating article:', error); }
  };

  const handleSaveContent = async (newContent) => {
    try {
      const db = await getDb();
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'website', 'content'), newContent, { merge: true });
      setContent(newContent);
      
      if (typeof window !== 'undefined') {
        try {
          await fetch('/api/revalidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secret: 'revalidate-content-change', paths: ['/'] }),
          });
        } catch (e) { console.log('Revalidation skipped'); }
      }
    } catch (error) { console.error('Error saving content:', error); }
  };

  const handleSaveSettings = async (newSettings) => {
    try {
      const db = await getDb();
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'website', 'settings'), newSettings, { merge: true });
      setSettings(newSettings);
    } catch (error) { console.error('Error saving settings:', error); }
  };

  const handleLogout = async () => { await logout(); router.push('/admin/login'); };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pistach-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />
      
      <main className="ml-64 pt-32 px-8 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <DashboardTab inquiries={inquiries} applications={applications} articles={articles} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'inquiries' && <InquiriesTab inquiries={inquiries} handleDelete={handleDelete} handleStatusChange={handleStatusChange} />}
            {activeTab === 'applications' && <ApplicationsTab applications={applications} handleDelete={handleDelete} handleStatusChange={handleStatusChange} />}
            {activeTab === 'articles' && <ArticlesTab articles={articles} handleDelete={handleDelete} handleTogglePublish={handleTogglePublish} />}
            {activeTab === 'content' && <ContentTab content={content} onSave={handleSaveContent} />}
            {activeTab === 'settings' && <SettingsTab settings={settings} onSave={handleSaveSettings} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}