import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';

const SpotlightSearch = ({ onSearch, onFilter, activeFilters, categories }) => {
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, articles, and more..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter />
              <span>Filters</span>
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={activeFilters.includes(category)
                  ? "px-4 py-3 rounded-xl bg-blue-500 text-white transition-colors"
                  : "px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"}
                onClick={() => onFilter(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightSearch; 