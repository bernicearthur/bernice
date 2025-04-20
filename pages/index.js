import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout';
import { useState, useEffect, useMemo } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FiLinkedin, FiInstagram } from 'react-icons/fi';
import Image from 'next/image';

const heroItems = [
  { title: "Writer" },
  { title: "Digital Archivist" },
  { title: "Storyteller" }
];

const projects = [
  {
    id: 1,
    title: 'Digital Archive Project',
    description: 'A comprehensive digital archiving system for preserving cultural heritage.',
    image: '/images/vintage.jpg',
    type: 'Archive',
  },
  {
    id: 2,
    title: 'Story Collection Platform',
    description: 'An interactive platform for collecting and sharing community stories.',
    image: '/images/bg10.jpg',
    type: 'Platform',
  },
  {
    id: 3,
    title: 'Historical Documentation',
    description: 'Documenting and preserving historical events through multimedia.',
    image: '/images/bg12.jpg',
    type: 'Documentation',
  },
];

const stories = [
  {
    id: 1,
    title: 'The Lost Archives',
    description: 'A journey through forgotten historical documents and their significance.',
    genre: 'Personal',
    image: '/images/bg3.jpg',
  },
  {
    id: 2,
    title: 'Voices of the Past',
    description: 'Collection of oral histories from community elders.',
    genre: 'Documentary',
    image: '/images/bg5.jpg',
  },
  {
    id: 3,
    title: 'Digital Preservation',
    description: 'The importance of preserving digital content for future generations.',
    genre: 'Educational',
    image: '/images/bg8.jpg',
  },
];

// Separate animation variants for text transitions
const textVariants = {
  enter: {
    opacity: 0,
    y: 20,
    position: 'absolute',
  },
  center: {
    opacity: 1,
    y: 0,
    position: 'absolute',
  },
  exit: {
    opacity: 0,
    y: -20,
    position: 'absolute',
  },
};

export default function Home() {
  const [currentHeroItem, setCurrentHeroItem] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('journey');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentHeroItem((prev) => (prev + 1) % heroItems.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Add window size state to handle responsive animations
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-calculate floating element positions
  const floatingElements = useMemo(() => {
    return [...Array(5)].map((_, i) => ({
      width: 20 + i * 10,
      height: 20 + i * 10,
      initialX: typeof window !== 'undefined' ? Math.random() * ((windowSize.width * 0.8) || 0) : 0,
      initialY: typeof window !== 'undefined' ? Math.random() * ((windowSize.height * 0.8) || 0) : 0,
      animationDuration: 15 + i * 5,
      xOffset: Math.random() * 100 - 50, // Random value between -50 and 50
      yOffset: Math.random() * 100 - 50, // Random value between -50 and 50
    }));
  }, [windowSize]);

  return (
    <Layout>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/20 via-main/20 to-accent-hover/20 dark:from-accent/5 dark:via-main/5 dark:to-accent-hover/5">
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute w-full h-full pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, var(--gradient-orb-color) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, var(--gradient-orb-color) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, var(--gradient-orb-color) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, var(--gradient-orb-color) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, var(--gradient-orb-color) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              '--gradient-orb-color': 'rgba(var(--accent-rgb), 0.15)'
            }}
          />
        </div>

        {/* Floating Elements */}
        {floatingElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/20 dark:bg-accent/10 backdrop-blur-sm pointer-events-none"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              boxShadow: '0 4px 12px rgba(var(--accent-rgb), 0.15)',
            }}
            initial={{
              x: element.initialX,
              y: element.initialY,
            }}
            animate={{
              y: [
                element.initialY,
                element.initialY + element.yOffset,
                element.initialY - element.yOffset,
                element.initialY,
              ],
              x: [
                element.initialX,
                element.initialX - element.xOffset,
                element.initialX + element.xOffset,
                element.initialX,
              ],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: element.animationDuration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              times: [0, 0.33, 0.66, 1]
            }}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-main/30 via-main/50 to-main/80 dark:from-main/10 dark:via-main/30 dark:to-main/60" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 md:pt-20 overflow-hidden">
          {/* Hero Section */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Column - Text Content */}
              <motion.div 
                className="md:w-1/2 text-center md:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.p
                  className="text-accent mb-4 font-medium tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    WELCOME TO MY PORTFOLIO
                  </span>
                </motion.p>

                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                >
                  <span className="inline-block">
                    Hi, I'm{' '}
                    <span className="bg-gradient-to-r from-accent to-purple-500 text-transparent bg-clip-text">
                      Bernice Arthur
                    </span>
                  </span>
                </motion.h3>

                {/* Fixed height container for hero items */}
                <div className="h-16 relative">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentHeroItem}
                      variants={textVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                      className="w-full text-center md:text-left"
                    >
                      <div className="text-2xl text-primary/90 font-light">
                        {heroItems[currentHeroItem].title}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.p
                  className="text-secondary text-lg mb-8 max-w-lg mx-auto md:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  A creative writer and digital storyteller passionate about crafting immersive narratives that inspire and connect with audiences worldwide.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center md:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link 
                    href="/projects" 
                    className="w-40 sm:w-auto px-4 sm:px-8 py-2 sm:py-3 bg-accent hover:bg-accent-hover text-white rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group text-sm sm:text-base"
                  >
                    <span>Explore My Work</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - Profile Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:flex-1 relative perspective-1000 mt-12 lg:mt-0 flex items-center justify-center"
              >
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
                  {/* Animated Rings with 3D Effect */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20 transform-gpu"
                  />
                    <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border-2 border-dashed border-accent/30 transform-gpu"
                  />
                  
                  {/* Profile Image Container with 3D Hover Effect */}
                    <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full p-4 transform-gpu"
                    whileHover={{ rotateY: 10, rotateX: 5 }}
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent to-purple-500 opacity-20" />
                      <Image
                        src="/images/profile.jpeg"
                        alt="Bernice Arthur"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-3xl transform-gpu"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Floating Social Links with 3D Effect */}
                  <div className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    {[
                      { icon: FaWhatsapp, link: "https://wa.me/your-number", label: "WhatsApp" },
                      { icon: FiLinkedin, link: "https://linkedin.com", label: "LinkedIn" },
                      { icon: FiInstagram, link: "https://instagram.com", label: "Instagram" },
                      { icon: FaFacebookF, link: "https://facebook.com", label: "Facebook" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ scale: 1.2, x: -5, rotateY: 15 }}
                        className="w-10 h-10 rounded-full bg-card-bg border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent transition-colors transform-gpu"
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Experience & Education Section */}
          <section className="py-8 mt-20 bg-main">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
              >
                Experience & Education
              </motion.h2>

              {/* Tabs */}
              <div className="flex justify-center gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('journey')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'journey' 
                      ? 'bg-accent text-white shadow-lg' 
                      : 'bg-card-bg text-secondary hover:bg-accent/10'
                  }`}
                >
                  Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('education')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'education' 
                      ? 'bg-accent text-white shadow-lg' 
                      : 'bg-card-bg text-secondary hover:bg-accent/10'
                  }`}
                >
                  Education
                </motion.button>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Journey Content */}
                <motion.div
                  initial={false}
                  animate={{ 
                    opacity: activeTab === 'journey' ? 1 : 0,
                    x: activeTab === 'journey' ? 0 : -20
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${activeTab === 'journey' ? 'block' : 'hidden'}`}
                >
                  {[
                    {
                      year: "2021 - Present",
                      title: "Senior Content Strategist",
                      description: "Leading content strategy and storytelling initiatives for major brands."
                    },
                    {
                      year: "2018 - 2021",
                      title: "Content Writer & Editor",
                      description: "Created engaging content for digital platforms and managed editorial workflows."
                    },
                    {
                      year: "2016 - 2018",
                      title: "Freelance Writer",
                      description: "Built a diverse portfolio working with startups and established brands."
                    }
                  ].map((experience, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="relative pl-8 pb-12 border-l-2 border-accent last:pb-0"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent" />
                      <div className="bg-card-bg p-6 rounded-lg border border-border hover:border-accent transition-all duration-300">
                        <span className="text-accent text-sm">{experience.year}</span>
                        <h3 className="text-xl font-bold mt-2 mb-3">{experience.title}</h3>
                        <p className="text-secondary">{experience.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Education Content */}
                <motion.div
                  initial={false}
                  animate={{ 
                    opacity: activeTab === 'education' ? 1 : 0,
                    x: activeTab === 'education' ? 0 : -20
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${activeTab === 'education' ? 'block' : 'hidden'}`}
                >
                  {[
                    {
                      degree: "Master of Arts in Creative Writing",
                      school: "University of Creative Arts",
                      year: "2018-2020",
                      details: [
                        "Specialized in Digital Storytelling",
                        "Thesis: 'The Evolution of Digital Narratives'",
                        "Graduate Writing Award Recipient"
                      ]
                    },
                    {
                      degree: "Bachelor of Arts in English Literature",
                      school: "State University",
                      year: "2014-2018",
                      details: [
                        "Minor in Digital Media",
                        "Dean's List Scholar",
                        "Editor, University Literary Magazine"
                      ]
                    },
                    {
                      degree: "Professional Certifications",
                      school: "Various Institutions",
                      year: "2020-Present",
                      details: [
                        "Digital Marketing Certification (Google)",
                        "Advanced Content Strategy (HubSpot)",
                        "Professional Storytelling Workshop (MasterClass)",
                        "UX Writing Fundamentals (Udacity)"
                      ]
                    }
                  ].map((education, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="relative pl-8 pb-12 border-l-2 border-accent last:pb-0"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent" />
                      <div className="bg-card-bg p-6 rounded-lg border border-border hover:border-accent transition-all duration-300">
                        <span className="text-accent text-sm">{education.year}</span>
                        <h3 className="text-xl font-bold mt-2">{education.degree}</h3>
                        <p className="text-secondary mb-4">{education.school}</p>
                        <ul className="space-y-2">
                          {education.details.map((detail, detailIndex) => (
                            <motion.li
                              key={detailIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                              className="flex items-center text-secondary"
                            >
                              <span className="w-2 h-2 rounded-full bg-accent mr-3" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-8 bg-main">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
              >
                Expertise
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    title: "Writing",
                    skills: ["Creative Writing", "Content Strategy", "Storytelling", "Editorial"],
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    title: "Digital",
                    skills: ["Social Media", "SEO", "Content Marketing", "Analytics"],
                    color: "from-blue-500 to-teal-500"
                  },
                  {
                    title: "Design",
                    skills: ["UI/UX Writing", "Visual Design", "Brand Voice", "Typography"],
                    color: "from-orange-500 to-yellow-500"
                  }
                ].map((category, index) => (
                <motion.div
                    key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="p-8 rounded-xl bg-card-bg border border-border hover:border-accent transition-all duration-300">
                      <h3 className="text-2xl font-bold mb-6 text-accent">
                        {category.title}
                      </h3>
                      <ul className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.li
                            key={skillIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                            className="flex items-center text-secondary"
                          >
                            <span className="w-2 h-2 rounded-full bg-accent mr-3" />
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          <section className="py-12 bg-main">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
              >
                Achievements & Recognition
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    title: "Awards",
                    items: [
                      {
                        name: "Best Creative Writer of 2023",
                        org: "Digital Writers Association"
                      },
                      {
                        name: "Excellence in Digital Storytelling",
                        org: "Content Creator Awards 2022"
                      },
                      {
                        name: "Rising Star Award",
                        org: "Young Writers Foundation 2021"
                      }
                    ],
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    title: "Publications",
                    items: [
                      {
                        name: "The Digital Narrative",
                        org: "Published in Tech Writers Monthly"
                      },
                      {
                        name: "Future of Content Creation",
                        org: "Featured in Content Strategy Journal"
                      },
                      {
                        name: "Stories That Connect",
                        org: "Medium Editorial Selection"
                      }
                    ],
                    color: "from-blue-500 to-teal-500"
                  },
                  {
                    title: "Speaking & Features",
                    items: [
                      {
                        name: "TEDx Speaker",
                        org: "The Art of Digital Storytelling, 2023"
                      },
                      {
                        name: "Writers Conference Keynote",
                        org: "Digital Writers Summit 2022"
                      },
                      {
                        name: "Media Feature",
                        org: "Creative Minds Magazine Cover Story"
                      }
                    ],
                    color: "from-orange-500 to-yellow-500"
                  }
                ].map((category, index) => (
                    <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="p-8 rounded-xl bg-card-bg border border-border hover:border-accent transition-all duration-300 h-full">
                      <h3 className="text-2xl font-bold mb-6 text-accent">
                        {category.title}
                      </h3>
                      <ul className="space-y-6">
                        {category.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                            className="text-secondary"
                          >
                            <p className="font-medium text-primary">{item.name}</p>
                            <p className="text-sm opacity-80">{item.org}</p>
                          </motion.li>
                        ))}
                      </ul>
                  </div>
                </motion.div>
              ))}
            </div>
            </div>
          </section>

        </div>

      </div>
    </Layout>
  );
} 