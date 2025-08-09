import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiMessageCircle, FiShare2, FiEye, FiClock, FiCalendar, FiTag, FiUser, FiBookOpen } from 'react-icons/fi';
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Layout from '../../components/layout';
import Head from 'next/head';

// Mock story data
const stories = {
  1: {
    id: 1,
    title: 'The Enchanted Forest',
    content: `
      <p>Deep within the heart of an ancient woodland, where sunlight filtered through emerald canopies and whispered secrets danced on the breeze, there existed a realm untouched by time. This was the Enchanted Forest, a place where magic still thrived and wonder awaited those brave enough to venture beyond the ordinary.</p>

      <p>As I stepped through the threshold of towering oaks, their bark etched with symbols of forgotten languages, I felt the familiar tingle of enchantment coursing through the air. The forest floor, carpeted with luminescent moss that glowed softly in the dappled light, seemed to pulse with an otherworldly energy.</p>

      <h2>The Guardian's Welcome</h2>

      <p>It was then that I encountered Elderoak, the ancient guardian of this mystical realm. His voice, like the rustling of a thousand leaves, spoke of centuries past and the delicate balance that kept this sanctuary alive. "Welcome, seeker of stories," he said, his eyes twinkling with the wisdom of ages. "You have come at the perfect time."</p>

      <p>The guardian explained that the forest was preparing for the Ceremony of Renewal, a once-in-a-decade event where all the magical creatures would gather to share their stories and renew the ancient pacts that protected their home.</p>

      <h2>Creatures of Wonder</h2>

      <p>As we ventured deeper into the forest, I witnessed marvels that defied explanation. Butterflies with wings like stained glass windows carried messages between the trees, while foxes with silver fur and knowing eyes served as guides for lost travelers.</p>

      <p>The most remarkable encounter was with the Storytelling Sprites – tiny beings no larger than my thumb, who wove tales of light and shadow in the air above us. Their stories took physical form, creating miniature theaters of glowing particles that danced and swirled with each plot twist.</p>

      <h2>The Heart of Magic</h2>

      <p>At the forest's heart stood the Great Library Tree, its hollow trunk containing scrolls and books that chronicled every story ever told within these woods. The librarian, a wise old owl named Athena, allowed me to read from the Chronicle of Beginnings – the very first story that gave birth to the forest's magic.</p>

      <p>As the sun began to set, painting the sky in shades of amber and rose, I realized that my time in the Enchanted Forest was drawing to a close. But the magic I had witnessed, the stories I had heard, and the wonder I had experienced would remain with me forever.</p>

      <p>The Enchanted Forest taught me that magic exists not just in the extraordinary, but in our willingness to believe, to wonder, and to see the world through eyes unclouded by cynicism. Sometimes, the most powerful magic is simply the courage to step into the unknown and embrace the stories waiting to be discovered.</p>
    `,
    excerpt: 'A journey through a magical forest filled with wonders and mysteries that will captivate your imagination.',
    genre: 'Fantasy',
    image: '/images/story.jpg',
    publishDate: '2024-01-15',
    readTime: '10 min',
    likes: 245,
    comments: 18,
    views: 567,
    tags: ['Fantasy', 'Magic', 'Adventure', 'Nature'],
    author: {
      name: 'Bernice Arthur',
      avatar: '/images/profile.jpeg',
      bio: 'Creative writer and storyteller passionate about fantasy and magical realism.'
    }
  },
  2: {
    id: 2,
    title: 'Urban Chronicles',
    content: `
      <p>The city never sleeps, they say, and in the heart of downtown where neon lights paint the night in electric blues and reds, I discovered that every street corner holds a story waiting to be told.</p>

      <p>It was 3 AM when I first noticed her – the woman in the red coat who appeared every night at the same bus stop, waiting for a bus that never came. Her story became the first thread in what would become my Urban Chronicles, a collection of tales from the concrete jungle where dreams and reality intertwine.</p>

      <h2>The Night Shift</h2>

      <p>Working the night shift at a 24-hour diner gave me a front-row seat to the city's hidden narratives. There was Marcus, the taxi driver who collected stories from his passengers and wrote them on napkins during his breaks. Each napkin became a window into someone's life – a first date, a job interview, a goodbye.</p>

      <p>Then there was Elena, the street artist who painted murals that seemed to change depending on who was looking at them. Her art told the stories of the neighborhood, capturing the hopes and struggles of people who called these streets home.</p>

      <h2>Voices in the Crowd</h2>

      <p>The subway platform at rush hour became my favorite observatory. Thousands of people, each carrying their own narrative, their own dreams and disappointments. I learned to read the stories written in tired eyes, hurried footsteps, and the way people held their phones like lifelines to somewhere else.</p>

      <p>One morning, I met an elderly man feeding pigeons near the fountain. He told me about the city as it used to be, when the buildings were shorter and the pace was slower. His memories became bridges between the past and present, showing how stories layer upon each other like sediment in the urban landscape.</p>

      <h2>The Rhythm of the Streets</h2>

      <p>Every city has its rhythm, and learning to move with it is like learning a new language. The morning rush, the lunch hour lull, the evening exodus – each phase brings its own cast of characters and its own collection of stories.</p>

      <p>I discovered that the city's true magic lies not in its towering skyscrapers or bustling markets, but in the human connections that happen in unexpected moments. A shared smile on a crowded elevator, a helping hand during a sudden rainstorm, a conversation with a stranger that changes your perspective.</p>

      <p>The Urban Chronicles taught me that every city is really a collection of villages, each with its own personality and stories. And sometimes, the most profound tales are found not in grand gestures, but in the quiet moments between the noise.</p>
    `,
    excerpt: 'Tales from the city streets, where every corner holds a story waiting to be told.',
    genre: 'Personal',
    image: '/images/bg1.jpg',
    publishDate: '2024-01-10',
    readTime: '8 min',
    likes: 189,
    comments: 12,
    views: 432,
    tags: ['Urban', 'Personal', 'City Life', 'Observation'],
    author: {
      name: 'Bernice Arthur',
      avatar: '/images/profile.jpeg',
      bio: 'Creative writer and storyteller passionate about urban narratives and human connections.'
    }
  }
};

const relatedStories = [
  {
    id: 3,
    title: 'The Last Adventure',
    excerpt: 'An epic journey to the ends of the earth in search of the unknown.',
    image: '/images/bg2.jpg',
    genre: 'Adventure'
  },
  {
    id: 4,
    title: 'Whispers in the Dark',
    excerpt: 'A mysterious tale that unfolds in the shadows of an ancient mansion.',
    image: '/images/bg3.jpg',
    genre: 'Mystery'
  }
];

const StoryPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      const storyData = stories[id];
      if (storyData) {
        setStory(storyData);
        setLikes(storyData.likes);
        // Mock comments
        setComments([
          {
            id: 1,
            author: 'Sarah Johnson',
            avatar: '/images/neosiam.jpg',
            content: 'This story transported me to another world! The imagery is absolutely beautiful.',
            date: '2 days ago',
            likes: 5
          },
          {
            id: 2,
            author: 'Michael Chen',
            avatar: '/images/minan.jpg',
            content: 'I love how you weave magic into everyday moments. Truly inspiring!',
            date: '1 day ago',
            likes: 3
          }
        ]);
      }
      setLoading(false);
    }
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing story: ${story.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
    }
    setShowShareMenu(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'You',
        avatar: '/images/profile.jpeg',
        content: newComment,
        date: 'Just now',
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-secondary">Loading story...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!story) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Story Not Found</h1>
            <Link href="/stories" className="text-accent hover:text-accent-hover">
              ← Back to Stories
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{story.title} | Bernice Arthur</title>
        <meta name="description" content={story.excerpt} />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/stories"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 pb-8 border-b border-border"
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium mb-4">
              {story.genre}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {story.title}
            </h1>
            <p className="text-xl text-secondary leading-relaxed">
              {story.excerpt}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-secondary mb-6">
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              <time>{new Date(story.publishDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</time>
            </div>
            <div className="flex items-center gap-2">
              <FiEye className="w-4 h-4" />
              <span>{story.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <FiBookOpen className="w-4 h-4" />
              <span>{story.genre}</span>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={story.author.avatar}
                alt={story.author.name}
                width={48}
                height={48}
                className="object-cover"
              />
              <div>
                <h3 className="font-semibold text-primary">{story.author.name}</h3>
                <p className="text-sm text-secondary">{story.author.bio}</p>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
                  liked 
                    ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-border text-secondary hover:text-primary hover:border-accent'
                }`}
              >
                <FiHeart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 border border-border text-secondary hover:text-primary hover:border-accent transition-colors"
                >
                  <FiShare2 className="w-4 h-4" />
                  Share
                </button>

                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 bg-main border border-border shadow-lg z-10 min-w-[200px]"
                    >
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-border transition-colors"
                      >
                        <FaTwitter className="w-4 h-4 text-blue-400" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-border transition-colors"
                      >
                        <FaFacebook className="w-4 h-4 text-blue-600" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-border transition-colors"
                      >
                        <FaLinkedin className="w-4 h-4 text-blue-700" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-border transition-colors"
                      >
                        <FaWhatsapp className="w-4 h-4 text-green-500" />
                        WhatsApp
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative h-[400px] md:h-[500px] bg-border">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 pb-8 border-b border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <FiTag className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-border text-secondary text-sm hover:bg-accent hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <FiMessageCircle className="w-6 h-6" />
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this story..."
              className="w-full p-4 border border-border bg-main text-primary resize-none focus:ring-2 focus:ring-accent focus:border-transparent"
              rows="4"
            />
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-white hover:bg-accent-hover transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border border-border p-6">
                <div className="flex items-start gap-4">
                  <Image
                    src={comment.avatar}
                    alt={comment.author}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-primary">{comment.author}</h4>
                      <span className="text-sm text-secondary">{comment.date}</span>
                    </div>
                    <p className="text-secondary mb-3">{comment.content}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-secondary hover:text-red-500 transition-colors">
                        <FiHeart className="w-4 h-4" />
                        {comment.likes}
                      </button>
                      <button className="text-secondary hover:text-primary transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Related Stories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Read Next</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedStories.map((relatedStory) => (
              <Link
                key={relatedStory.id}
                href={`/stories/${relatedStory.id}`}
                className="group border border-border hover:border-accent transition-colors"
              >
                <div className="relative h-48 bg-border">
                  <Image
                    src={relatedStory.image}
                    alt={relatedStory.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-accent text-white text-xs font-medium">
                      {relatedStory.genre}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {relatedStory.title}
                  </h3>
                  <p className="text-secondary">{relatedStory.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </article>
    </Layout>
  );
};

export default StoryPost;