import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../components/theme';
import { FiSun, FiMoon, FiMenu, FiX, FiHome, FiUser, FiBook, FiImage, FiBookOpen, FiArchive } from 'react-icons/fi';
import Head from 'next/head';
import Image from 'next/image';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const menuRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) { // scrolling down & past threshold
          setShow(false);
        } else { // scrolling up
          setShow(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => router.pathname === path;

  return (
    <>
      <Head>
        <link rel="icon" href="/icons/favicon.png" type="image/png" />
      </Head>
      <div className="h-24" /> {/* Spacer to prevent content jump */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-main shadow-md py-4 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center transform hover:scale-105 transition-transform duration-200">
                <Image
                  src={theme === 'dark' ? '/images/dark.svg' : '/images/light.svg'}
                  alt="Bernice Arthur"
                  width={200}
                  height={60}
                  className="w-28 sm:w-36 h-auto"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:bg-accent after:transition-all after:duration-300 after:ease-out after:rounded-t-none after:rounded-b-[100%] ${isActive('/') ? 'pb-2 after:scale-100' : 'after:scale-0 hover:after:scale-100'} ${theme === 'light' ? 'text-black' : 'text-primary'}`}>Home</Link>
              <Link href="/blog" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:bg-accent after:transition-all after:duration-300 after:ease-out after:rounded-t-none after:rounded-b-[100%] ${isActive('/blog') ? 'pb-2 after:scale-100' : 'after:scale-0 hover:after:scale-100'} ${theme === 'light' ? 'text-black' : 'text-primary'}`}>Blog</Link>
              <Link href="/gallery" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:bg-accent after:transition-all after:duration-300 after:ease-out after:rounded-t-none after:rounded-b-[100%] ${isActive('/gallery') ? 'pb-2 after:scale-100' : 'after:scale-0 hover:after:scale-100'} ${theme === 'light' ? 'text-black' : 'text-primary'}`}>Gallery</Link>
              <Link href="/stories" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:bg-accent after:transition-all after:duration-300 after:ease-out after:rounded-t-none after:rounded-b-[100%] ${isActive('/stories') ? 'pb-2 after:scale-100' : 'after:scale-0 hover:after:scale-100'} ${theme === 'light' ? 'text-black' : 'text-primary'}`}>Stories</Link>
              <Link href="/archives" className={`nav-link relative pb-1 hover:pb-2 after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:bg-accent after:transition-all after:duration-300 after:ease-out after:rounded-t-none after:rounded-b-[100%] ${isActive('/archives') ? 'pb-2 after:scale-100' : 'after:scale-0 hover:after:scale-100'} ${theme === 'light' ? 'text-black' : 'text-primary'}`}>Archives</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-border transition-all duration-300 hover:rotate-90"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? 
                    <FiSun className="h-5 w-5 text-white" /> : 
                    <FiMoon className="h-5 w-5 text-primary" />
                  }
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center space-x-4">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-border transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? 
                    <FiSun className="h-5 w-5 text-white" /> : 
                    <FiMoon className="h-5 w-5 text-primary" />
                  }
                </button>
              )}
              <button 
                onClick={toggleMenu} 
                className="p-2 rounded-md text-primary hover:bg-border transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX className="h-6 w-6 transform rotate-0 transition-transform duration-300" /> : <FiMenu className="h-6 w-6 transform rotate-180 transition-transform duration-300" />}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        <div 
          ref={menuRef}
          className={`md:hidden fixed top-0 right-0 h-screen w-1/2 bg-main shadow-lg transform transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}
          style={{
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            opacity: isOpen ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out',
            maxHeight: '100vh',
            overflowY: 'auto'
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-md text-primary hover:bg-border transition-colors duration-300"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-4 space-y-6">
              <Link 
                href="/" 
                className={`text-lg transform transition-all duration-300 hover:scale-105 flex items-center space-x-3 ${
                  isActive('/') ? 'text-accent font-bold' : 'text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiHome className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link 
                href="/blog" 
                className={`text-lg transform transition-all duration-300 hover:scale-105 flex items-center space-x-3 ${
                  isActive('/blog') ? 'text-accent font-bold' : 'text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiBook className="h-5 w-5" />
                <span>Blog</span>
              </Link>
              <Link 
                href="/gallery" 
                className={`text-lg transform transition-all duration-300 hover:scale-105 flex items-center space-x-3 ${
                  isActive('/gallery') ? 'text-accent font-bold' : 'text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiImage className="h-5 w-5" />
                <span>Gallery</span>
              </Link>
              <Link 
                href="/stories" 
                className={`text-lg transform transition-all duration-300 hover:scale-105 flex items-center space-x-3 ${
                  isActive('/stories') ? 'text-accent font-bold' : 'text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiBookOpen className="h-5 w-5" />
                <span>Stories</span>
              </Link>
              <Link 
                href="/archives" 
                className={`text-lg transform transition-all duration-300 hover:scale-105 flex items-center space-x-3 ${
                  isActive('/archives') ? 'text-accent font-bold' : 'text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FiArchive className="h-5 w-5" />
                <span>Archives</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
