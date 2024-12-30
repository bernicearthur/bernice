import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRegHeart, FaHeart, FaRegComment, FaRegEye, FaShare, FaReply, FaUser } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

// Mock data - In a real application, this would come from an API
const story = {
  id: 1,
  title: 'The Enchanted Forest',
  content: `
    <p>Deep within the heart of an ancient woodland, where shadows danced between gnarled trees and whispers of magic hung thick in the air, there lay a secret that had remained untold for centuries.</p>
    
    <p>The forest was unlike any other. Its trees seemed to breathe with an otherworldly rhythm, their leaves shimmering with an iridescent glow that defied natural explanation. As I stepped deeper into its embrace, I could feel the weight of countless untold stories pressing in around me.</p>
    
    <p>This was where my journey began, though I didn't know it then. The path ahead wound like a ribbon through the undergrowth, beckoning me forward with promises of adventure and discovery.</p>
  `,
  author: {
    name: 'Bernice Arthur',
    image: '/images/profile.jpg',
    bio: 'Published on 15/10/2023'
  },
  publishDate: '2023-10-15',
  genre: 'Fantasy',
  readTime: '10 min',
  image: '/images/story.jpg',
  likes: 245,
  comments: [
    {
      id: 1,
      author: 'Sarah Johnson',
      content: 'This story transported me to another world. The imagery is absolutely breathtaking!',
      date: '2023-10-16',
      replies: [
        {
          id: 1,
          author: 'Bernice Arthur',
          content: "Thank you, Sarah! I'm so glad you enjoyed the journey through the enchanted forest.",
          date: '2023-10-16'
        }
      ]
    },
    {
      id: 2,
      author: 'Michael Chen',
      content: 'The way you described the forest breathing with otherworldly rhythm gave me chills. Beautiful writing!',
      date: '2023-10-17',
      replies: []
    }
  ],
  views: 567,
  relatedStories: [
    {
      id: 2,
      title: 'The Last Dragon',
      image: '/images/story2.jpg',
      genre: 'Fantasy',
      likes: 189,
      comments: 23,
      views: 420,
      publishDate: '2023-10-10'
    },
    {
      id: 3,
      title: 'Whispers in the Wind',
      image: '/images/story3.jpg',
      genre: 'Mystery',
      likes: 156,
      comments: 18,
      views: 380,
      publishDate: '2023-10-05'
    }
  ]
};

const StoryPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleComment = (e) => {
    e.preventDefault();
    // Handle comment submission
    setCommentText('');
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-main">
      <Navbar />

      <article className="flex-grow mb-16">
        {/* Hero Section */}
        <div className="relative w-full h-[70vh]">
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/80 to-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {story.title}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4 text-white/90"
              >
                <span>{story.genre}</span>
                <span>•</span>
                <span>{story.readTime} read</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 sm:p-8 bg-main"
          >
            {/* Author Info */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={story.author.image}
                    alt={story.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-primary font-medium">{story.author.name}</p>
                    <p className="text-secondary text-sm">{story.author.bio}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="text-secondary hover:text-accent p-2 rounded-full hover:bg-border/50"
                  >
                    <BsThreeDotsVertical className="text-xl" />
                  </button>
                  {showShareMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-border shadow-lg rounded-lg overflow-hidden"
                    >
                      <button className="w-full text-left px-4 py-3 hover:bg-main text-primary flex items-center gap-2 transition-colors">
                        <FaShare className="text-accent" /> Share Story
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none p-6 sm:p-8 lg:p-10"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />

            {/* Engagement Section */}
            <div className="border-t border-border p-6">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
                >
                  {isLiked ? (
                    <FaHeart className="text-accent" />
                  ) : (
                    <FaRegHeart />
                  )}
                  {story.likes}
                </button>
                <div className="flex items-center gap-2 text-secondary">
                  <FaRegComment />
                  {story.comments.length}
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <FaRegEye />
                  {story.views}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-border p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Comments</h3>
              <form onSubmit={handleComment} className="mb-8">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
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
                {story.comments.map((comment, index) => (
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
                                  {reply.author === story.author.name ? (
                                    <Image
                                      src={story.author.image}
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
                    {index < story.comments.length - 1 && (
                      <div className="w-full h-px bg-border my-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Read Next Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Read Next</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {story.relatedStories.map((relatedStory) => (
              <motion.div
                key={relatedStory.id}
                variants={item}
                className="card p-6 hover:transform hover:scale-105 transition-transform duration-300"
              >
                <Link href={`/stories/${relatedStory.id}`} className="block">
                  <div className="relative overflow-hidden">
                    <Image
                      src={relatedStory.image}
                      alt={relatedStory.title}
                      width={500}
                      height={300}
                      className="w-full h-48 sm:h-56 object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-secondary text-xs italic mb-2">
                        On {new Date(relatedStory.publishDate).getDate()}, {new Date(relatedStory.publishDate).toLocaleString('default', { month: 'short' })}, {new Date(relatedStory.publishDate).getFullYear()}
                      </p>
                      <h3 className="text-primary font-semibold text-lg sm:text-xl uppercase tracking-wider mb-2 font-['Times_New_Roman']">{relatedStory.title}</h3>
                      <div className="border-b border-gray-300 dark:border-gray-600 my-2"></div>
                      <div className="flex flex-wrap items-center text-secondary text-xs sm:text-sm uppercase gap-y-2">
                        <span className="font-medium mr-4 text-primary">{relatedStory.genre}</span>
                        <span className="hidden sm:inline text-secondary">|</span>
                        <span className="ml-0 sm:ml-4 flex items-center gap-1">
                          <FaRegComment className="text-base sm:text-lg" /> {relatedStory.comments}
                        </span>
                        <span className="mx-4 flex items-center gap-1">
                          <FaRegEye className="text-base sm:text-lg" /> {relatedStory.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegHeart className="text-base sm:text-lg" /> {relatedStory.likes}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default StoryPost; 