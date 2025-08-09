import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiHeart, 
  FiMessageCircle, 
  FiShare2, 
  FiEye, 
  FiCalendar, 
  FiMapPin, 
  FiUsers, 
  FiAward,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiPlay,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Layout from '../../components/layout';
import Head from 'next/head';

// Mock project data
const projects = {
  1: {
    id: 1,
    title: "Cultural Heritage Archive",
    description: `
      <p>The Cultural Heritage Archive represents a groundbreaking initiative to preserve and digitize the rich cultural heritage of indigenous communities across Ghana. This comprehensive project combines cutting-edge technology with traditional storytelling methods to create an interactive, accessible repository of cultural knowledge.</p>

      <h2>Project Overview</h2>

      <p>Our mission was to create a digital sanctuary where traditional practices, oral histories, and cultural artifacts could be preserved for future generations. Working closely with community elders and cultural practitioners, we developed a platform that respects traditional knowledge while making it accessible through modern technology.</p>

      <p>The archive includes over 500 hours of recorded oral histories, 2,000 digitized artifacts, and interactive maps showing the geographical distribution of various cultural practices across different regions.</p>

      <h2>Methodology and Approach</h2>

      <p>We employed a community-centered approach, ensuring that local voices remained at the forefront of the project. Our team worked with traditional storytellers, historians, and community leaders to gather authentic narratives and ensure cultural sensitivity throughout the process.</p>

      <p>The technical infrastructure was built using modern web technologies, including React for the frontend, Node.js for the backend, and MongoDB for data storage. We also implemented advanced search capabilities and multilingual support to make the archive accessible to diverse audiences.</p>

      <h2>Impact and Recognition</h2>

      <p>Since its launch, the Cultural Heritage Archive has become a vital resource for researchers, educators, and community members. The project has been recognized by UNESCO and has received funding from the Ghana Heritage Foundation for expansion into additional regions.</p>

      <p>The archive has facilitated over 50 educational programs in local schools and has been instrumental in preserving languages and traditions that were at risk of being lost. Community engagement has grown by 300% since the project's inception.</p>

      <h2>Future Developments</h2>

      <p>We are currently working on Phase 2 of the project, which will include virtual reality experiences, mobile applications for offline access, and expanded coverage to include communities from neighboring countries. The goal is to create a pan-African cultural heritage network.</p>
    `,
    excerpt: "A comprehensive digital archive preserving the cultural heritage of indigenous communities through interactive storytelling and modern preservation techniques.",
    type: "Archive",
    status: "active",
    location: "Kumasi, Ghana",
    featured: true,
    images: [
      "/images/projecthero.jpg",
      "/images/projectbackground.jpg",
      "/images/bg1.jpg",
      "/images/bg2.jpg"
    ],
    publishDate: "2023-06-15",
    completionDate: null,
    duration: "18 months (ongoing)",
    teamSize: 8,
    budget: "$75,000",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "WebRTC", "D3.js"],
    methods: ["Digital Preservation", "Oral History", "Interactive Mapping", "Community Engagement"],
    links: {
      live: "https://heritage-archive.example.com",
      github: "https://github.com/example/heritage-archive",
      documentation: "https://docs.heritage-archive.example.com"
    },
    recognition: [
      {
        title: "UNESCO Digital Heritage Award",
        year: "2023",
        description: "Recognized for outstanding contribution to digital heritage preservation"
      },
      {
        title: "Ghana Innovation Prize",
        year: "2023",
        description: "Winner in the Cultural Technology category"
      }
    ],
    impact: {
      communities: 12,
      artifacts: 2000,
      hours: 500,
      users: 15000,
      engagement: "300% increase"
    },
    testimonials: [
      {
        name: "Dr. Kwame Asante",
        role: "Cultural Historian, University of Ghana",
        content: "This archive is a treasure trove of our cultural heritage. It's making our traditions accessible to young people in ways we never imagined possible."
      },
      {
        name: "Nana Akosua Manu",
        role: "Traditional Leader, Ashanti Region",
        content: "The respectful way this project has been conducted gives me confidence that our stories are in good hands for future generations."
      }
    ],
    challenges: [
      "Ensuring cultural sensitivity and community ownership",
      "Technical challenges in digitizing fragile artifacts",
      "Language barriers and translation accuracy",
      "Sustainable funding for long-term maintenance"
    ],
    lessons: [
      "Community involvement is crucial from day one",
      "Technology should serve culture, not dominate it",
      "Patience and respect are essential when working with traditional knowledge",
      "Collaboration with local institutions ensures project sustainability"
    ]
  },
  2: {
    id: 2,
    title: "Indigenous Knowledge Platform",
    description: `
      <p>The Indigenous Knowledge Platform is a collaborative digital space designed to facilitate the sharing and preservation of traditional knowledge systems across multiple communities in Northern Ghana. This platform serves as both a repository and an active learning environment where community members can contribute, access, and interact with cultural resources.</p>

      <h2>Vision and Mission</h2>

      <p>Our vision was to create a living platform that grows with the community, allowing for continuous contribution and evolution of knowledge. Unlike static archives, this platform encourages active participation and knowledge exchange between generations.</p>

      <p>The platform features user-generated content capabilities, discussion forums, and collaborative editing tools that allow community members to add their own stories, correct information, and provide additional context to existing entries.</p>

      <h2>Technical Innovation</h2>

      <p>Built on a modern microservices architecture, the platform can handle multiple languages, various media types, and complex relationships between different pieces of knowledge. We implemented blockchain technology to ensure the authenticity and ownership of contributed content.</p>

      <p>The platform includes advanced features such as semantic search, AI-powered content recommendations, and automated transcription services for audio content in local languages.</p>

      <h2>Community Impact</h2>

      <p>Since its completion, the platform has become a central hub for cultural education in the region. Over 200 community members have become active contributors, and the platform hosts monthly virtual gatherings where elders share knowledge with younger generations.</p>

      <p>The platform has been instrumental in revitalizing interest in traditional practices among young people, with a 250% increase in participation in cultural activities reported by partner communities.</p>
    `,
    excerpt: "A collaborative platform for sharing and preserving indigenous knowledge systems, focusing on traditional practices and cultural wisdom.",
    type: "Platform",
    status: "completed",
    location: "Tamale, Ghana",
    featured: false,
    images: [
      "/images/bg2.jpg",
      "/images/bg3.jpg",
      "/images/story.jpg",
      "/images/bg1.jpg"
    ],
    publishDate: "2022-03-20",
    completionDate: "2023-09-15",
    duration: "18 months",
    teamSize: 6,
    budget: "$45,000",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Blockchain", "AI/ML", "WebRTC"],
    methods: ["Knowledge Management", "Community Engagement", "Digital Storytelling", "Collaborative Design"],
    links: {
      live: "https://indigenous-knowledge.example.com",
      github: "https://github.com/example/indigenous-platform",
      case_study: "https://case-study.example.com"
    },
    recognition: [
      {
        title: "African Digital Innovation Award",
        year: "2023",
        description: "Best Community-Driven Platform"
      }
    ],
    impact: {
      communities: 8,
      contributors: 200,
      knowledge_entries: 1500,
      monthly_users: 5000,
      engagement: "250% increase in cultural activities"
    }
  }
};

const relatedProjects = [
  {
    id: 3,
    title: 'Cultural Documentation System',
    excerpt: 'Advanced system for documenting and preserving cultural practices and traditions.',
    image: '/images/story.jpg',
    type: 'Documentation'
  },
  {
    id: 4,
    title: 'Traditional Music Archive',
    excerpt: 'Digital repository of traditional music and dance performances.',
    image: '/images/bg3.jpg',
    type: 'Archive'
  }
];

const ProjectPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      const projectData = projects[id];
      if (projectData) {
        setProject(projectData);
        setLikes(Math.floor(Math.random() * 100) + 50); // Mock likes
        // Mock comments
        setComments([
          {
            id: 1,
            author: 'Dr. Sarah Wilson',
            avatar: '/images/neosiam.jpg',
            content: 'This project is making a real difference in preserving our cultural heritage. Excellent work!',
            date: '3 days ago',
            likes: 8
          },
          {
            id: 2,
            author: 'James Osei',
            avatar: '/images/minan.jpg',
            content: 'As someone from the community, I appreciate how respectfully this was handled. Thank you!',
            date: '2 days ago',
            likes: 12
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
    const text = `Check out this amazing project: ${project.title}`;
    
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-secondary">Loading project...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Project Not Found</h1>
            <Link href="/archives" className="text-accent hover:text-accent-hover">
              ← Back to Archives
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{project.title} | Bernice Arthur</title>
        <meta name="description" content={project.excerpt} />
      </Head>

      <article className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/archives"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Archives
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 pb-8 border-b border-border"
        >
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium">
                {project.type}
              </span>
              <div className={`flex items-center gap-2 px-3 py-1 text-sm font-medium ${
                project.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                project.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  project.status === 'active' ? 'bg-green-500' :
                  project.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                }`} />
                {project.status === 'active' ? 'Active' : 
                 project.status === 'completed' ? 'Completed' : 'On Hold'}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-secondary leading-relaxed">
              {project.excerpt}
            </p>
          </div>

          {/* Project Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <FiMapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary">
              <FiCalendar className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary">
              <FiUsers className="w-4 h-4" />
              <span>{project.teamSize} team members</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary">
              <FiEye className="w-4 h-4" />
              <span>{Math.floor(Math.random() * 1000) + 500} views</span>
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center justify-between">
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
                      className="absolute left-0 top-full mt-2 bg-main border border-border shadow-lg z-10 min-w-[200px]"
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

            {/* Project Links */}
            <div className="flex items-center gap-2">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white hover:bg-accent-hover transition-colors"
                >
                  <FiGlobe className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-border text-secondary hover:text-primary hover:border-accent transition-colors"
                >
                  <FiGithub className="w-4 h-4" />
                  Code
                </a>
              )}
            </div>
          </div>
        </motion.header>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative h-[400px] md:h-[600px] bg-border mb-4">
            <Image
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {project.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 transition-colors ${
                    currentImageIndex === index ? 'border-accent' : 'border-border'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />

            {/* Recognition */}
            {project.recognition && project.recognition.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <FiAward className="w-6 h-6" />
                  Recognition & Awards
                </h2>
                <div className="space-y-4">
                  {project.recognition.map((award, index) => (
                    <div key={index} className="border border-border p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                          <FiAward className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-bold text-primary mb-1">{award.title}</h3>
                          <p className="text-sm text-secondary mb-2">{award.year}</p>
                          <p className="text-secondary">{award.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

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
                  placeholder="Share your thoughts about this project..."
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-border p-6 mb-8"
            >
              <h3 className="text-lg font-bold text-primary mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-secondary">Duration</span>
                  <p className="font-medium text-primary">{project.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-secondary">Team Size</span>
                  <p className="font-medium text-primary">{project.teamSize} members</p>
                </div>
                <div>
                  <span className="text-sm text-secondary">Budget</span>
                  <p className="font-medium text-primary">{project.budget}</p>
                </div>
                <div>
                  <span className="text-sm text-secondary">Status</span>
                  <p className={`font-medium capitalize ${
                    project.status === 'active' ? 'text-green-600' :
                    project.status === 'completed' ? 'text-blue-600' : 'text-yellow-600'
                  }`}>
                    {project.status}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-border p-6 mb-8"
            >
              <h3 className="text-lg font-bold text-primary mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border border-border p-6 mb-8"
            >
              <h3 className="text-lg font-bold text-primary mb-4">Methods & Approaches</h3>
              <div className="space-y-2">
                {project.methods.map((method, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent"></div>
                    <span className="text-secondary">{method}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Impact Metrics */}
            {project.impact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="border border-border p-6 mb-8"
              >
                <h3 className="text-lg font-bold text-primary mb-4">Impact Metrics</h3>
                <div className="space-y-3">
                  {Object.entries(project.impact).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-secondary capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-medium text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Related Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.id}
                href={`/projectpost/${relatedProject.id}`}
                className="group border border-border hover:border-accent transition-colors"
              >
                <div className="relative h-48 bg-border">
                  <Image
                    src={relatedProject.image}
                    alt={relatedProject.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-accent text-white text-xs font-medium">
                      {relatedProject.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-secondary">{relatedProject.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </article>
    </Layout>
  );
};

export default ProjectPost;