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
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary text-sm font-medium">
              © {currentYear} <Link href="/bio" className="text-accent hover:text-accent-hover transition-colors duration-300">Bernice Arthur</Link>.  All rights reserved.
            </p>
            <p className="text-secondary text-sm mt-4 md:mt-0 flex items-center group">
              Developed by <a href="https://github.com/andrewsemtetteh" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors duration-300 ml-1">Andrew</a>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-accent hover:bg-accent-hover text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
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
