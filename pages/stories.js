import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const stories = [
  {
    id: 1,
    title: 'The Enchanted Forest',
    description: 'A journey through a magical forest filled with wonders.',
    genre: 'Fantasy',
    image: '/images/story.jpg',
  },
  // Add more stories as needed
];

const genres = ['All', 'Fantasy', 'Personal', 'Adventure', 'Mystery'];

const StoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || story.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-main"
    >
      <Navbar />

      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-primary mb-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Stories
        </motion.h1>
        <div className="w-24 border-b border-gray-300 dark:border-gray-600 my-4 mx-auto" />
        <motion.p 
          className="text-m text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          My Take on Life, Creativity, and Beyond.
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="flex gap-2 flex-wrap">
            {genres.map(genre => (
              <motion.button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm ${selectedGenre === genre ? 'bg-accent text-white' : 'bg-border text-primary hover:bg-accent hover:text-white'} transition-all`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {genre}
              </motion.button>
            ))}
          </div>
          <motion.input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-full border border-border bg-main text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-16"
        >
          <AnimatePresence>
            {filteredStories.length > 0 ? (
              filteredStories.map(story => (
                <motion.div
                  key={story.id}
                  variants={item}
                  layout
                  className="relative bg-card-bg rounded-lg shadow-lg overflow-hidden aspect-[3/4]"
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="absolute inset-0">
                    <motion.img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="p-6 text-center w-full h-full flex flex-col items-center justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-white text-xl sm:text-2xl font-semibold mb-3">
                        {story.title}
                      </h2>
                      <p className="text-white text-sm sm:text-base mb-4 line-clamp-3 mx-auto max-w-sm">
                        {story.description}
                      </p>
                      <motion.a 
                        href={`/stories/${story.id}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base rounded-full transition-colors duration-200"
                      >
                        Read Now
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-xl text-secondary">No stories found matching your criteria.</p>
                <p className="text-sm text-secondary mt-2">Try adjusting your search or filter settings.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default StoriesPage;
