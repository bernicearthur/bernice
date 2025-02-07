import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Layout from '../components/layout';
import MasonryGrid from '../components/MasonryGrid';
import { FiSearch } from 'react-icons/fi';

// Create an array of available images with more specific categorization
const LOCAL_IMAGES = [
  { path: '/images/IMG_4126.JPG', type: 'Project', featured: true },
  { path: '/images/IMG_4127.JPG', type: 'Project', featured: true },
  { path: '/images/IMG_4128.JPG', type: 'Project', featured: true },
  { path: '/images/IMG_4129.JPG', type: 'Design' },
  { path: '/images/IMG_4130.JPG', type: 'Design' },
  { path: '/images/IMG_41312.JPG', type: 'Art' },
  { path: '/images/IMG_4133.JPG', type: 'Creative' },
  { path: '/images/IMG_4134.JPG', type: 'Creative' },
  { path: '/images/IMG_4125.JPG', type: 'Art' },
  { path: '/images/vintage.jpg', type: 'Design' },
  { path: '/images/neosiam.jpg', type: 'Art' },
  { path: '/images/minan.jpg', type: 'Creative' },
  { path: '/images/story.jpg', type: 'Story' },
  { path: '/images/blog.jpg', type: 'Blog' },
  { path: '/images/project.jpg', type: 'Project' }
];

const DESCRIPTIONS = [
  'A journey through creative expression',
  'Where innovation meets aesthetics',
  'Exploring new design frontiers',
  'Capturing moments in time',
  'The art of visual storytelling',
  'Breaking design boundaries',
  'A fusion of style and purpose',
];

// Create mock items using local images
const MOCK_ITEMS = LOCAL_IMAGES.map((img, i) => ({
  id: i,
  title: `${img.type} ${i + 1}`,
  description: DESCRIPTIONS[i % DESCRIPTIONS.length],
  image: img.path,
  category: img.type,
  featured: img.featured || false,
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100),
}));

function SpotlightPage() {
  const [items, setItems] = useState(MOCK_ITEMS);
  const [filteredItems, setFilteredItems] = useState(MOCK_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, items]);

  // Load more items (infinite scroll)
  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    
    setTimeout(() => {
      const newItems = [...items, ...MOCK_ITEMS.map(item => ({
        ...item,
        id: item.id + items.length
      }))];
      setItems(newItems);
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <Head>
        <title>Spotlight | Bernice Arthur</title>
        <meta name="description" content="A creative showcase of work and achievements" />
      </Head>

      <div className="min-h-screen pt-8">
        {/* Minimal Search */}
        <div className="max-w-xl mx-auto px-4 mb-12 mt-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search creations..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 
                       dark:focus:ring-purple-400 outline-none transition-all text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <MasonryGrid
            items={filteredItems}
            onLoadMore={loadMore}
          />
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Empty state */}
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-gray-500 dark:text-gray-400">No creations found matching your search</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default SpotlightPage; 