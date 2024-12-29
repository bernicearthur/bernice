import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../components/theme';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

const menuItemVariants = {
  hidden: { 
    opacity: 0,
    x: 50
  },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  }),
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.2
    }
  }
};

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => router.pathname === path;

  return (
    <>
      <Head>
        <link rel="icon" href="/icons/favicon.png" type="image/png" />
      </Head>
      <nav className="sticky top-0 z-50 nav-background shadow-md py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-200">
                <span className="text-xl font-bold text-primary">Bernice Arthur</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:transition-transform after:duration-300 ${isActive('/') ? 'pb-2 after:scale-x-100' : 'after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left'}`}>Home</Link>
              <Link href="/bio" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:transition-transform after:duration-300 ${isActive('/bio') ? 'pb-2 after:scale-x-100' : 'after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left'}`}>Bio</Link>
              <Link href="/blog" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:transition-transform after:duration-300 ${isActive('/blog') ? 'pb-2 after:scale-x-100' : 'after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left'}`}>Blog</Link>
              <Link href="/stories" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:transition-transform after:duration-300 ${isActive('/stories') ? 'pb-2 after:scale-x-100' : 'after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left'}`}>Stories</Link>
              <Link href="/projects" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:transition-transform after:duration-300 ${isActive('/projects') ? 'pb-2 after:scale-x-100' : 'after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left'}`}>Projects</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-border transition-all duration-300 hover:rotate-90"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? 
                    <FiSun className="h-5 w-5 text-accent" /> : 
                    <FiMoon className="h-5 w-5 text-primary" />
                  }
                </button>
              )}
              <Link href="/login" className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                Login
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-border transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? 
                    <FiSun className="h-5 w-5 text-accent" /> : 
                    <FiMoon className="h-5 w-5 text-primary" />
                  }
                </button>
              )}
              <button onClick={toggleMenu} className="p-2 rounded-md text-primary hover:bg-border transition-colors duration-300">
                {isOpen ? <FiX className="h-6 w-6 transform rotate-0 transition-transform duration-300" /> : <FiMenu className="h-6 w-6 transform rotate-180 transition-transform duration-300" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-main shadow-lg w-1/2 absolute right-0 top-[5rem]"
            >
              <div className="px-4 py-3 space-y-0">
                <motion.div custom={0} variants={menuItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link href="/" className={`block px-3 py-3 border-y border-border transform transition-all duration-200 text-center hover:bg-border ${isActive('/') ? 'bg-border text-accent' : 'text-primary'}`}>Home</Link>
                </motion.div>
                <motion.div custom={1} variants={menuItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link href="/bio" className={`block px-3 py-3 border-b border-border transform transition-all duration-200 text-center hover:bg-border ${isActive('/bio') ? 'bg-border text-accent' : 'text-primary'}`}>Bio</Link>
                </motion.div>
                <motion.div custom={2} variants={menuItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link href="/blog" className={`block px-3 py-3 border-b border-border transform transition-all duration-200 text-center hover:bg-border ${isActive('/blog') ? 'bg-border text-accent' : 'text-primary'}`}>Blog</Link>
                </motion.div>
                <motion.div custom={3} variants={menuItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link href="/stories" className={`block px-3 py-3 border-b border-border transform transition-all duration-200 text-center hover:bg-border ${isActive('/stories') ? 'bg-border text-accent' : 'text-primary'}`}>Stories</Link>
                </motion.div>
                <motion.div custom={4} variants={menuItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link href="/projects" className={`block px-3 py-3 border-b border-border transform transition-all duration-200 text-center hover:bg-border ${isActive('/projects') ? 'bg-border text-accent' : 'text-primary'}`}>Projects</Link>
                </motion.div>
                <motion.div custom={5} variants={menuItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link href="/login" className={`block px-3 py-3 border-b border-border transform transition-all duration-200 text-center hover:bg-border ${isActive('/login') ? 'bg-border text-accent' : 'text-primary'}`}>Login</Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
