import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiSearch, FiGrid, FiList, FiGithub, FiExternalLink, FiHeart, FiEye, FiAward, FiUsers, FiTrendingUp, FiActivity, FiMapPin } from 'react-icons/fi';

const projectTypes = ['All', 'Archive', 'Platform', 'Documentation'];

const ITEMS_PER_PAGE = 6;

const ArchiveCard = ({ project, onProjectClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (project.images && project.images.length > 1) {
      const randomInterval = Math.floor(Math.random() * (10000 - 5000 + 1) + 5000); // Random time between 5-10 seconds
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, randomInterval);
    }
    return () => clearInterval(interval);
  }, [project.images]);

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-card-bg via-card-bg to-accent/5 rounded-2xl shadow-lg overflow-hidden 
        border border-white/[0.05] dark:border-white/[0.02] backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full -ml-12 -mb-12 blur-2xl" />

      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="relative h-full"
            >
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Image Navigation Dots */}
          {project.images && project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
              {project.images.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          )}

          {/* Status Badge */}
          <motion.div 
            className="absolute top-4 right-4 backdrop-blur-md bg-white/10 rounded-full p-1 pr-3 flex items-center gap-2 border border-white/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className={`w-2 h-2 rounded-full ${
              project.status === 'live' ? 'bg-green-400' :
              project.status === 'beta' ? 'bg-yellow-400' :
              'bg-purple-400'
            }`} />
            <span className="text-xs text-white font-medium">{project.type}</span>
          </motion.div>

          {/* Region Badge */}
          <motion.div 
            className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm text-white/90 text-sm 
              flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <FiMapPin className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">{project.location}</span>
          </motion.div>

          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FiAward className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Featured</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="p-6 relative">
        {/* Title and Impact */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-black dark:text-white">
            {project.title}
          </h3>
          {project.impact?.communityEngagement === 'growing' && (
            <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              <FiUsers className="w-4 h-4" />
              <span className="text-xs font-medium">Active</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-secondary line-clamp-2 mb-6">{project.description}</p>

        {/* Methods Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.methods?.map((method, index) => (
            <motion.span 
              key={index}
              className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20 hover:bg-accent/20 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {method}
            </motion.span>
          ))}
        </div>

        {/* Stats and Action */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-1.5 text-secondary bg-secondary/5 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <FiHeart className="w-4 h-4" />
              <span className="text-sm font-medium">{project.likes}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1.5 text-secondary bg-secondary/5 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <FiEye className="w-4 h-4" />
              <span className="text-sm font-medium">{project.views}</span>
            </motion.div>
          </div>
          <motion.button
            onClick={() => onProjectClick(project.id)}
            className="relative group/button bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-full text-sm font-medium transition-colors overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore</span>
            <motion.div 
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>

        {/* Recognition */}
        {project.recognition && project.recognition.length > 0 && (
          <motion.div 
            className="mt-6 pt-4 border-t border-border/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap gap-4">
              {project.recognition.map((award, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 text-xs bg-accent/5 text-accent px-3 py-1.5 rounded-full"
                >
                  <FiAward className="w-4 h-4" />
                  {award.title}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { scrollY } = useScroll();
  const [timeBasedGradient, setTimeBasedGradient] = useState('');

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  // Parallax effect for hero section
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const titleY = useTransform(scrollY, [0, 300], [0, 100]);

  // Dynamic background gradient based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeBasedGradient('from-orange-400/20 via-yellow-300/10 to-transparent'); // Morning
    } else if (hour >= 12 && hour < 17) {
      setTimeBasedGradient('from-blue-400/20 via-cyan-300/10 to-transparent'); // Afternoon
    } else if (hour >= 17 && hour < 20) {
      setTimeBasedGradient('from-purple-400/20 via-pink-300/10 to-transparent'); // Evening
    } else {
      setTimeBasedGradient('from-indigo-400/20 via-purple-300/10 to-transparent'); // Night
    }
  }, []);

  const handleProjectClick = (projectId) => {
    router.push(`/projectpost/${projectId}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulated API response with example projects
        const exampleProjects = [
          {
            id: 1,
            title: "Cultural Heritage Archive",
            description: "A comprehensive digital archive preserving the cultural heritage of indigenous communities through interactive storytelling and modern preservation techniques.",
            type: "Archive",
            status: "live",
            location: "Kumasi",
            featured: true,
            images: [
              "/images/projecthero.jpg",
              "/images/projectbackground.jpg",
              "/images/bg1.jpg"
            ],
            methods: ["Digital Preservation", "Oral History", "Interactive Mapping"],
            impact: { communityEngagement: "growing" },
            likes: 234,
            views: 1200
          },
          {
            id: 2,
            title: "Indigenous Knowledge Platform",
            description: "A collaborative platform for sharing and preserving indigenous knowledge systems, focusing on traditional practices and cultural wisdom.",
            type: "Platform",
            status: "beta",
            location: "Tamale",
            featured: false,
            images: [
              "/images/bg2.jpg",
              "/images/bg3.jpg",
              "/images/story.jpg"
            ],
            methods: ["Knowledge Management", "Community Engagement", "Digital Storytelling"],
            likes: 189,
            views: 890
          },
          {
            id: 3,
            title: "Cultural Documentation System",
            description: "Advanced system for documenting and preserving cultural practices and traditions of local communities using modern technology.",
            type: "Documentation",
            status: "live",
            location: "Cape Coast",
            featured: true,
            images: [
              "/images/story.jpg",
              "/images/projecthero.jpg",
              "/images/bg2.jpg"
            ],
            methods: ["Video Documentation", "Audio Recording", "Cultural Mapping"],
            impact: { communityEngagement: "growing" },
            likes: 312,
            views: 1500
          }
        ];
        setProjects(exampleProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || project.type === selectedType;
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    // Sort featured projects first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <motion.div 
      className="min-h-screen bg-main"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      
      {/* Interactive Hero Section */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className={`relative bg-gradient-to-b ${timeBasedGradient} py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden`}
        variants={itemVariants}
      >
        <motion.div
          style={{ y: titleY }}
          className="relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-6"
          >
            <FiGrid className="mx-auto text-6xl text-accent" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-black dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Disappearing Cultures
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Explore my portfolio of innovative digital experiences, interactive archives, and experimental projects.
          </motion.p>
        </motion.div>

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 100 - 50 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1
              }}
              animate={{
                y: [null, '-100%'],
                opacity: [null, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {i % 3 === 0 ? '💻' : i % 3 === 1 ? '🎨' : '⚡'}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={itemVariants}
      >
        {/* Enhanced Filters Section */}
        <div className="w-full">
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex gap-2 flex-wrap w-full justify-center md:justify-start">
              {projectTypes.map(type => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
                    selectedType === type 
                      ? 'bg-accent text-white' 
                      : 'bg-border text-primary hover:bg-accent hover:text-white'
                  } transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
            <motion.input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-full bg-border text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loader"
                  className="col-span-full flex justify-center items-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-accent rounded-full animate-spin border-t-transparent"></div>
                  </div>
                </motion.div>
              ) : currentProjects.length > 0 ? (
                currentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <ArchiveCard
                      project={project}
                      onProjectClick={handleProjectClick}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="no-results"
                  className="col-span-full text-center py-12"
                  variants={itemVariants}
                >
                  <p className="text-xl text-secondary">No projects found matching your criteria.</p>
                  <p className="text-sm text-secondary mt-2">Try adjusting your search or filter settings.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {filteredProjects.length > ITEMS_PER_PAGE && (
            <motion.div 
              className="mt-12 flex justify-center"
              variants={itemVariants}
            >
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? 'bg-accent text-white'
                        : 'bg-card-bg text-secondary hover:text-primary'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default ProjectsPage;
