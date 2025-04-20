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
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-lg"
    >
      <Link href={`/blogpost/${blog.id}`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col">
          {/* Category Tag */}
          <div className="mb-auto">
            <span className={`inline-block px-4 py-1.5 text-xs font-medium text-white rounded-full ${categoryColors[blog.category]?.bg || 'bg-accent'}`}>
              {blog.category.toUpperCase()}
            </span>
          </div>

          {/* Title and Date */}
          <div className="mt-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-accent/90 transition-colors">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-300">
              {formatDate(blog.publishDate)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Blog
          </h1>
          <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto">
            Explore our collection of articles, tutorials, and insights on writing and storytelling.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-colors border-2 ${
                  selectedCategory === category
                    ? `${categoryColors[category].bg} ${categoryColors[category].activeText} border-transparent`
                    : `bg-transparent ${categoryColors[category].border} text-primary dark:text-white ${categoryColors[category].hover}`
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="w-8 h-8 border-t-2 border-accent rounded-full animate-spin"
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;
