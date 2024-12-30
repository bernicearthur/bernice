import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaFacebookF } from 'react-icons/fa';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const typewriter = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function Home() {
  const text = "Writer | Storyteller | Archiver";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [
    '/images/bg1.jpg',
    '/images/bg2.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg',
    '/images/bg5.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);
  
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background Images with Overlay */}
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-5000"
            style={{ opacity: currentImageIndex === index ? 1 : 0 }}
          >
            <Image
              src={image}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/90" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-gray-300 text-lg md:text-xl mb-4 font-light tracking-wider"
          >
            Official Website of Aspiring Author
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            Bernice Arthur
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={typewriter}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light flex flex-wrap justify-center"
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterAnimation}
                className={char === " " ? "mr-1" : ""}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <Link
              href="/bio"
              className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-full transition-all duration-300 transform hover:scale-105 mb-6 md:mb-0"
            >
              About Me
            </Link>

            {/* Social Media Links */}
            <div className="flex md:hidden gap-6 mt-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
            </div>
          </motion.div>

          {/* Vertical Social Media Links for Desktop */}
          <div className="hidden md:block fixed left-0 top-1/2 transform -translate-y-1/2 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col gap-6"
              >
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <FaFacebookF size={24} />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <FaLinkedin size={24} />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <FaTwitter size={24} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 