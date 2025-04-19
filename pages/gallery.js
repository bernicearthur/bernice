import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import MasonryGrid from '../components/MasonryGrid';
import { FiSearch } from 'react-icons/fi';
import Layout from '../components/layout';

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

function GalleryPage() {
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
        <title>Gallery | Bernice Arthur</title>
        <meta name="description" content="A creative showcase of work and achievements" />
      </Head>

      <div className="min-h-screen pt-8">
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

export default GalleryPage; 