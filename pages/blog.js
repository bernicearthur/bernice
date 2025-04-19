import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart, FaHeart, FaRegComment, FaRegEye, FaSearch, FaCalendarAlt, FaClock, FaChevronRight, FaChevronLeft, FaAward } from 'react-icons/fa';
import Pagination from '../components/pagination';
import Layout from '../components/layout';

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

const FeaturedPosts = ({ featuredBlogs }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredBlogs.length);
      }, 5000);
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
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <motion.div
                  className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center gap-2 w-fit"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <FaAward className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">Featured</span>
                </motion.div>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(featuredBlogs[currentSlide].publishDate).toLocaleDateString('en-US', { 
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center">
                    <FaClock className="mr-2" />
                    {featuredBlogs[currentSlide].readTime}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Playfair_Display'] leading-tight">
                {featuredBlogs[currentSlide].title}
              </h1>
              <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl line-clamp-2 sm:line-clamp-3">
                {featuredBlogs[currentSlide].excerpt}
              </p>
              <Link href={`/blogpost/${featuredBlogs[currentSlide].id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-black text-sm md:text-base rounded-full font-medium flex items-center group mt-4"
                >
                  <span>Read Article</span>
                  <FaChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredBlogs.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({ blog, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blogpost/${blog.id}`}>
        <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="relative h-48 sm:h-56 md:h-64">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 ${categoryColors[blog.category] || 'bg-accent/80'} text-white text-sm rounded-full backdrop-blur-sm`}>
                {blog.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between text-sm text-secondary mb-4">
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {new Date(blog.publishDate).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <FaClock className="mr-2" />
                {blog.readTime}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-primary group-hover:text-accent transition-colors mb-3 line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-secondary line-clamp-3 text-sm md:text-base">
              {blog.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  const featuredBlogs = blogs.filter(blog => blog.featured);
  const regularPosts = blogs.filter(blog => !blog.featured);

  const filteredBlogs = regularPosts.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesCategory;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  return (
    <Layout>
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {featuredBlogs.length > 0 && (
          <FeaturedPosts
            featuredBlogs={featuredBlogs}
          />
        )}

        <div className="mt-16 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="flex gap-3 flex-wrap justify-center">
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm ${
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
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {currentBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredBlogs.length > ITEMS_PER_PAGE && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;
