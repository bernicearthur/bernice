import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout';

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
  
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/neosiam.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

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