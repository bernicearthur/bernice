import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import MasonryGrid from '../components/MasonryGrid';
import { FiSearch, FiCalendar, FiClock, FiTag, FiFeather, FiStar, FiBookOpen, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

// Enhanced mock data with more creative fields
const stories = [
  {
    id: 1,
    title: 'The Enchanted Forest',
    description: 'A journey through a magical forest filled with wonders and mysteries that will captivate your imagination.',
    genre: 'Fantasy',
    image: '/images/story.jpg',
    publishDate: '2024-01-15',
    readTime: '10 min',
    likes: 245,
    comments: 18,
    views: 567,
    featured: true,
    mood: 'Mystical',
    theme: 'Nature',
    colorScheme: 'emerald'
  },
  {
    id: 2,
    title: 'Urban Chronicles',
    description: 'Tales from the city streets, where every corner holds a story waiting to be told.',
    genre: 'Personal',
    image: '/images/bg1.jpg',
    publishDate: '2024-01-10',
    readTime: '8 min',
    likes: 189,
    comments: 12,
    views: 432,
    featured: false,
    mood: 'Reflective',
    theme: 'City Life',
    colorScheme: 'slate'
  },
  {
    id: 3,
    title: 'The Last Adventure',
    description: 'An epic journey to the ends of the earth in search of the unknown.',
    genre: 'Adventure',
    image: '/images/bg2.jpg',
    publishDate: '2024-01-05',
    readTime: '15 min',
    likes: 312,
    comments: 24,
    views: 789,
    featured: true,
    mood: 'Exciting',
    theme: 'Exploration',
    colorScheme: 'amber'
  },
  {
    id: 4,
    title: 'Whispers in the Dark',
    description: 'A mysterious tale that unfolds in the shadows of an ancient mansion.',
    genre: 'Mystery',
    image: '/images/bg3.jpg',
    publishDate: '2024-01-01',
    readTime: '12 min',
    likes: 278,
    comments: 16,
    views: 654,
    featured: false,
    mood: 'Suspenseful',
    theme: 'Gothic',
    colorScheme: 'purple'
  }
];

const genres = ['All', 'Fantasy', 'Personal', 'Adventure', 'Mystery'];

const StoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { scrollY } = useScroll();

  // Parallax effect for hero section
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const titleY = useTransform(scrollY, [0, 300], [0, 100]);

  // Dynamic background gradient based on time of day
  const [timeBasedGradient, setTimeBasedGradient] = useState('');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeBasedGradient('from-orange-400/20 via-yellow-300/10 to-transparent'); // Morning
    } else if (hour >= 12 && hour < 17) {
      setTimeBasedGradient('from-blue-400/20 via-cyan-300/10 to-transparent'); // Afternoon
    } else if (hour >= 17 && hour < 20) {
      setTimeBasedGradient('from-purple-400/20 via-pink-300/10 to-transparent'); // Evening
    } else {
      setTimeBasedGradient('from-indigo-400/20 via-purple-300/10 to-transparent'); // Night
    }
  }, []);

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || story.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Transform stories data for MasonryGrid with enhanced metadata
  const gridItems = filteredStories.map(story => ({
    id: story.id,
    title: story.title,
    description: story.description,
    image: story.image,
    category: story.genre,
    featured: story.featured,
    likes: story.likes,
    comments: story.comments,
    views: story.views,
    colorScheme: story.colorScheme,
    readTime: story.readTime,
    mood: story.mood,
    theme: story.theme,
    metadata: [
      { icon: FiClock, text: `${story.readTime}` },
      { icon: FiStar, text: `${story.likes}` }
    ]
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-main"
    >
      <Navbar />

      {/* Interactive Hero Section */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className={`relative bg-gradient-to-b ${timeBasedGradient} py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden`}
      >
        <motion.div
          style={{ y: titleY }}
          className="relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-6"
          >
            <FiBookOpen className="mx-auto text-6xl text-accent" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Stories
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Explore a collection of tales that inspire, entertain, and spark imagination.
          </motion.p>
        </motion.div>

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 100 - 50 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1
              }}
              animate={{
                y: [null, '-100%'],
                opacity: [null, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {i % 3 === 0 ? '✨' : i % 3 === 1 ? '📖' : '🪶'}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex gap-2 flex-wrap w-full justify-center md:justify-start">
            {genres.map(genre => (
              <motion.button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
                  selectedGenre === genre 
                    ? 'bg-accent text-white' 
                    : 'bg-border text-primary hover:bg-accent hover:text-white'
                } transition-all`}
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
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-full bg-border text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />
        </motion.div>

        {/* Stories Grid */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence>
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl aspect-[4/5] group"
              >
                <Link href={`/stories/${story.id}`}>
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                      priority={index < 6}
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
                  </div>

                  {/* Bookmark Icon */}
                  <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>

                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6">
                    {/* Tags */}
                    <div className="flex gap-2 mb-auto">
                      {[story.genre, story.mood, story.theme].slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">{story.title}</h3>
                      <p className="text-white/90 line-clamp-2">{story.description}</p>
                      
                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-white/80">
                        <span className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          {story.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiHeart className="w-4 h-4" />
                          {story.likes}
                        </span>
                      </div>

                      {/* Read Story Button */}
                      <button className="w-full py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                        Read Story
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default StoriesPage;
