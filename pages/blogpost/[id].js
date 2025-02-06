import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHeart, FiShare2, FiEye, FiFacebook, FiInstagram, FiLinkedin, FiMessageCircle, FiYoutube, FiTwitter, FiLink } from 'react-icons/fi';
import { FaUser, FaReply, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

// Mock data - In a real application, this would come from an API
const blogPost = {
  id: 1,
  title: 'How to Write Engaging Stories',
  content: `
    <p>Writing engaging stories is an art that combines creativity, technique, and understanding of human nature. In this blog post, we'll explore the essential elements that make a story captivating and memorable.</p>
    
    <h2>1. Start with a Hook</h2>
    <p>Your opening paragraph should grab the reader's attention immediately. Consider starting with an intriguing question, a shocking statement, or an vivid scene that pulls the reader into your world.</p>
    
    <h2>2. Develop Complex Characters</h2>
    <p>Characters are the heart of any story. They should be multi-dimensional, with their own desires, fears, and contradictions. Let your readers connect with them on an emotional level.</p>
  `,
  author: {
    name: 'Bernice Arthur',
    image: '/images/profile.jpg',
    bio: 'Writer, Storyteller, Creative Coach'
  },
  publishDate: '2023-10-01',
  category: 'Tutorials',
  readTime: '5 min',
  image: '/images/blog.jpg',
  likes: 120,
  comments: [
    {
      id: 1,
      author: 'John Doe',
      content: 'This was incredibly helpful! Thank you for sharing your insights.',
      date: '2023-10-02',
      replies: [
        {
          id: 1,
          author: 'Bernice Arthur',
          content: "Thank you, John! I'm glad you found it helpful.",
          date: '2023-10-02',
          liked: false,
          likes: 0
        }
      ],
      liked: false,
      likes: 0
    }
  ],
  views: 300,
  relatedPosts: [
    {
      id: 2,
      title: 'Character Development Tips',
      image: '/images/blog2.jpg',
      category: 'Writing Tips',
      likes: 85,
      comments: 12,
      views: 250,
      publishDate: '2023-09-28'
    },
    {
      id: 3,
      title: 'Finding Your Writing Voice',
      image: '/images/blog3.jpg',
      category: 'Personal',
      likes: 92,
      comments: 8,
      views: 180,
      publishDate: '2023-09-25'
    }
  ]
};

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [comment, setComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyingToReply, setReplyingToReply] = useState(null);
  const [replyToReplyText, setReplyToReplyText] = useState('');
  const shareMenuRef = useRef(null);

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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;
    
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

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleComment = (e) => {
    e.preventDefault();
    // Add API call to post comment
    setComment('');
  };

  const handleReply = (id) => {
    if (replyingTo === id) {
      setReplyingTo(null);
    } else {
      setReplyingTo(id);
      setReplyText('');
    }
  };

  const submitReply = (e, id) => {
    e.preventDefault();
    // Add API call to post reply
    setReplyText('');
    setReplyingTo(null);
  };

  const handleCommentLike = (id) => {
    const commentIndex = blogPost.comments.findIndex((comment) => comment.id === id);
    if (commentIndex !== -1) {
      blogPost.comments[commentIndex].liked = !blogPost.comments[commentIndex].liked;
      if (blogPost.comments[commentIndex].liked) {
        blogPost.comments[commentIndex].likes++;
      } else {
        blogPost.comments[commentIndex].likes--;
      }
    }
  };

  const handleReplyLike = (commentId, replyId) => {
    const commentIndex = blogPost.comments.findIndex((comment) => comment.id === commentId);
    if (commentIndex !== -1) {
      const replyIndex = blogPost.comments[commentIndex].replies.findIndex((reply) => reply.id === replyId);
      if (replyIndex !== -1) {
        blogPost.comments[commentIndex].replies[replyIndex].liked = !blogPost.comments[commentIndex].replies[replyIndex].liked;
        if (blogPost.comments[commentIndex].replies[replyIndex].liked) {
          blogPost.comments[commentIndex].replies[replyIndex].likes++;
        } else {
          blogPost.comments[commentIndex].replies[replyIndex].likes--;
        }
      }
    }
  };

  const handleReplyToReply = (commentId, replyId, replyAuthor) => {
    if (replyingToReply?.commentId === commentId && replyingToReply?.replyId === replyId) {
      setReplyingToReply(null);
      setReplyToReplyText('');
    } else {
      setReplyingToReply({ commentId, replyId, replyAuthor });
      setReplyToReplyText(`@${replyAuthor} `);
    }
  };

  const submitReplyToReply = (e, commentId) => {
    e.preventDefault();
    const comment = blogPost.comments.find(c => c.id === commentId);
    if (comment) {
      const newReply = {
        id: Date.now(),
        author: 'Current User', // Replace with actual user name
        content: replyToReplyText,
        date: new Date().toISOString(),
        liked: false,
        likes: 0,
        replyingTo: replyingToReply.replyAuthor // Store who this reply is responding to
      };
      comment.replies.push(newReply);
      setReplyToReplyText('');
      setReplyingToReply(null);
    }
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

      <article className="flex-grow">
        {/* Hero Image */}
        <div className="relative w-full h-[60vh]">
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 sm:p-8 bg-main"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-4 py-2 rounded-full text-sm bg-border text-primary hover:bg-accent hover:text-white transition-all`}>
                  {blogPost.category}
                </span>
                <div className="relative">
                  <button
                    onClick={toggleShareMenu}
                    className="text-secondary hover:text-accent p-2 rounded-full hover:bg-border/50"
                  >
                    <FiShare2 className="text-xl" />
                  </button>
                  {showShareMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      ref={shareMenuRef}
                      className="absolute right-0 mt-2 w-48 bg-border shadow-lg rounded-lg overflow-hidden"
                    >
                      <button 
                        onClick={() => handleShare('facebook')} 
                        className="w-full text-left px-4 py-3 hover:bg-main text-primary flex items-center gap-2 transition-colors"
                      >
                        <FiFacebook className="text-accent" /> Facebook
                      </button>
                      <button 
                        onClick={() => handleShare('linkedin')} 
                        className="w-full text-left px-4 py-3 hover:bg-main text-primary flex items-center gap-2 transition-colors"
                      >
                        <FiLinkedin className="text-accent" /> LinkedIn
                      </button>
                      <button 
                        onClick={() => handleShare('whatsapp')} 
                        className="w-full text-left px-4 py-3 hover:bg-main text-primary flex items-center gap-2 transition-colors"
                      >
                        <FaWhatsapp className="text-accent" /> WhatsApp
                      </button>
                      <button 
                        onClick={() => handleShare('instagram')} 
                        className="w-full text-left px-4 py-3 hover:bg-main text-primary flex items-center gap-2 transition-colors"
                      >
                        <FiInstagram className="text-accent" /> Instagram
                      </button>
                      <button 
                        onClick={() => handleShare('copy')} 
                        className="w-full text-left px-4 py-3 hover:bg-main text-primary flex items-center gap-2 transition-colors"
                      >
                        <FiLink className="text-accent" /> Copy Link
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">{blogPost.title}</h1>
              
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <Image
                  src={blogPost.author.image}
                  alt={blogPost.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="text-primary font-medium">{blogPost.author.name}</p>
                  <div className="flex items-center text-secondary text-sm gap-2">
                    <span>{new Date(blogPost.publishDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{blogPost.readTime} read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-8 bg-main/30 p-6 rounded-lg"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Engagement Section */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-4 py-6 border-y border-border">
              <button
                onClick={handleLike}
                className={`flex items-center ${liked ? 'text-red-500' : 'text-secondary hover:text-red-500'} transition-colors hover:scale-105`}
                title="Like this post"
              >
                <FiHeart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span className="ml-2 hidden sm:inline">{blogPost.likes + (liked ? 1 : 0)} likes</span>
                <span className="ml-2 sm:hidden">{blogPost.likes + (liked ? 1 : 0)}</span>
              </button>

              <div 
                className="flex items-center text-secondary hover:text-primary transition-colors hover:scale-105"
                title="Comments"
              >
                <FiMessageCircle className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">{blogPost.comments.length} comments</span>
                <span className="ml-2 sm:hidden">{blogPost.comments.length}</span>
              </div>
              
              <div 
                className="flex items-center text-secondary hover:text-primary transition-colors hover:scale-105"
                title="View count"
              >
                <FiEye className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">{blogPost.views} views</span>
                <span className="ml-2 sm:hidden">{blogPost.views}</span>
              </div>
            </div>

            {/* Comments Section */}
            <div className="py-6">
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

              <div className="space-y-6 flex-grow">
                {blogPost.comments.map((comment, index) => (
                  <div key={comment.id}>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-border">
                        <div className="flex items-start gap-3">
                          {comment.author === blogPost.author.name ? (
                            <Image
                              src={blogPost.author.image}
                              alt={comment.author}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          ) : comment.profileImage ? (
                            <Image
                              src={comment.profileImage}
                              alt={comment.author}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <Image
                              src="/icons/user.png"
                              alt={comment.author}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          )}
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-primary">{comment.author}</p>
                              <p className="text-secondary text-sm">{new Date(comment.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-primary mt-2">{comment.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <button
                                onClick={() => handleCommentLike(comment.id)}
                                className={`text-secondary hover:text-red-500 text-sm flex items-center gap-1 transition-colors`}
                              >
                                <FiHeart className={`w-4 h-4 ${comment.liked ? 'fill-current text-red-500' : ''}`} />
                                <span>{comment.likes || 0}</span>
                              </button>
                              <button
                                onClick={() => handleReply(comment.id, comment.author)}
                                className="flex items-center gap-1 text-secondary hover:text-primary"
                              >
                                <FaReply className="w-4 h-4" />
                                <span>Reply</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {replyingTo === comment.id && (
                        <form
                          onSubmit={(e) => submitReply(e, comment.id)}
                          className="ml-4 sm:ml-14 mt-3"
                        >
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full p-4 rounded-lg bg-main border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary/50"
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
                          <div className="ml-4 sm:ml-14 w-px h-4 bg-border" />
                          <div className="ml-4 sm:ml-14 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="p-4 rounded-lg border border-border">
                                <div className="flex items-start gap-3">
                                  {reply.author === blogPost.author.name ? (
                                    <Image
                                      src={blogPost.author.image}
                                      alt={reply.author}
                                      width={40}
                                      height={40}
                                      className="rounded-full object-cover"
                                    />
                                  ) : reply.profileImage ? (
                                    <Image
                                      src={reply.profileImage}
                                      alt={reply.author}
                                      width={40}
                                      height={40}
                                      className="rounded-full object-cover"
                                    />
                                  ) : (
                                    <Image
                                      src="/icons/user.png"
                                      alt={reply.author}
                                      width={40}
                                      height={40}
                                      className="rounded-full object-cover"
                                    />
                                  )}
                                  <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                      <p className="font-medium text-primary">{reply.author}</p>
                                      <p className="text-secondary text-sm">{new Date(reply.date).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-primary mt-2">
                                    {reply.replyingTo && (
                                        <span className="text-accent font-medium">@{reply.replyingTo} </span>
                                    )}
                                      {reply.content}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <button
                                        onClick={() => handleReplyLike(comment.id, reply.id)}
                                        className={`text-secondary hover:text-red-500 text-sm flex items-center gap-1 transition-colors`}
                                      >
                                        <FiHeart className={`w-4 h-4 ${reply.liked ? 'fill-current text-red-500' : ''}`} />
                                        <span>{reply.likes || 0}</span>
                                      </button>
                                      <button
                                        onClick={() => handleReplyToReply(comment.id, reply.author)}
                                        className="flex items-center gap-1 text-secondary hover:text-primary"
                                      >
                                        <FaReply className="w-4 h-4" />
                                        <span>Reply</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {replyingToReply && replyingToReply.commentId === comment.id && (
                              <form
                                onSubmit={(e) => submitReplyToReply(e, comment.id)}
                                className="ml-0 mt-3"
                              >
                                <textarea
                                  value={replyToReplyText}
                                  onChange={(e) => setReplyToReplyText(e.target.value)}
                                  placeholder="Write a reply..."
                                  className="w-full p-4 rounded-lg bg-main border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary/50"
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
                                    onClick={() => {
                                      setReplyingToReply(null);
                                      setReplyToReplyText('');
                                    }}
                                    className="px-4 py-1.5 bg-border text-primary rounded-full hover:bg-opacity-90 text-sm"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {index < blogPost.comments.length - 1 && (
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
            {blogPost.relatedPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                className="card p-6 hover:transform hover:scale-105 transition-transform duration-300"
              >
                <Link href={`/blogpost/${post.id}`} className="block">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
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
                        On {new Date(post.publishDate).getDate()}, {new Date(post.publishDate).toLocaleString('default', { month: 'short' })}, {new Date(post.publishDate).getFullYear()}
                      </p>
                      <h3 className="text-primary font-semibold text-lg sm:text-xl uppercase tracking-wider mb-2 font-['Times_New_Roman']">{post.title}</h3>
                      <div className="border-b border-gray-300 dark:border-gray-600 my-2"></div>
                      <div className="flex flex-wrap items-center text-secondary text-xs sm:text-sm uppercase gap-y-2">
                        <span className="font-medium mr-4 text-primary">{post.category}</span>
                        <span className="hidden sm:inline text-secondary">|</span>
                        <span className="ml-0 sm:ml-4 flex items-center gap-1">
                          <FiMessageCircle className="text-base sm:text-lg" /> {post.comments}
                        </span>
                        <span className="mx-4 flex items-center gap-1">
                          <FiEye className="text-base sm:text-lg" /> {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiHeart className="text-base sm:text-lg" /> {post.likes}
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

export default BlogPost;