import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiGrid, FiList, FiGithub, FiExternalLink, FiHeart, FiEye, FiAward, FiUsers, FiTrendingUp, FiActivity, FiMapPin } from 'react-icons/fi';

const projectTypes = ['All', 'Archive', 'Platform', 'Documentation'];

const ITEMS_PER_PAGE = 6;

const ArchiveCard = ({ project, viewMode, onProjectClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group relative bg-gradient-to-br from-card-bg via-card-bg to-accent/5 rounded-2xl shadow-lg overflow-hidden 
        border border-white/[0.05] dark:border-white/[0.02] backdrop-blur-sm ${
        viewMode === 'list' ? 'flex' : ''
      }`}
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

      <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
        <div className="relative h-64 overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
              transition: { duration: 0.6 }
            }}
            className="relative h-full"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>

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

      <div className={`p-6 relative ${viewMode === 'list' ? 'w-2/3' : ''}`}>
        {/* Title and Impact */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-primary bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
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

        {/* Highlights */}
        <div className="space-y-2 mb-6">
          {project.highlights?.map((highlight, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 text-sm text-secondary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {highlight}
            </motion.div>
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
  const [viewMode, setViewMode] = useState('grid');

  const handleProjectClick = (projectId) => {
    router.push(`/projectpost/${projectId}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
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
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <motion.div 
      className="min-h-screen bg-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-accent/20 via-purple-500/20 to-accent/20"
          animate={{
            x: ['0%', '-100%'],
            transition: {
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/10 to-accent/10"
          animate={{
            x: ['100%', '0%'],
            transition: {
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }
          }}
        />
        <div className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
            >
              {Array.from({ length: 64 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-full h-full bg-accent rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
            <motion.h1 
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent relative z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Creative Works
            </motion.h1>
            <motion.p 
              className="text-xl text-secondary max-w-2xl mx-auto relative z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Explore my portfolio of innovative digital experiences, interactive archives, and experimental projects.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              <motion.input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-border bg-card-bg text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-accent text-white' : 'bg-card-bg text-secondary hover:text-primary'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGrid className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-card-bg text-secondary hover:text-primary'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiList className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-full border border-border bg-card-bg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {projectTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : (
          <motion.div 
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
            }
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {currentProjects.length > 0 ? (
                currentProjects.map((project) => (
                  <ArchiveCard
                    key={project.id}
                    project={project}
                    viewMode={viewMode}
                    onProjectClick={handleProjectClick}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-xl text-secondary">No projects found matching your criteria.</p>
                  <p className="text-sm text-secondary mt-2">Try adjusting your search or filter settings.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {filteredProjects.length > ITEMS_PER_PAGE && (
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default ProjectsPage;
