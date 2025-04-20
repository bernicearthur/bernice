import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
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
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 sm:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 text-center lg:text-left relative z-10 max-w-2xl mx-auto lg:mx-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
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
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
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
                  className="text-lg sm:text-xl text-secondary mb-10 max-w-xl mx-auto lg:mx-0"
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
                    className="group px-6 sm:px-8 py-3 sm:py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    Let's Connect
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="#work"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-accent/20 hover:border-accent text-primary rounded-2xl font-medium transition-all duration-300"
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
                className="lg:flex-1 relative perspective-1000 mt-12 lg:mt-0"
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
        </motion.section>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />

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
                  { icon: FaWhatsapp, link: "https://wa.me/your-number", label: "WhatsApp" },
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
