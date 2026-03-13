'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Advanced search and filter functionality
 * Can be used for products, articles, applications, etc.
 */
export const useSearch = (items, searchFields) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(query);
      });
    });
  }, [items, searchQuery, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
};

/**
 * Advanced filter by category/status
 */
export const useFilter = (items, filterField) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredItems = useMemo(() => {
    if (!activeFilter) return items;
    return items.filter(item => item[filterField] === activeFilter);
  }, [items, activeFilter, filterField]);

  return {
    activeFilter,
    setActiveFilter,
    filteredItems,
  };
};

/**
 * Combined search and filter hook
 */
export const useSearchAndFilter = (items, searchFields, filterField) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredItems = useMemo(() => {
    let results = items;

    // Apply filter
    if (activeFilter) {
      results = results.filter(item => item[filterField] === activeFilter);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => {
        return searchFields.some(field => {
          const value = item[field];
          return value && value.toString().toLowerCase().includes(query);
        });
      });
    }

    return results;
  }, [items, searchQuery, activeFilter, searchFields, filterField]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredItems,
  };
};

/**
 * Search bar component
 */
export function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-3 bg-dark/50 border border-ice-pink/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-ice-pink transition-colors"
      />
    </motion.div>
  );
}

/**
 * Filter buttons component
 */
export function FilterButtons({ options, active, onChange }) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {options.map((option) => (
        <motion.button
          key={option}
          onClick={() => onChange(active === option ? null : option)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            active === option
              ? 'gradient-primary text-white'
              : 'glass text-gray-400 hover:text-white'
          }`}
        >
          {option}
        </motion.button>
      ))}
    </motion.div>
  );
}

/**
 * Sort functionality
 */
export const useSortBy = (items, sortField, direction = 'asc') => {
  const [sortConfig, setSortConfig] = useState({
    field: sortField,
    direction: direction,
  });

  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [items, sortConfig]);

  const toggleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return {
    sortedItems,
    sortConfig,
    toggleSort,
  };
};

/**
 * Pagination hook
 */
export const usePagination = (items, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
  };
};

/**
 * Pagination controls component
 */
export function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <motion.div
      className="flex justify-center items-center gap-4 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 glass rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-ice-pink transition-colors"
      >
        ← Previous
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <motion.button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            whileHover={{ scale: 1.1 }}
            className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
              currentPage === i + 1
                ? 'gradient-primary text-white'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 glass rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-ice-pink transition-colors"
      >
        Next →
      </button>
    </motion.div>
  );
}
