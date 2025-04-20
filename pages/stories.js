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

const genreColors = {
  'All': {
    bg: 'bg-primary dark:bg-white',
    border: 'border-primary dark:border-white',
    hover: 'hover:bg-primary/10 dark:hover:bg-white/10',
    activeText: 'text-white dark:text-black'
  },
  'Fantasy': {
    bg: 'bg-purple-600',
    border: 'border-purple-600',
    hover: 'hover:bg-purple-600/10',
    activeText: 'text-white'
  },
  'Personal': {
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    hover: 'hover:bg-blue-600/10',
    activeText: 'text-white'
  },
  'Adventure': {
    bg: 'bg-green-600',
    border: 'border-green-600',
    hover: 'hover:bg-green-600/10',
    activeText: 'text-white'
  },
  'Mystery': {
    bg: 'bg-red-600',
    border: 'border-red-600',
    hover: 'hover:bg-red-600/10',
    activeText: 'text-white'
  }
};

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
      className="min-h-screen bg-main flex flex-col"
    >
      <Navbar />

      {/* Interactive Hero Section */}
      <motion.div 
        className="relative bg-main py-12 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Stories
          </h1>
          <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto">
            Explore a collection of tales that inspire, entertain, and spark imagination.
          </p>
        </div>
      </motion.div>

      {/* Enhanced Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex gap-2 flex-wrap justify-center">
            {genres.map(genre => (
              <motion.button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-colors border-2 ${
                  selectedGenre === genre
                    ? `${genreColors[genre].bg} ${genreColors[genre].activeText} border-transparent`
                    : `bg-transparent ${genreColors[genre].border} text-primary dark:text-white ${genreColors[genre].hover}`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {genre}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stories Grid */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout
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

                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6">
                    {/* Tags */}
                    <div className="flex gap-2 mb-auto">
                      <span className={`inline-block px-4 py-1.5 text-xs font-medium text-white rounded-full ${genreColors[story.genre]?.bg || 'bg-accent'}`}>
                        {story.genre.toUpperCase()}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">{story.title}</h3>
                      <p className="text-white/90 line-clamp-2">{story.description}</p>
                      
                      {/* Read Story Button */}
                      <a 
                        href={story.externalLink || 'https://amazon.com'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors text-center"
                      >
                        Read Story
                      </a>
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
