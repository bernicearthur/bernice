import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart, FaHeart, FaRegComment, FaRegEye, FaSearch, FaCalendarAlt, FaClock, FaChevronRight, FaChevronLeft, FaAward } from 'react-icons/fa';
import Pagination from '../components/pagination';

const categories = ['All', 'Tutorials', 'Personal', 'Writing Tips', 'Reviews'];

const categoryColors = {
  'Tutorials': 'bg-blue-500/80',
  'Personal': 'bg-purple-500/80',
  'Writing Tips': 'bg-green-500/80',
  'Reviews': 'bg-orange-500/80'
};

const blogs = [
  {
    id: 1,
    title: 'How to Write Engaging Stories',
    author: 'Bernice Arthur',
    publishDate: '2023-10-01',
    category: 'Tutorials',
    readTime: '5 min',
    image: '/images/blog.jpg',
    likes: 120,
    comments: 15,
    views: 300,
    excerpt: 'Discover the secrets to crafting compelling narratives that captivate your readers from start to finish.',
    featured: true,
  },
  {
    id: 2,
    title: 'The Art of Character Development',
    author: 'Bernice Arthur',
    publishDate: '2023-09-28',
    category: 'Writing Tips',
    readTime: '7 min',
    image: '/images/bg1.jpg',
    likes: 95,
    comments: 23,
    views: 250,
    excerpt: 'Learn how to create memorable characters that resonate with your readers and bring your stories to life.',
    featured: true,
  },
  {
    id: 3,
    title: 'My Journey as a Writer',
    author: 'Bernice Arthur',
    publishDate: '2023-09-25',
    category: 'Personal',
    readTime: '4 min',
    image: '/images/bg2.jpg',
    likes: 150,
    comments: 30,
    views: 420,
    excerpt: 'A personal reflection on my writing journey, challenges faced, and lessons learned along the way.',
    featured: true,
  },
  {
    id: 4,
    title: 'Book Review: Modern Storytelling',
    author: 'Bernice Arthur',
    publishDate: '2023-09-22',
    category: 'Reviews',
    readTime: '6 min',
    image: '/images/bg3.jpg',
    likes: 88,
    comments: 12,
    views: 280,
    excerpt: 'An in-depth review of the latest techniques and approaches in modern storytelling.',
    featured: true,
  },
  {
    id: 5,
    title: 'Writing Workshop Experience',
    author: 'Bernice Arthur',
    publishDate: '2023-09-20',
    category: 'Personal',
    readTime: '5 min',
    image: '/images/bg4.jpg',
    likes: 110,
    comments: 18,
    views: 340,
    excerpt: 'Sharing insights and experiences from my recent writing workshop attendance.',
  },
  {
    id: 6,
    title: 'Mastering Dialogue Writing',
    author: 'Bernice Arthur',
    publishDate: '2023-09-18',
    category: 'Tutorials',
    readTime: '8 min',
    image: '/images/bg5.jpg',
    likes: 135,
    comments: 25,
    views: 380,
    excerpt: 'Tips and techniques for writing natural, engaging dialogue that moves your story forward.',
  },
  {
    id: 7,
    title: 'Finding Your Writing Voice',
    author: 'Bernice Arthur',
    publishDate: '2023-09-15',
    category: 'Writing Tips',
    readTime: '6 min',
    image: '/images/bg6.jpg',
    likes: 142,
    comments: 28,
    views: 410,
    excerpt: 'Explore ways to develop and refine your unique writing voice and style.',
  },
  {
    id: 8,
    title: 'Creative Writing Software Review',
    author: 'Bernice Arthur',
    publishDate: '2023-09-12',
    category: 'Reviews',
    readTime: '7 min',
    image: '/images/bg7.jpg',
    likes: 98,
    comments: 20,
    views: 290,
    excerpt: 'A comprehensive review of popular writing software tools and their features.',
  },
  {
    id: 9,
    title: 'World-Building Techniques',
    author: 'Bernice Arthur',
    publishDate: '2023-09-10',
    category: 'Tutorials',
    readTime: '9 min',
    image: '/images/bg8.jpg',
    likes: 165,
    comments: 35,
    views: 450,
    excerpt: 'Learn how to create immersive and believable worlds for your stories.',
  },
  {
    id: 10,
    title: 'Overcoming Writer\'s Block',
    author: 'Bernice Arthur',
    publishDate: '2023-09-08',
    category: 'Writing Tips',
    readTime: '5 min',
    image: '/images/bg9.jpg',
    likes: 178,
    comments: 40,
    views: 520,
    excerpt: 'Practical strategies to overcome writer\'s block and maintain creative flow.',
  }
];

const ITEMS_PER_PAGE = 6;

const FeaturedPosts = ({ featuredBlogs, likedPosts, onLike }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredBlogs.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredBlogs.length]);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % featuredBlogs.length);
  };

  return (
    <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          <div className="absolute inset-0">
            <Image
              src={featuredBlogs[currentSlide].image}
              alt={featuredBlogs[currentSlide].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 sm:space-y-3 md:space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <motion.div
                  className="px-2 sm:px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center gap-2 w-fit"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <FaAward className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-white text-xs sm:text-sm font-medium">Featured</span>
                </motion.div>
                <span className="text-white/80 flex items-center text-xs sm:text-sm">
                  <FaCalendarAlt className="mr-1 sm:mr-2" />
                  {new Date(featuredBlogs[currentSlide].publishDate).toLocaleDateString('en-US', { 
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-['Playfair_Display'] leading-tight">
                {featuredBlogs[currentSlide].title}
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl line-clamp-2 sm:line-clamp-none">
                {featuredBlogs[currentSlide].excerpt}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                <Link href={`/blogpost/${featuredBlogs[currentSlide].id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-white text-black text-xs sm:text-sm md:text-base rounded-full font-medium flex items-center group whitespace-nowrap"
                  >
                    <span>Read Article</span>
                    <FaChevronRight className="ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <div className="flex items-center gap-2 sm:gap-4 text-white/90 text-xs sm:text-sm">
                  <div className="flex items-center">
                    <FaRegEye className="mr-1 sm:mr-2" />
                    {featuredBlogs[currentSlide].views}
                  </div>
                  <div className="flex items-center">
                    <FaRegComment className="mr-1 sm:mr-2" />
                    {featuredBlogs[currentSlide].comments}
                  </div>
                  <motion.button
                    onClick={() => onLike(featuredBlogs[currentSlide].id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center"
                  >
                    {likedPosts[featuredBlogs[currentSlide].id] ? (
                      <FaHeart className="text-red-500 mr-1 sm:mr-2" />
                    ) : (
                      <FaRegHeart className="mr-1 sm:mr-2" />
                    )}
                    {featuredBlogs[currentSlide].likes}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
      >
        <FaChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
      >
        <FaChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {featuredBlogs.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide(index);
            }}
            className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4 sm:w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({ blog, isLiked, onLike, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group w-full"
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <Link href={`/blogpost/${blog.id}`} className="flex flex-col h-full">
          <div className="relative h-40 sm:h-48 md:h-56">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className={`px-2 sm:px-3 py-1 ${categoryColors[blog.category] || 'bg-accent/80'} text-white text-xs sm:text-sm rounded-full backdrop-blur-sm`}>
                {blog.category}
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow space-y-2 sm:space-y-3">
            <div className="flex items-center text-xs sm:text-sm text-secondary space-x-2 sm:space-x-3">
              <span className="flex items-center">
                <FaCalendarAlt className="mr-1 sm:mr-2" />
                {new Date(blog.publishDate).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1 sm:mr-2" />
                {blog.readTime}
              </span>
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-secondary line-clamp-2 text-xs sm:text-sm flex-grow">
              {blog.excerpt}
            </p>
            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border">
              <div className="flex items-center space-x-2 sm:space-x-3 text-secondary text-xs sm:text-sm">
                <span className="flex items-center">
                  <FaRegEye className="mr-1" /> {blog.views}
                </span>
                <span className="flex items-center">
                  <FaRegComment className="mr-1" /> {blog.comments}
                </span>
              </div>
              <motion.button
                onClick={() => onLike(blog.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-1"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-secondary hover:text-accent" />
                )}
                <span className="text-secondary text-xs sm:text-sm">{blog.likes}</span>
              </motion.button>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleLike = (blogId) => {
    setLikedPosts(prev => ({
      ...prev,
      [blogId]: !prev[blogId]
    }));
  };

  const featuredBlogs = blogs.filter(blog => blog.featured);
  const regularPosts = blogs.filter(blog => !blog.featured);

  const filteredBlogs = regularPosts.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col bg-main">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {featuredBlogs.length > 0 && (
          <FeaturedPosts
            featuredBlogs={featuredBlogs}
            likedPosts={likedPosts}
            onLike={handleLike}
          />
        )}

        <div className="mt-12 sm:mt-16 mb-8 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex gap-2 flex-wrap w-full justify-center md:justify-start">
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
                    selectedCategory === category 
                      ? 'bg-accent text-white' 
                      : 'bg-border text-primary hover:bg-accent hover:text-white'
                  } transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            <motion.input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-full bg-border text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence>
            {currentBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                isLiked={likedPosts[blog.id]}
                onLike={handleLike}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredBlogs.length > ITEMS_PER_PAGE && (
          <div className="mt-8 sm:mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
