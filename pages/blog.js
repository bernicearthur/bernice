import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';
import { useRef } from 'react';

const categories = ['All', 'Tutorials', 'Personal', 'Writing Tips', 'Reviews'];

const categoryColors = {
  'All': {
    bg: 'bg-primary dark:bg-white',
    border: 'border-primary dark:border-white',
    hover: 'hover:bg-primary/10 dark:hover:bg-white/10',
    activeText: 'text-white dark:text-black'
  },
  'Tutorials': {
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    hover: 'hover:bg-blue-600/10',
    activeText: 'text-white'
  },
  'Personal': {
    bg: 'bg-purple-600',
    border: 'border-purple-600',
    hover: 'hover:bg-purple-600/10',
    activeText: 'text-white'
  },
  'Writing Tips': {
    bg: 'bg-red-600',
    border: 'border-red-600',
    hover: 'hover:bg-red-600/10',
    activeText: 'text-white'
  },
  'Reviews': {
    bg: 'bg-green-600',
    border: 'border-green-600',
    hover: 'hover:bg-green-600/10',
    activeText: 'text-white'
  }
};

const blogs = [
  {
    id: 1,
    title: 'How to Write Engaging Stories',
    author: 'Bernice Arthur',
    publishDate: '2023-10-01',
    category: 'Tutorials',
    image: '/images/blog.jpg',
    excerpt: 'Discover the secrets to crafting compelling narratives that captivate your readers from start to finish.',
  },
  {
    id: 2,
    title: 'The Art of Character Development',
    author: 'Bernice Arthur',
    publishDate: '2023-09-28',
    category: 'Writing Tips',
    image: '/images/bg1.jpg',
    excerpt: 'Learn how to create memorable characters that resonate with your readers and bring your stories to life.',
  },
  {
    id: 3,
    title: 'My Journey as a Writer',
    author: 'Bernice Arthur',
    publishDate: '2023-09-25',
    category: 'Personal',
    image: '/images/bg2.jpg',
    excerpt: 'A personal reflection on my writing journey, challenges faced, and lessons learned along the way.',
  },
  {
    id: 4,
    title: 'Book Review: Modern Storytelling',
    author: 'Bernice Arthur',
    publishDate: '2023-09-22',
    category: 'Reviews',
    image: '/images/bg3.jpg',
    excerpt: 'An in-depth review of the latest techniques and approaches in modern storytelling.',
  },
  {
    id: 5,
    title: 'Writing Workshop Experience',
    author: 'Bernice Arthur',
    publishDate: '2023-09-20',
    category: 'Personal',
    image: '/images/bg4.jpg',
    excerpt: 'Sharing insights and experiences from my recent writing workshop attendance.',
  },
  {
    id: 6,
    title: 'Mastering Dialogue Writing',
    author: 'Bernice Arthur',
    publishDate: '2023-09-18',
    category: 'Tutorials',
    image: '/images/bg5.jpg',
    excerpt: 'Tips and techniques for writing natural, engaging dialogue that moves your story forward.',
  },
  {
    id: 7,
    title: 'Finding Your Writing Voice',
    author: 'Bernice Arthur',
    publishDate: '2023-09-15',
    category: 'Writing Tips',
    image: '/images/bg6.jpg',
    excerpt: 'Explore ways to develop and refine your unique writing voice and style.',
  },
  {
    id: 8,
    title: 'Creative Writing Software Review',
    author: 'Bernice Arthur',
    publishDate: '2023-09-12',
    category: 'Reviews',
    image: '/images/bg7.jpg',
    excerpt: 'A comprehensive review of popular writing software tools and their features.',
  },
  {
    id: 9,
    title: 'World-Building Techniques',
    author: 'Bernice Arthur',
    publishDate: '2023-09-10',
    category: 'Tutorials',
    image: '/images/bg8.jpg',
    excerpt: 'Learn how to create immersive and believable worlds for your stories.',
  },
  {
    id: 10,
    title: 'Overcoming Writer\'s Block',
    author: 'Bernice Arthur',
    publishDate: '2023-09-08',
    category: 'Writing Tips',
    image: '/images/bg9.jpg',
    excerpt: 'Practical strategies to overcome writer\'s block and maintain creative flow.',
  }
];

const ITEMS_PER_PAGE = 8;

const BlogCard = ({ blog, index }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card-bg hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/blogpost/${blog.id}`} className="block">
        {/* Featured Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 text-xs font-medium text-white ${categoryColors[blog.category]?.bg || 'bg-accent'}`}>
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center text-secondary text-sm mb-3">
            <time dateTime={blog.publishDate}>{formatDate(blog.publishDate)}</time>
          </div>
          
          <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
            {blog.title}
          </h3>
          
          <p className="text-secondary line-clamp-3 mb-4">
            {blog.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-sm font-medium">BA</span>
              </div>
              <span className="text-sm text-secondary ml-2">Bernice Arthur</span>
            </div>
            <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef);
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesCategory;
  });

  const currentBlogs = filteredBlogs.slice(0, visiblePosts);
  const hasMore = visiblePosts < filteredBlogs.length;

  useEffect(() => {
    setVisiblePosts(ITEMS_PER_PAGE);
  }, [selectedCategory]);

  useEffect(() => {
    if (isInView && hasMore) {
      setVisiblePosts(prev => Math.min(prev + ITEMS_PER_PAGE, filteredBlogs.length));
    }
  }, [isInView, hasMore, filteredBlogs.length]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Latest Articles
          </h1>
          <p className="text-lg text-secondary">
            Discover insights, tutorials, and stories about writing and creativity.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm transition-colors border-2 ${
                  selectedCategory === category
                    ? `${categoryColors[category].bg} ${categoryColors[category].activeText} border-transparent`
                    : `bg-transparent ${categoryColors[category].border} text-primary dark:text-white ${categoryColors[category].hover}`
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        {/* Load More Trigger */}
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="mt-12 flex justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-8 h-8 border-t-2 border-accent animate-spin"
            />
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/5 p-8 text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">Stay Updated</h3>
          <p className="text-secondary mb-6">Get the latest articles and insights delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 border border-border bg-main focus:ring-2 focus:ring-accent focus:border-transparent" 
            />
            <button className="px-6 py-2 bg-accent hover:bg-accent-hover text-white transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default BlogPage;