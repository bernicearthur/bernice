import Link from 'next/link';
import { FiArrowUp } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-main border-t border-border w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bottom Bar */}
        <div className="text-center">
          <p className="text-secondary text-sm font-medium mb-2">
            © {currentYear} <Link href="/login" className="text-accent hover:text-accent-hover transition-colors duration-300">Bernice Arthur</Link>.  All rights reserved.
          </p>
          <p className="text-secondary text-sm flex items-center justify-center group">
            Developed by <a href="https://andrewsemtetteh.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors duration-300 ml-1">Andrew</a>
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-accent hover:bg-accent-hover text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${
          showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;
