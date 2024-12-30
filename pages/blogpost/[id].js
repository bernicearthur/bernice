import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRegHeart, FaHeart, FaRegComment, FaRegEye, FaShare, FaReply, FaUser } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
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
          date: '2023-10-02'
        }
      ]
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
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

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
                        <FaShare className="text-accent" /> Share Post
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
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-6 mb-8">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 text-secondary hover:text-accent"
                >
                  {isLiked ? (
                    <FaHeart className="text-accent" />
                  ) : (
                    <FaRegHeart />
                  )}
                  {blogPost.likes}
                </button>
                <div className="flex items-center gap-2 text-secondary">
                  <FaRegComment />
                  {blogPost.comments.length}
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <FaRegEye />
                  {blogPost.views}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-border/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-4">Comments</h3>
                <form onSubmit={handleComment} className="mb-6">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 rounded-lg bg-main border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary/50"
                    rows={3}
                  />
                  <button
                    type="submit"
                    className="mt-2 px-6 py-2 bg-accent text-white rounded-full hover:bg-opacity-90 transition-colors"
                  >
                    Post Comment
                  </button>
                </form>

                <div className="space-y-6">
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
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                                <FaUser className="text-secondary w-5 h-5" />
                              </div>
                            )}
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
                                    {reply.author === blogPost.author.name ? (
                                      <Image
                                        src={blogPost.author.image}
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
                      {index < blogPost.comments.length - 1 && (
                        <div className="w-full h-px bg-border my-6" />
                      )}
                    </div>
                  ))}
                </div>
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
                          <FaRegComment className="text-base sm:text-lg" /> {post.comments}
                        </span>
                        <span className="mx-4 flex items-center gap-1">
                          <FaRegEye className="text-base sm:text-lg" /> {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegHeart className="text-base sm:text-lg" /> {post.likes}
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