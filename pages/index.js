import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout';
import { useState, useEffect } from 'react';

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
          >
            <Link
              href="/bio"
              className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-full transition-all duration-300 transform hover:scale-105"
            >
              About Me
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 1
          }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 