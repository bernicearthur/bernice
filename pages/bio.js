import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiInstagram, FiFacebook, FiChevronDown } from 'react-icons/fi';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function About() {
  const scrollToFooter = () => {
    document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-main">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src="/images/neosiam.jpg"
          alt="Bernice Arthur"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center sm:items-start sm:justify-end max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 text-white text-center sm:text-left">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Bernice Arthur
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Writer | Storyteller | Archiver
          </motion.p>
          <motion.button
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => window.location.href = 'mailto:bernice.arthur@gmail.com'}
            className="mt-6 px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-full font-medium transition-colors duration-300 cursor-pointer"
          >
            Available for Freelance
          </motion.button>
        </div>
        
        {/* Scroll Down Icon */}
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={scrollToFooter}
        >
          <FiChevronDown className="w-8 h-8 text-white hover:text-accent transition-colors duration-300" />
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Biography Section */}
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8 flex flex-col items-center text-center max-w-4xl mx-auto"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-primary mb-6">About Me</h2>
                <p className="text-secondary">
                  I am Bernice Arthur, a passionate writer and storyteller with a deep love for crafting compelling narratives. 
                  My journey in the world of writing began [Your Story Here], and since then, I've dedicated myself to creating 
                  content that resonates with readers and leaves a lasting impact.
                </p>
                <p className="text-secondary mt-4">
                  With expertise in [Your Areas of Expertise], I bring a unique perspective to every project. 
                  My work spans across various genres and formats, from short stories to comprehensive blog posts, 
                  always aiming to engage and inspire my audience.
                </p>
              </div>

              {/* Skills Section */}
              <div className="mt-24 w-full">
                <h3 className="text-2xl font-bold text-primary mt-8 mb-16 text-center">
                  Skills & Expertise
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {[
                    {
                      skill: "Creative Writing",
                      icon: "✍️",
                      description: "Crafting engaging narratives and stories",
                    },
                    {
                      skill: "Content Strategy",
                      icon: "📊",
                      description: "Planning and executing content campaigns",
                    },
                    {
                      skill: "Story Development",
                      icon: "📚",
                      description: "Building compelling plot and character arcs",
                    },
                    {
                      skill: "Editorial Writing",
                      icon: "📝",
                      description: "Creating polished, professional content",
                    },
                    {
                      skill: "Research & Analysis",
                      icon: "🔍",
                      description: "In-depth research and fact-finding",
                    },
                    {
                      skill: "Digital Publishing",
                      icon: "💻",
                      description: "Modern digital content distribution",
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.skill}
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1
                      }}
                      whileHover={{ y: -5 }}
                      className="relative group"
                    >
                      <div className="card p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          {/* Background Circle */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="60"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="8"
                              className="text-border"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                              cx="64"
                              cy="64"
                              r="60"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="8"
                              className="text-accent"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 0.85 }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              style={{
                                strokeDasharray: "400",
                                strokeDashoffset: "400"
                              }}
                            />
                          </svg>
                          {/* Icon */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-5xl mb-1" role="img" aria-label={item.skill}>
                              {item.icon}
                            </span>
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-primary text-lg mb-2">{item.skill}</h4>
                          <p className="text-secondary text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-24 w-full">
                <h3 className="text-2xl font-bold text-primary mb-16 text-center">Connect With Me</h3>
                <div className="flex flex-col items-center">
                  <div className="flex space-x-8 mb-6">
                    <a
                      href="https://instagram.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-accent transition-all duration-300 transform hover:scale-110"
                      aria-label="Instagram"
                    >
                      <FiInstagram className="w-7 h-7" />
                    </a>
                    <a
                      href="https://facebook.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-accent transition-all duration-300 transform hover:scale-110"
                      aria-label="Facebook"
                    >
                      <FiFacebook className="w-7 h-7" />
                    </a>
                    <a
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-accent transition-all duration-300 transform hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <FiLinkedin className="w-7 h-7" />
                    </a>
                  </div>
                  <p className="text-secondary text-center font-medium">
                    Get in touch:{' '}
                    <a 
                      href="mailto:bernice.arthur@gmail.com" 
                      className="text-accent hover:text-accent-hover transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent-hover after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                      bernice.arthur@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
