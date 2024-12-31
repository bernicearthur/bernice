import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShare2, FiEye, FiFacebook, FiInstagram, FiLinkedin, FiChevronLeft, FiChevronRight, FiMessageCircle, FiYoutube, FiTwitter } from 'react-icons/fi';
import { FaUser, FaReply } from 'react-icons/fa';
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

  useEffect(() => {
    // Increment view count when page loads
    // This would typically be an API call
    console.log('View counted');
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
    // Implement sharing logic for each platform
    const url = window.location.href;
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      case 'instagram':
        // Instagram sharing typically requires a different approach
        // Maybe copy link to clipboard
        navigator.clipboard.writeText(url);
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

  return (
    <div className="min-h-screen bg-main">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
            <motion.button
              onClick={handleLike}
              className={`flex items-center ${liked ? 'text-red-500' : 'text-secondary hover:text-red-500'} transition-colors`}
              whileHover={{ scale: 1.05 }}
              title="Like this project"
            >
              <FiHeart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span className="ml-2 hidden sm:inline">{projectData.likes + (liked ? 1 : 0)} likes</span>
              <span className="ml-2 sm:hidden">{projectData.likes + (liked ? 1 : 0)}</span>
            </motion.button>

            <motion.div 
              className="flex items-center text-secondary hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              title="Comments"
            >
              <FiMessageCircle className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">{comments.length} comments</span>
              <span className="ml-2 sm:hidden">{comments.length}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center text-secondary hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              title="View count"
            >
              <FiEye className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">{projectData.views} views</span>
              <span className="ml-2 sm:hidden">{projectData.views}</span>
            </motion.div>

            <motion.div className="relative group">
              <motion.button
                onClick={() => handleShare('facebook')}
                className="flex items-center text-secondary hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                title="Share project"
              >
                <FiShare2 className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Share</span>
              </motion.button>
              
              {/* Share Dropdown */}
              <div className="absolute right-0 mt-2 py-2 w-48 bg-card-bg rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-accent/10 text-primary"
                >
                  <FiFacebook className="w-5 h-5" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-accent/10 text-primary"
                >
                  <FiInstagram className="w-5 h-5" />
                  <span>Instagram</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-accent/10 text-primary"
                >
                  <FiLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Also On</h2>
            <div className="flex justify-center space-x-6">
              <motion.a
                href={projectData.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-primary hover:text-accent"
              >
                <FiYoutube className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={projectData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-primary hover:text-accent"
              >
                <FiTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={projectData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-primary hover:text-accent"
              >
                <FiFacebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={projectData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-primary hover:text-accent"
              >
                <FiInstagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={projectData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-primary hover:text-accent"
              >
                <FiLinkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-border p-6">
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
                      <motion.form
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={(e) => submitReply(e, comment.id)}
                        className="ml-14 mt-3"
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
                      </motion.form>
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
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectPost;
