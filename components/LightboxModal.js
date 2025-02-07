import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  AiFillHeart, 
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDownload,
  AiOutlineShareAlt,
  AiOutlineSave,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineLink,
  AiFillPushpin,
} from 'react-icons/ai';
import { FaRegCommentDots, FaRegBookmark, FaBookmark, FaEyeSlash, FaRegEye, FaTwitter, FaFacebookF, FaLinkedinIn, FaLink } from 'react-icons/fa';
import { BsThreeDots, BsDownload } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';

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
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [comment, setComment] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const menuRef = useRef(null);
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

  // Handle click outside menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
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
          // Keep the share menu open briefly to show the success state
          setTimeout(() => {
            setShowShareMenu(false);
          }, 1000);
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
        break;
    }
  };

  const handleMenuAction = (action) => {
    switch (action) {
      case 'pin':
        onPin?.(currentItem.id);
        break;
      case 'hide':
        onHide?.(currentItem.id);
        break;
    }
    setShowMenu(false);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-50 p-2 text-white hover:bg-white/10 rounded-full"
          onClick={onClose}
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        {/* Navigation arrows */}
        {hasPrevious && (
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
          >
            <AiOutlineArrowLeft className="w-6 h-6" />
          </button>
        )}
        {hasNext && (
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <AiOutlineArrowRight className="w-6 h-6" />
          </button>
        )}

        {/* Main content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative flex w-full max-w-7xl h-[80vh] mx-4 bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left side - Image */}
          <div className="relative flex-1 bg-black">
            {isPinned && (
              <div className="absolute top-4 right-4 z-10">
                <AiFillPushpin className="w-6 h-6 text-purple-500" />
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
            </div>
            {/* Image controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button 
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white"
              >
                {isZoomed ? (
                  <AiOutlineZoomOut className="w-5 h-5" />
                ) : (
                  <AiOutlineZoomIn className="w-5 h-5" />
                )}
              </button>
              <button 
                onClick={handleDownload}
                className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white"
              >
                <BsDownload className="w-5 h-5" />
              </button>
              <div className="relative" ref={shareMenuRef}>
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white"
                >
                  <AiOutlineShareAlt className="w-5 h-5" />
                </button>
                {showShareMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-2 flex gap-2">
                      <button 
                        onClick={() => handleShare('twitter')}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
                      >
                        <FaTwitter className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleShare('facebook')}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4267B2] text-white hover:opacity-90 transition-opacity"
                      >
                        <FaFacebookF className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleShare('linkedin')}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077b5] text-white hover:opacity-90 transition-opacity"
                      >
                        <FaLinkedinIn className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleShare('copy')}
                        className={`w-8 h-8 flex items-center justify-center rounded-full 
                                   ${copySuccess 
                                     ? 'bg-green-500 dark:bg-green-600' 
                                     : 'bg-gray-500 dark:bg-gray-600'} 
                                   text-white hover:opacity-90 transition-all duration-300`}
                        title={copySuccess ? 'Link copied!' : 'Copy link'}
                      >
                        {copySuccess ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <FaLink className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Info */}
          <div className="w-96 flex flex-col border-l border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{currentItem.title}</h2>
                <div className="relative" ref={menuRef}>
                  <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <HiOutlineDotsVertical className="w-5 h-5" />
                  </button>
                  {showMenu && (
                    <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden min-w-[160px]">
                      <button 
                        onClick={() => handleMenuAction('pin')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <AiFillPushpin className={`${isPinned ? "text-purple-500" : ""}`} />
                        {isPinned ? 'Unpin Post' : 'Pin Post'}
                      </button>
                      <button 
                        onClick={() => handleMenuAction('hide')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <FaEyeSlash />
                        Hide Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {currentItem.description}
              </p>
            </div>

            {/* Engagement */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-1 hover:scale-110 transition-transform"
                >
                  {isLiked ? (
                    <AiFillHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <AiOutlineHeart className="w-6 h-6" />
                  )}
                  <span>{currentItem.likes}</span>
                </button>
                <button className="flex items-center gap-1">
                  <FaRegCommentDots className="w-5 h-5" />
                  <span>{currentItem.comments}</span>
                </button>
                <div className="flex items-center gap-1">
                  <FaRegEye className="w-5 h-5" />
                  <span>{currentItem.views || 0}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-1"
              >
                {isSaved ? (
                  <FaBookmark className="w-5 h-5 text-purple-500" />
                ) : (
                  <FaRegBookmark className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Comments section */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {/* Add sample comments here */}
                <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet</p>
              </div>
            </div>

            {/* Comment input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 
                           text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm 
                           hover:bg-purple-600 transition-colors disabled:opacity-50"
                  disabled={!comment.trim()}
                  onClick={() => {
                    // Handle comment submission
                    alert('Comment posted!');
                    setComment('');
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related items */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg">
          {relatedItems.slice(0, 5).map((item, index) => (
            <button
              key={item.id}
              className="w-16 h-16 relative rounded-lg overflow-hidden opacity-70 hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Handle related item click
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightboxModal; 