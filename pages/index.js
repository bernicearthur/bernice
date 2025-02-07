import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';

const heroItems = [
  { title: "Writer", icon: "✍️" },
  { title: "Storyteller", icon: "📚" },
  { title: "Archiver", icon: "📑" }
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

export default function Home() {
  const [currentHeroItem, setCurrentHeroItem] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentHeroItem((prev) => (prev + 1) % heroItems.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-accent/20 via-black to-accent-hover/20">
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute w-full h-full"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(var(--accent-rgb), 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(var(--accent-rgb), 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb), 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(var(--accent-rgb), 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(var(--accent-rgb), 0.4) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        </div>

        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/20"
            initial={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-48 md:pt-32">
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
                  className="text-5xl md:text-7xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Bernice Arthur
                </motion.h1>

                {/* Fixed height container for hero items */}
                <div className="h-20 relative mb-8">
                  <AnimatePresence mode="wait">
                    {isVisible && (
                      <motion.div
                        key={currentHeroItem}
                        className="absolute top-0 left-0 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="flex items-center space-x-4 text-2xl text-white/90">
                          <span className="text-4xl">{heroItems[currentHeroItem].icon}</span>
                          <span className="font-light">{heroItems[currentHeroItem].title}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.p
                  className="text-gray-300 text-lg mb-8 max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Crafting compelling narratives and bringing stories to life through creative writing and digital archiving.
                </motion.p>

                <motion.div
                  className="flex space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link href="/bio" className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                    <span>Explore My Work</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                  <Link href="/contact" className="px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300">
                    Get in Touch
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
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24"
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
              <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
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
                  className="bg-card-bg rounded-lg shadow-lg overflow-hidden"
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
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                        {project.type}
                      </span>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-semibold text-white mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-300 mb-4 line-clamp-2"
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
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-24"
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
              <h2 className="text-3xl font-bold text-white mb-2">Featured Stories</h2>
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
                  className="relative bg-card-bg rounded-lg shadow-lg overflow-hidden aspect-[3/4] cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => window.location.href = `/stories/${story.id}`}
                >
                  <motion.div 
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <motion.div 
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm">
                        {story.genre}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-6"
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
                        className="text-gray-300 line-clamp-2"
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
            className="fixed left-0 bottom-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            {[FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaFacebookF].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
            <motion.div className="w-px h-24 bg-white/20 mx-auto" />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-white rounded-full mt-2"
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