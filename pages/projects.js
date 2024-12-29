import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoreHorizontal, FiShare2 } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of Project One.',
    image: '/images/project.jpg',
    type: 'Archive',
  },
  // Add more projects as needed
];

const projectTypes = ['All', 'Archive'];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleShare = (project) => {
    // Add share functionality here
    console.log('Sharing project:', project.title);
    setOpenMenuId(null);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || project.type === selectedType;
    return matchesSearch && matchesType;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div 
      className="min-h-screen bg-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-primary mb-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Projects
        </motion.h1>
        <div className="w-24 border-b border-gray-300 dark:border-gray-600 my-3 mx-auto" />
        <motion.p 
          className="text-m text-secondary"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          See the ideas I've brought to life.
        </motion.p>
      </motion.div>

      {/* */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 flex-wrap">
            {projectTypes.map(type => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm ${selectedType === type ? 'bg-accent text-white' : 'bg-border text-primary hover:bg-accent hover:text-white'} transition-all`}
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
            className="w-full md:w-64 px-4 py-2 rounded-full border border-border bg-main text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Project Showcase */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-card-bg rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-72 object-cover rounded-t-2xl"
                    />
                    <motion.div
                      className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.type}
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <div className="relative">
                        <motion.button
                          className="p-1 rounded-full hover:bg-border"
                          onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiMoreHorizontal className="w-5 h-5 text-primary" />
                        </motion.button>
                        <AnimatePresence>
                          {openMenuId === project.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-48 bg-card-bg rounded-lg shadow-lg py-1 z-10"
                            >
                              <motion.button
                                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-border text-primary"
                                onClick={() => handleShare(project)}
                                whileHover={{ x: 2 }}
                              >
                                <FiShare2 className="w-4 h-4" />
                                <span>Share Project</span>
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex justify-center">
                      <motion.button
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-8 rounded-full text-sm font-medium transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Project
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
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
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default ProjectsPage;
