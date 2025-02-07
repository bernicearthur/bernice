import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout';
import { useState, useEffect, useMemo } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';

const heroItems = [
  { title: "Writer" },
  { title: "Digital Archivist" },
  { title: "Storyteller" }
];

const projects = [
  {
    id: 1,
    title: 'Digital Archive Project',
    description: 'A comprehensive digital archiving system for preserving cultural heritage.',
    image: '/images/vintage.jpg',
    type: 'Archive',
  },
  {
    id: 2,
    title: 'Story Collection Platform',
    description: 'An interactive platform for collecting and sharing community stories.',
    image: '/images/bg10.jpg',
    type: 'Platform',
  },
  {
    id: 3,
    title: 'Historical Documentation',
    description: 'Documenting and preserving historical events through multimedia.',
    image: '/images/bg12.jpg',
    type: 'Documentation',
  },
];

const stories = [
  {
    id: 1,
    title: 'The Lost Archives',
    description: 'A journey through forgotten historical documents and their significance.',
    genre: 'Personal',
    image: '/images/bg3.jpg',
  },
  {
    id: 2,
    title: 'Voices of the Past',
    description: 'Collection of oral histories from community elders.',
    genre: 'Documentary',
    image: '/images/bg5.jpg',
  },
  {
    id: 3,
    title: 'Digital Preservation',
    description: 'The importance of preserving digital content for future generations.',
    genre: 'Educational',
    image: '/images/bg8.jpg',
  },
];

// Separate animation variants for text transitions
const textVariants = {
  enter: {
    opacity: 0,
    y: 20,
    position: 'absolute',
  },
  center: {
    opacity: 1,
    y: 0,
    position: 'absolute',
  },
  exit: {
    opacity: 0,
    y: -20,
    position: 'absolute',
  },
};

export default function Home() {
  const [currentHeroItem, setCurrentHeroItem] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentHeroItem((prev) => (prev + 1) % heroItems.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Add window size state to handle responsive animations
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-calculate floating element positions
  const floatingElements = useMemo(() => {
    return [...Array(5)].map((_, i) => ({
      width: 20 + i * 10,
      height: 20 + i * 10,
      initialX: typeof window !== 'undefined' ? Math.random() * ((windowSize.width * 0.8) || 0) : 0,
      initialY: typeof window !== 'undefined' ? Math.random() * ((windowSize.height * 0.8) || 0) : 0,
      animationDuration: 15 + i * 5,
      xOffset: Math.random() * 100 - 50, // Random value between -50 and 50
      yOffset: Math.random() * 100 - 50, // Random value between -50 and 50
    }));
  }, [windowSize]);

  return (
    <Layout>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/20 via-main/20 to-accent-hover/20 dark:from-accent/5 dark:via-main/5 dark:to-accent-hover/5">
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute w-full h-full pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, var(--gradient-orb-color) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, var(--gradient-orb-color) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, var(--gradient-orb-color) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, var(--gradient-orb-color) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, var(--gradient-orb-color) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              '--gradient-orb-color': 'rgba(var(--accent-rgb), 0.15)'
            }}
          />
        </div>

        {/* Floating Elements */}
        {floatingElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/20 dark:bg-accent/10 backdrop-blur-sm pointer-events-none"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              boxShadow: '0 4px 12px rgba(var(--accent-rgb), 0.15)',
            }}
            initial={{
              x: element.initialX,
              y: element.initialY,
            }}
            animate={{
              y: [
                element.initialY,
                element.initialY + element.yOffset,
                element.initialY - element.yOffset,
                element.initialY,
              ],
              x: [
                element.initialX,
                element.initialX - element.xOffset,
                element.initialX + element.xOffset,
                element.initialX,
              ],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: element.animationDuration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              times: [0, 0.33, 0.66, 1]
            }}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-main/30 via-main/50 to-main/80 dark:from-main/10 dark:via-main/30 dark:to-main/60" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 md:pt-32 overflow-hidden">
          {/* Hero Section */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left Column - Text Content */}
              <motion.div 
                className="md:w-1/2 text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.p
                  className="text-accent mb-4 font-medium tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  WELCOME TO MY PORTFOLIO
                </motion.p>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-primary mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Bernice Arthur
                </motion.h1>

                {/* Fixed height container for hero items */}
                <div className="h-16 relative mb-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentHeroItem}
                      variants={textVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                      className="w-full"
                    >
                      <div className="text-2xl text-primary/90 font-light">
                        {heroItems[currentHeroItem].title}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.p
                  className="text-secondary text-lg mb-8 max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Crafting compelling narratives and bringing stories to life through creative writing and digital archiving.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link 
                    href="/projects" 
                    className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group"
                  >
                    <span>Explore My Work</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      →
                    </motion.span>
                  </Link>
                  <Link 
                    href="/bio" 
                    className="px-8 py-3 border-2 border-accent/20 hover:border-accent text-primary hover:text-accent rounded-full transition-all duration-300 text-center hover:shadow-lg hover:shadow-accent/5"
                  >
                    About Me
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Column - Decorative Elements */}
              <motion.div 
                className="md:w-1/2 mt-12 md:mt-0 relative h-[500px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative w-full h-full">
                  {/* Animated Circles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-white/20"
                      style={{
                        width: `${(i + 1) * 150}px`,
                        height: `${(i + 1) * 150}px`,
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}

                  {/* Floating Elements */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-accent rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Featured Projects Section */}
          <motion.div 
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex flex-col items-center text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-2">Featured Projects</h2>
              <motion.div 
                className="w-24 h-1 bg-accent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-card-bg border border-border rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div 
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="bg-accent hover:bg-accent-hover text-white px-3 py-1 rounded-full text-sm transition-colors duration-300">
                        {project.type}
                      </span>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-semibold text-primary mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-secondary mb-4 line-clamp-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      {project.description}
                    </motion.p>
                    <motion.div 
                      className="flex justify-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <Link 
                        href={`/projectpost/${project.id}`}
                        className="inline-block bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-full transition-all duration-300"
                      >
                        View Project
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Stories Section */}
          <motion.div 
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-24 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex flex-col items-center text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-2">Featured Stories</h2>
              <motion.div 
                className="w-24 h-1 bg-accent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.slice(0, 3).map((story, index) => (
                <motion.div
                  key={story.id}
                  className="relative bg-card-bg border border-border rounded-lg shadow-lg overflow-hidden aspect-[3/4] cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => window.location.href = `/stories/${story.id}`}
                >
                  <motion.div 
                    className="absolute inset-0 group-hover:scale-110 transition-transform duration-500"
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Dark overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-black/90 dark:via-black/60 dark:to-transparent group-hover:via-black/50 dark:group-hover:via-black/70 transition-all duration-300" />
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <motion.div 
                      className="self-end"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="bg-accent hover:bg-accent-hover text-white px-3 py-1 rounded-full text-sm transition-colors duration-300">
                        {story.genre}
                      </span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <motion.h3 
                        className="text-xl font-semibold text-white mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      >
                        {story.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-200 line-clamp-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      >
                        {story.description}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="fixed left-8 bottom-8 flex flex-col space-y-4 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            {[FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaFacebookF].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-primary/70 hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
            <motion.div className="w-px h-24 bg-border mx-auto" />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-primary rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 