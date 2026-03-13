// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  return phone.replace(/\D/g, '').length >= 10;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

// Format utilities
export const formatDate = (date) => {
  if (!date) return 'Recent';
  const d = new Date(date.seconds ? date.seconds * 1000 : date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const truncateText = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Local storage (if needed in future)
export const getLocalStorage = (key, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setLocalStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

// Animation variants (reusable Framer Motion configs)
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

// Stagger container
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Status colors
export const getStatusColor = (status) => {
  const colors = {
    'new': 'bg-blue-500/20 text-blue-300',
    'read': 'bg-purple-500/20 text-purple-300',
    'responded': 'bg-green-500/20 text-green-300',
    'reviewing': 'bg-yellow-500/20 text-yellow-300',
    'contacted': 'bg-green-500/20 text-green-300',
    'rejected': 'bg-red-500/20 text-red-300',
    'draft': 'bg-gray-500/20 text-gray-300',
    'published': 'bg-green-500/20 text-green-300',
  };
  return colors[status] || 'bg-gray-500/20 text-gray-300';
};

// Position options
export const JOB_POSITIONS = [
  'Ice Cream Maker',
  'Store Manager',
  'Customer Service',
  'Marketing Specialist',
  'Events Coordinator',
];

// Flavor categories
export const FLAVOR_CATEGORIES = [
  'All',
  'Fruity',
  'Chocolate',
  'Premium',
];
