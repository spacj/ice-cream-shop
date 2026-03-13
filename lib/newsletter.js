'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Reusable Newsletter Subscription Component
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      // Check if already subscribed
      const q = query(
        collection(db, 'newsletter_subscribers'),
        where('email', '==', email)
      );
      const existing = await getDocs(q);

      if (!existing.empty) {
        setMessage('This email is already subscribed');
        setStatus('error');
        return;
      }

      // Add subscriber
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email,
        subscribedAt: serverTimestamp(),
        active: true,
      });

      setMessage('✓ Successfully subscribed!');
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setMessage('Error subscribing. Please try again.');
      setStatus('error');
      console.error('Error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === 'loading'}
          className="flex-1 px-4 py-3 bg-dark/50 border border-ice-pink/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-ice-pink disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 gradient-primary rounded-lg text-white font-semibold disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </motion.button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 text-sm ${
            status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}

/**
 * Newsletter admin section component
 */
export function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const q = query(
          collection(db, 'newsletter_subscribers'),
          where('active', '==', true)
        );
        const snapshot = await getDocs(q);
        setSubscribers(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
      setLoading(false);
    };

    fetchSubscribers();
  }, []);

  const handleUnsubscribe = async (id) => {
    try {
      await updateDoc(doc(db, 'newsletter_subscribers', id), {
        active: false,
      });
      setSubscribers(subscribers.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl text-ice-pink">
          Newsletter Subscribers
        </h3>
        <span className="px-3 py-1 bg-ice-blue/20 text-ice-blue rounded-full text-sm">
          {subscribers.length} subscribers
        </span>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-gray-400">No active subscribers yet</p>
      ) : (
        <div className="space-y-2">
          {subscribers.map(subscriber => (
            <motion.div
              key={subscriber.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 glass rounded-lg"
            >
              <div>
                <p className="text-white">{subscriber.email}</p>
                <p className="text-gray-500 text-sm">
                  Subscribed: {subscriber.subscribedAt?.toDate?.()?.toLocaleDateString?.() || 'Recent'}
                </p>
              </div>
              <button
                onClick={() => handleUnsubscribe(subscriber.id)}
                className="px-3 py-1 text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Export subscribers button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="mt-6 px-4 py-2 gradient-primary rounded-lg text-white font-semibold"
      >
        Export Subscriber List
      </motion.button>
    </div>
  );
}
