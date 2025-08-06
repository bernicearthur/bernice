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
        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse mr-2" />
              {blogPost.category}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            {/* Author Info */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Image
                src={blogPost.author.image}
                alt={blogPost.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="text-primary font-medium">{blogPost.author.name}</p>
                <div className="flex items-center text-secondary text-sm gap-2">
                  <span>{new Date(blogPost.publishDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{blogPost.readTime} read</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card-bg border border-border rounded-2xl p-8 mb-8"
          >
            {/* Blog Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Share Section */}
            <div className="flex items-center justify-between pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <span className="text-secondary text-sm">Share this article:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-full bg-border hover:bg-accent hover:text-white transition-colors"
                  >
                    <FiTwitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-full bg-border hover:bg-accent hover:text-white transition-colors"
                  >
                    <FiFacebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-full bg-border hover:bg-accent hover:text-white transition-colors"
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="p-2 rounded-full bg-border hover:bg-accent hover:text-white transition-colors"
                  >
                    <FiLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  liked 
                    ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-border text-secondary hover:text-red-500 hover:border-red-500'
                }`}
              >
                <FiHeart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span>{blogPost.likes + (liked ? 1 : 0)}</span>
              </button>
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card-bg border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Comments</h3>
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                {blogPost.comments.length}
              </span>
            </div>
            
              <form onSubmit={handleComment} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 rounded-xl bg-main border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary/50 resize-none"
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-3 px-6 py-2 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors"
                >
                  Post Comment
                </button>
              </form>

              <div className="space-y-6 flex-grow">
                {blogPost.comments.map((comment, index) => (
                  <div key={comment.id}>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border border-border">
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
                            className="w-full p-4 rounded-xl bg-main border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary/50"
                            rows={2}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              type="submit"
                              className="px-4 py-1.5 bg-accent text-white rounded-xl hover:bg-accent-hover text-sm"
                            >
                              Post Reply
                            </button>
                            <button
                              type="button"
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-1.5 bg-border text-primary rounded-xl hover:bg-opacity-90 text-sm"
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
                              <div key={reply.id} className="p-4 rounded-xl border border-border">
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
                                  className="w-full p-4 rounded-xl bg-main border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary/50"
                                  rows={2}
                                />
                                <div className="flex gap-2 mt-2">
                                  <button
                                    type="submit"
                                    className="px-4 py-1.5 bg-accent text-white rounded-xl hover:bg-accent-hover text-sm"
                                  >
                                    Post Reply
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setReplyingToReply(null);
                                      setReplyToReplyText('');
                                    }}
                                    className="px-4 py-1.5 bg-border text-primary rounded-xl hover:bg-opacity-90 text-sm"
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
          </motion.div>
        </div>

        {/* Read Next Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Read Next</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {blogPost.relatedPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                className="bg-card-bg border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-accent/30"
              >
                <Link href={`/blogpost/${post.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-secondary text-sm mb-3">
                      <time>{new Date(post.publishDate).toLocaleDateString()}</time>
                      <span className="mx-2">•</span>
                      <span>{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-secondary">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <FiHeart className="w-4 h-4" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMessageCircle className="w-4 h-4" /> {post.comments}
                        </span>
                      </div>
                      <span className="text-accent font-medium">Read more →</span>
                    </div>
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