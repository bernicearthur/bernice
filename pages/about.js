import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { HiOutlineArrowNarrowDown } from 'react-icons/hi';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Head from 'next/head';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('journey');
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-main text-primary overflow-hidden">
      <Head>
        <title>About | Bernice Arthur</title>
        <meta name="description" content="Learn more about Bernice Arthur - Creative writer and digital storyteller" />
      </Head>
      <Navbar />

      <main className="-mt-24">
        {/* Hero Section */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center bg-main overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-main to-main" />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_0%,transparent_50%)]"
            />
          </div>
        
        {/* Main Content */}
          <div className="container relative mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 text-center lg:text-left relative z-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Creative Portfolio
                  </span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl lg:text-7xl font-bold mb-6"
                >
                  <span className="inline-block">
                    Hi, I'm{' '}
                    <span className="bg-gradient-to-r from-accent to-purple-500 text-transparent bg-clip-text">
                      Bernice
                    </span>
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-xl text-secondary mb-8 max-w-xl"
                >
                  A creative writer and digital storyteller passionate about crafting immersive narratives that inspire and connect with audiences worldwide.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    Let's Connect
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="#work"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-accent/20 hover:border-accent text-primary rounded-2xl font-medium transition-all duration-300"
                  >
                    View Portfolio
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right Content - Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:flex-1 relative"
              >
                <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                  {/* Animated Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border-2 border-dashed border-accent/30"
                  />
                  
                  {/* Profile Image Container */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full p-4"
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent to-purple-500 opacity-20" />
                      <Image
                        src="/images/profile.jpg"
                        alt="Bernice Arthur"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-3xl"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Floating Social Links */}
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    {[
                      { icon: FiGithub, link: "https://github.com", label: "GitHub" },
                      { icon: FiTwitter, link: "https://twitter.com", label: "Twitter" },
                      { icon: FiLinkedin, link: "https://linkedin.com", label: "LinkedIn" },
                      { icon: FiInstagram, link: "https://instagram.com", label: "Instagram" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ scale: 1.2, x: -5 }}
                        className="w-10 h-10 rounded-full bg-card-bg border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent transition-colors"
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs sm:text-sm text-secondary">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <HiOutlineArrowNarrowDown className="text-xl sm:text-2xl text-accent" />
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />

        {/* About Section */}
        <section className="py-8 sm:py-12 bg-main">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
                The Story So Far
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none px-4 sm:px-0 text-center">
                <p className="text-base sm:text-lg text-secondary leading-relaxed mx-auto max-w-2xl">
                  As a creative powerhouse with a passion for storytelling, I transform words into immersive experiences. 
                  My journey in digital storytelling has led me to collaborate with global brands, create viral content, 
                  and inspire audiences worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-12 bg-main">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
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

        {/* Journey & Education Section */}
        <section className="py-12 bg-main">
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
            <div className="flex justify-center gap-4 mb-12">
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

        {/* Achievements Section */}
        <section className="py-12 bg-main">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
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

        {/* Future Goals Section */}
        <section className="py-12 bg-main">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-16 text-center"
            >
              Vision & Goals
            </motion.h2>

            <div className="max-w-6xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-card-bg p-8 rounded-lg border border-border"
              >
                <h3 className="text-2xl font-bold mb-6 text-accent">
                  Personal Statement
                </h3>
                <p className="text-secondary leading-relaxed">
                  As a storyteller and content creator, my vision extends beyond traditional boundaries. 
                  I am passionate about exploring new mediums and pushing the boundaries of digital storytelling. 
                  Through my work, I aim to create meaningful connections and inspire others to share their unique narratives.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Creative Expansion",
                    goals: [
                      "Writing and publishing a novel",
                      "Launching a storytelling podcast",
                      "Creating digital writing workshops"
                    ],
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    title: "Collaborations",
                    goals: [
                      "Partnering with creative brands",
                      "Co-authoring multimedia projects",
                      "Building creative communities"
                    ],
                    color: "from-blue-500 to-teal-500"
                  },
                  {
                    title: "New Horizons",
                    goals: [
                      "Exploring UX writing",
                      "Venturing into animation",
                      "Advanced content strategy"
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
                      <ul className="space-y-4">
                        {category.goals.map((goal, goalIndex) => (
                          <motion.li
                            key={goalIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: goalIndex * 0.1 }}
                            className="flex items-center text-secondary"
                          >
                            <span className="w-2 h-2 rounded-full bg-accent mr-3" />
                            {goal}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative mt-12"
              >
                <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent">
                  <blockquote className="text-xl md:text-2xl text-primary font-medium italic">
                    "My goal is to inspire, create, and leave an indelible mark on the world of storytelling."
                  </blockquote>
                  <p className="mt-4 text-secondary text-right">— Bernice Arthur</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-main">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Connect</h2>
              <p className="text-secondary mb-12">
                Available for freelance opportunities and creative collaborations.
              </p>

              <div className="flex justify-center space-x-8 mb-12">
                {[
                  { icon: FiGithub, link: "https://github.com", label: "GitHub" },
                  { icon: FiTwitter, link: "https://twitter.com", label: "Twitter" },
                  { icon: FiLinkedin, link: "https://linkedin.com", label: "LinkedIn" },
                  { icon: FiInstagram, link: "https://instagram.com", label: "Instagram" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: "#7C3AED" }}
                    className="text-3xl hover:text-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="mailto:bernice.arthur@gmail.com" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-medium transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default About;
