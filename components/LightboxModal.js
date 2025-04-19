import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDownload,
  AiOutlineShareAlt,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiFillPushpin,
} from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaLink } from 'react-icons/fa';

const LightboxModal = ({ 
  isOpen, 
  onClose, 
  currentItem, 
  onPrevious, 
  onNext, 
  hasNext, 
  hasPrevious,
  relatedItems = [],
  onPin,
  onHide,
  isPinned = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const shareMenuRef = useRef(null);
  const { theme } = useTheme();

  // Reset copy success message after 2 seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext, hasNext, hasPrevious]);

  // Handle click outside share menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(currentItem.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentItem.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleShare = async (platform) => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${currentItem.title}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopySuccess(true);
          setTimeout(() => {
            setShowShareMenu(false);
          }, 1000);
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
        break;
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button 
          className="absolute top-2 right-2 z-50 p-2 text-white hover:bg-white/10 rounded-full sm:top-4 sm:right-4"
          onClick={onClose}
        >
          <AiOutlineClose className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Navigation arrows - Hidden on mobile, shown on swipe */}
        {hasPrevious && (
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full hidden sm:block sm:left-4"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
          >
            <AiOutlineArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
        {hasNext && (
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full hidden sm:block sm:right-4"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <AiOutlineArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Main content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-7xl h-[90vh] mx-auto rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image container */}
          <div className="relative w-full h-full bg-black">
            {isPinned && (
              <div className="absolute top-2 right-2 z-10 sm:top-4 sm:right-4">
                <AiFillPushpin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              </div>
            )}
            <div className={`relative w-full h-full ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                 onClick={() => setIsZoomed(!isZoomed)}>
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                className={`object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              />
              {/* Title and description overlay */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-black/50 backdrop-blur-sm p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-semibold text-white">{currentItem.title}</h2>
                      <p className="text-base sm:text-lg text-gray-200">{currentItem.description}</p>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:flex-nowrap">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsZoomed(!isZoomed);
                        }}
                        className="p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
                      >
                        {isZoomed ? (
                          <AiOutlineZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <AiOutlineZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload();
                        }}
                        className="p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
                      >
                        <BsDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <div className="relative" ref={shareMenuRef}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowShareMenu(!showShareMenu);
                          }}
                          className="p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
                        >
                          <AiOutlineShareAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        {showShareMenu && (
                          <div className="absolute bottom-full right-0 mb-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
                            <button
                              onClick={() => handleShare('twitter')}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                            >
                              <FaTwitter className="w-4 h-4 text-blue-400" />
                              <span>Twitter</span>
                            </button>
                            <button
                              onClick={() => handleShare('facebook')}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                            >
                              <FaFacebookF className="w-4 h-4 text-blue-600" />
                              <span>Facebook</span>
                            </button>
                            <button
                              onClick={() => handleShare('linkedin')}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                            >
                              <FaLinkedinIn className="w-4 h-4 text-blue-700" />
                              <span>LinkedIn</span>
                            </button>
                            <button
                              onClick={() => handleShare('copy')}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                            >
                              <FaLink className="w-4 h-4" />
                              <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightboxModal; 