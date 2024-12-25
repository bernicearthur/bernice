import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-main">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/images/neosiam.jpg')" }}>
        <div className="hero-overlay"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl mb-4 text-white"
          >
            Official Website of Aspiring Author
          </motion.p>
          
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-playfair font-bold mb-4 text-white"
          >
            Bernice Arthur
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            Writer | Storyteller | Archiver
          </motion.p>

          <motion.a
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.6 }}
            href="/blog"
            className="mt-8 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-full transition"
          >
            Explore My Works
          </motion.a>

          {/* Scroll Down Button */}
          <motion.button
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={() => {
              const footer = document.querySelector('footer');
              footer?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-20 flex flex-col items-center cursor-pointer group"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 group-hover:text-accent transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
            <span className="text-sm text-white mt-2 group-hover:text-accent transition-colors">
              Scroll Down
            </span>
          </motion.button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <div className="prose prose-lg max-w-none">
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
