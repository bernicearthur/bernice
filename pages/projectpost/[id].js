import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShare2, FiEye, FiFacebook, FiInstagram, FiLinkedin, FiChevronLeft, FiChevronRight, FiMessageCircle, FiYoutube, FiTwitter, FiLink } from 'react-icons/fi';
import { FaUser, FaReply, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

// Mock data - replace with actual API calls
const projectData = {
  id: 1,
  title: 'Project Title',
  description: `A detailed description of the project. This can include multiple paragraphs and formatting.
                You can discuss the challenges, solutions, and outcomes of the project here.`,
  images: [
    '/images/project1.jpg',
    '/images/project2.jpg',
    '/images/project3.jpg',
    '/images/project4.jpg',
  ],
  likes: 42,
  views: 156,
  social: {
    instagram: 'https://instagram.com/username',
    facebook: 'https://facebook.com/username',
    linkedin: 'https://linkedin.com/in/username',
    youtube: 'https://youtube.com/@username',
    twitter: 'https://twitter.com/username'
  },
  comments: [
    {
      id: 1,
      author: 'John Doe',
      content: 'Amazing work!',
      date: '2023-08-10T12:00:00Z',
      replies: [
        {
          id: 1,
          author: 'Bernice Arthur',
          content: 'Thank you so much, John!',
          date: '2023-08-10T13:00:00Z'
        }
      ]
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Love the design!',
      date: '2023-08-09T15:30:00Z',
      replies: []
    }
  ]
};

const ProjectPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(projectData.comments);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    // Increment view count when page loads
    // This would typically be an API call
    console.log('View counted');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    // Add API call to update likes
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: 'Current User', // Replace with actual user data
      content: comment,
      timestamp: new Date().toISOString(),
    };

    setComments([newComment, ...comments]);
    setComment('');
    // Add API call to save comment
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = projectData.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        setShowShareMenu(false);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        setShowShareMenu(false);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`);
        setShowShareMenu(false);
        break;
      case 'instagram':
        window.open(`https://www.instagram.com/direct/new/?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        setShowShareMenu(false);
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          setShowShareMenu(false);
        });
        break;
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => 
      prev === projectData.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => 
      prev === 0 ? projectData.images.length - 1 : prev - 1
    );
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNextSlide();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      handlePrevSlide();
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === projectData.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? projectData.images.length - 1 : prev - 1));
  };

  const handleReply = (commentId) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
    } else {
      setReplyingTo(commentId);
      setReplyText('');
    }
  };

  const submitReply = (e, commentId) => {
    e.preventDefault();
    // Handle reply submission
    setReplyText('');
    setReplyingTo(null);
  };

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
  };

  return (
    <div className="min-h-screen bg-main">
      <Navbar />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-accent text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center transition-all duration-300 opacity-100">
          <FiLink className="w-5 h-5 mr-2" />
          Link copied to clipboard!
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          {/* Project Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">{projectData.title}</h1>
          </div>

          {/* Project Description */}
          <div className="prose dark:prose-invert max-w-none mb-12">
            <p className="text-primary">{projectData.description}</p>
          </div>

          {/* Image Gallery - Desktop Grid and Mobile Carousel */}
          <div className="mb-12">
            {/* Desktop Grid - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-12 gap-4 auto-rows-[200px]">
              {projectData.images.map((image, index) => {
                let sizeClass = '';
                if (index === 0) {
                  sizeClass = 'col-span-8 row-span-2'; // Large feature image
                } else if (index === 1) {
                  sizeClass = 'col-span-4 row-span-2'; // Tall image
                } else if (index % 3 === 0) {
                  sizeClass = 'col-span-6 row-span-1'; // Wide image
                } else {
                  sizeClass = 'col-span-3 row-span-1'; // Standard image
                }

                return (
                  <motion.div
                    key={index}
                    className={`${sizeClass} group relative overflow-hidden rounded-lg cursor-pointer`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <motion.div
                      className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-white text-lg font-medium">View Image</span>
                    </motion.div>
                    <Image
                      src={image}
                      alt={`Project image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 1024px) 33vw, 25vw"
                      priority={index === 0}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Carousel - Hidden on Desktop */}
            <div className="md:hidden relative h-[400px] overflow-hidden rounded-lg">
              <div
                className="relative h-full touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence initial={false} custom={currentSlide}>
                  <motion.div
                    key={currentSlide}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={() => handleImageClick(currentSlide)}
                  >
                    <Image
                      src={projectData.images[currentSlide]}
                      alt={`Project image ${currentSlide + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
                >
                  <FiChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
                >
                  <FiChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {projectData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics and Actions */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-12 py-6 border-y border-border">
            <button
              onClick={handleLike}
              className={`flex items-center ${liked ? 'text-red-500' : 'text-secondary hover:text-red-500'} transition-colors hover:scale-105`}
              title="Like this project"
            >
              <FiHeart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span className="ml-2 hidden sm:inline">{projectData.likes + (liked ? 1 : 0)} likes</span>
              <span className="ml-2 sm:hidden">{projectData.likes + (liked ? 1 : 0)}</span>
            </button>

            <div 
              className="flex items-center text-secondary hover:text-primary transition-colors hover:scale-105"
              title="Comments"
            >
              <FiMessageCircle className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">{comments.length} comments</span>
              <span className="ml-2 sm:hidden">{comments.length}</span>
            </div>
            
            <div 
              className="flex items-center text-secondary hover:text-primary transition-colors hover:scale-105"
              title="View count"
            >
              <FiEye className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">{projectData.views} views</span>
              <span className="ml-2 sm:hidden">{projectData.views}</span>
            </div>

            <div className="relative group" ref={shareMenuRef}>
              <button
                onClick={toggleShareMenu}
                className="flex items-center text-secondary hover:text-primary transition-colors hover:scale-105"
                title="Share project"
              >
                <FiShare2 className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Share</span>
              </button>
              
              {/* Share Dropdown */}
              <div className={`absolute right-0 mt-2 py-2 w-48 bg-card-bg rounded-lg shadow-xl transition-all duration-200 z-10 overflow-hidden ${showShareMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-accent hover:text-white text-primary transition-all duration-200"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-accent hover:text-white text-primary transition-all duration-200"
                >
                  <FiInstagram className="w-5 h-5" />
                  <span>Instagram</span>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-accent hover:text-white text-primary transition-all duration-200"
                >
                  <FiFacebook className="w-5 h-5" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-accent hover:text-white text-primary transition-all duration-200"
                >
                  <FiLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-accent hover:text-white text-primary transition-all duration-200"
                >
                  <FiLink className="w-5 h-5" />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Also On</h2>
            <div className="flex justify-center space-x-6">
              <a
                href={projectData.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-all duration-200 hover:scale-110"
              >
                <FiYoutube className="w-6 h-6" />
              </a>
              <a
                href={projectData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-all duration-200 hover:scale-110"
              >
                <FiTwitter className="w-6 h-6" />
              </a>
              <a
                href={projectData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-all duration-200 hover:scale-110"
              >
                <FiFacebook className="w-6 h-6" />
              </a>
              <a
                href={projectData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-all duration-200 hover:scale-110"
              >
                <FiInstagram className="w-6 h-6" />
              </a>
              <a
                href={projectData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-all duration-200 hover:scale-110"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-border py-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Comments</h3>
              <form onSubmit={handleComment} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 rounded-lg bg-main border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary/50 resize-none"
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-3 px-6 py-2 bg-accent text-white rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Post Comment
                </button>
              </form>

              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div key={comment.id}>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                            <FaUser className="text-secondary w-5 h-5" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-primary">{comment.author}</p>
                                <p className="text-secondary text-sm">
                                  {new Date(comment.date).toLocaleDateString()}
                                </p>
                              </div>
                              <button
                                onClick={() => handleReply(comment.id)}
                                className="text-secondary hover:text-accent text-sm flex items-center gap-1"
                              >
                                <FaReply /> Reply
                              </button>
                            </div>
                            <p className="text-primary mt-2">{comment.content}</p>
                          </div>
                        </div>
                      </div>

                      {replyingTo === comment.id && (
                        <form
                          onSubmit={(e) => submitReply(e, comment.id)}
                          className="ml-14 mt-3 transition-all duration-200"
                        >
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full p-3 rounded-lg bg-main border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary/50"
                            rows={2}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              type="submit"
                              className="px-4 py-1.5 bg-accent text-white rounded-full hover:bg-opacity-90 text-sm"
                            >
                              Post Reply
                            </button>
                            <button
                              type="button"
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-1.5 bg-border text-primary rounded-full hover:bg-opacity-90 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <>
                          <div className="ml-14 w-px h-4 bg-border" />
                          <div className="ml-14 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="p-4 rounded-lg border border-border">
                                <div className="flex items-start gap-3">
                                  {reply.author === 'Bernice Arthur' ? (
                                    <Image
                                      src="/images/profile.jpg"
                                      alt={reply.author}
                                      width={40}
                                      height={40}
                                      className="rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                                      <FaUser className="text-secondary w-5 h-5" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium text-primary">{reply.author}</p>
                                    <p className="text-secondary text-sm">
                                      {new Date(reply.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-primary mt-2">{reply.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {index < comments.length - 1 && (
                      <div className="w-full h-px bg-border my-6" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectPost;
