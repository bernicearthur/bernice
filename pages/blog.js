import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaRegHeart, FaHeart, FaRegComment, FaRegEye } from 'react-icons/fa';

const categories = ['All', 'Tutorials', 'Personal', 'Writing Tips', 'Reviews'];

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
  },

  // Add more blog entries as needed
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState({});

  const handleLike = (blogId) => {
    setLikedPosts(prev => ({
      ...prev,
      [blogId]: !prev[blogId]
    }));
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-main">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-60"
      >
        <Image
          src="/images/neosiam.jpg"
          alt="Blog Banner"
          fill
          className="object-cover object-center"
        />
        <div className="hero-overlay flex flex-col items-center justify-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white"
          >
            My Blogs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl mt-2 text-white"
          >
            My World, a Journey Through Ideas.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="flex gap-2 flex-wrap">
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
          <motion.input
            type="text"
            placeholder="Search blogs..."
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <motion.div
                key={blog.id}
                variants={item}
                className="card p-6"
              >
                <div className="relative overflow-hidden">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    width={500} 
                    height={300} 
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover transform hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-secondary text-xs italic mb-2">On {new Date(blog.publishDate).getDate()}, {new Date(blog.publishDate).toLocaleString('default', { month: 'short' })}, {new Date(blog.publishDate).getFullYear()}</p>
                    <h2 className="text-primary font-semibold text-lg sm:text-xl uppercase tracking-wider mb-2 font-['Times_New_Roman']">{blog.title}</h2>
                    <div className="border-b border-gray-300 dark:border-gray-600 my-2"></div>
                    <div className="flex flex-wrap items-center text-secondary text-xs sm:text-sm uppercase gap-y-2">
                      <span className="font-medium mr-4 text-primary">{blog.category}</span>
                      <span className="hidden sm:inline text-secondary">|</span>
                      <span className="ml-0 sm:ml-4 flex items-center gap-1"><FaRegComment className="text-base sm:text-lg" /> {blog.comments}</span>
                      <span className="mx-4 flex items-center gap-1"><FaRegEye className="text-base sm:text-lg" /> {blog.views}</span>
                      <motion.button 
                        onClick={() => handleLike(blog.id)} 
                        className="ml-auto focus:outline-none flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {likedPosts[blog.id] ? (
                          <>
                            <FaHeart className="text-accent text-base sm:text-xl" />
                            <span className="text-accent">{blog.likes}</span>
                          </>
                        ) : (
                          <>
                            <FaRegHeart className="text-secondary text-base sm:text-xl hover:text-accent transition-colors" />
                            <span className="text-secondary hover:text-accent transition-colors">{blog.likes}</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-xl text-secondary">No blog posts found matching your criteria.</p>
              <p className="text-sm text-secondary mt-2">Try adjusting your search or filter settings.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
