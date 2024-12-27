import { useEffect, useState } from 'react';
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
  const [activeTab, setActiveTab] = useState(0);

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
                <h2 className="text-3xl font-bold text-primary mb-6">About the Author</h2>
                <p className="text-secondary">
                  Bernice Arthur is a creative powerhouse whose passion for storytelling transforms words into immersive experiences. 
                  With a flair for writing, design, and project innovation, she has inspired audiences with her unique perspective 
                  and dedication to excellence.
                </p>
                <p className="text-secondary mt-4">
                  Based in [Location], Bernice draws inspiration from the vibrant tapestry of life, weaving stories that resonate 
                  with authenticity and depth. Her creative philosophy centers on the belief that every story has the power to 
                  inspire, connect, and transform.
                </p>
              </div>

              {/* Skills Section */}
              <div className="mt-16 w-full">
                <h3 className="text-2xl font-bold text-primary mb-8 text-center">Skills & Expertise</h3>
                
                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {['Core Skills', 'Technical Skills', 'Soft Skills'].map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-accent text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-secondary hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Skills Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {activeTab === 0 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">Writing</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• Blog Writing</li>
                          <li>• Creative Stories</li>
                          <li>• Content Creation</li>
                          <li>• Editorial Writing</li>
                        </ul>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">Design</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• Adobe Creative Suite</li>
                          <li>• Figma</li>
                          <li>• Canva</li>
                          <li>• Visual Design</li>
                        </ul>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">Communication</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• Public Speaking</li>
                          <li>• Storytelling</li>
                          <li>• Team Collaboration</li>
                          <li>• Presentation</li>
                        </ul>
                      </motion.div>
                    </>
                  )}

                  {activeTab === 1 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">Web Development</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• HTML/CSS</li>
                          <li>• JavaScript</li>
                          <li>• Responsive Design</li>
                          <li>• Web Accessibility</li>
                        </ul>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">CMS</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• WordPress</li>
                          <li>• Content Management</li>
                          <li>• SEO Optimization</li>
                          <li>• Plugin Management</li>
                        </ul>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">Tools</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• Git Version Control</li>
                          <li>• VS Code</li>
                          <li>• Command Line</li>
                          <li>• Development Tools</li>
                        </ul>
                      </motion.div>
                    </>
                  )}

                  {activeTab === 2 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">Problem Solving</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• Critical Thinking</li>
                          <li>• Analysis</li>
                          <li>• Decision Making</li>
                          <li>• Innovation</li>
                        </ul>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">Adaptability</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• Flexibility</li>
                          <li>• Quick Learning</li>
                          <li>• Change Management</li>
                          <li>• Resilience</li>
                        </ul>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-lg bg-card-bg border border-border"
                      >
                        <h4 className="text-xl font-semibold text-primary mb-4">Time Management</h4>
                        <ul className="space-y-2 text-secondary">
                          <li>• Project Planning</li>
                          <li>• Task Prioritization</li>
                          <li>• Deadline Management</li>
                          <li>• Organization</li>
                        </ul>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>

              {/* Professional Journey Section */}
              <div className="mt-24 w-full max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-primary mb-16 text-center">Professional Journey</h3>
                
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/30 md:left-1/2 md:-ml-px" />
                  
                  {/* Experience Items */}
                  <div className="space-y-12">
                    {/* Current Role */}
                    <div className="relative flex items-center group md:justify-end md:pl-[50%]">
                      <div className="absolute left-4 w-2 h-2 rounded-full bg-accent md:left-1/2 md:-ml-1" />
                      <div className="pl-12 md:pl-8 md:pr-0">
                        <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent">
                          <h4 className="text-xl font-semibold text-primary">Senior Content Strategist</h4>
                          <p className="text-accent text-sm mt-1">2021 - Present</p>
                          <div className="mt-4 text-secondary">
                            <p className="mb-3">Leading content strategy and storytelling initiatives for major brands.</p>
                            <ul className="space-y-1 text-sm">
                              <li>• Award-winning content campaigns</li>
                              <li>• Team mentorship and leadership</li>
                              <li>• 200% audience growth</li>
                            </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                    {/* Previous Role */}
                    <div className="relative flex items-center group">
                      <div className="absolute left-4 w-2 h-2 rounded-full bg-accent md:left-1/2 md:-ml-1" />
                      <div className="pl-12 md:w-[50%] md:pl-0 md:pr-8">
                        <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent">
                          <h4 className="text-xl font-semibold text-primary">Content Writer & Editor</h4>
                          <p className="text-accent text-sm mt-1">2018 - 2021</p>
                          <div className="mt-4 text-secondary">
                            <p className="mb-3">Created engaging content for digital platforms and managed editorial workflows.</p>
                            <ul className="space-y-1 text-sm">
                              <li>• Digital content transformation</li>
                              <li>• 500+ published articles</li>
                              <li>• Editorial guidelines development</li>
                            </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                    {/* Earlier Role */}
                    <div className="relative flex items-center group md:justify-end md:pl-[50%]">
                      <div className="absolute left-4 w-2 h-2 rounded-full bg-accent md:left-1/2 md:-ml-1" />
                      <div className="pl-12 md:pl-8 md:pr-0">
                        <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent">
                          <h4 className="text-xl font-semibold text-primary">Freelance Writer</h4>
                          <p className="text-accent text-sm mt-1">2016 - 2018</p>
                          <div className="mt-4 text-secondary">
                            <p className="mb-3">Built a diverse portfolio working with startups and established brands.</p>
                            <ul className="space-y-1 text-sm">
                              <li>• 20+ global clients</li>
                              <li>• Viral content creation</li>
                              <li>• Tech writing specialization</li>
                            </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="mt-24 w-full max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-primary mb-16 text-center">Education</h3>
                
                {/* Education Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/30 md:left-1/2 md:-ml-px" />
                  
                  {/* Education Items */}
                  <div className="space-y-12">
                    {/* Master's Degree */}
                    <div className="relative flex items-center group md:justify-end md:pl-[50%]">
                      <div className="absolute left-4 w-2 h-2 rounded-full bg-accent md:left-1/2 md:-ml-1" />
                      <div className="pl-12 md:pl-8 md:pr-0">
                        <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent">
                          <h4 className="text-xl font-semibold text-primary">Master of Arts in Creative Writing</h4>
                          <p className="text-accent text-sm mt-1">University of Creative Arts, 2018-2020</p>
                          <div className="mt-4 text-secondary">
                            <ul className="space-y-1 text-sm">
                              <li>• Specialized in Digital Storytelling</li>
                              <li>• Thesis: "The Evolution of Digital Narratives"</li>
                              <li>• Graduate Writing Award Recipient</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bachelor's Degree */}
                    <div className="relative flex items-center group">
                      <div className="absolute left-4 w-2 h-2 rounded-full bg-accent md:left-1/2 md:-ml-1" />
                      <div className="pl-12 md:w-[50%] md:pl-0 md:pr-8">
                        <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent">
                          <h4 className="text-xl font-semibold text-primary">Bachelor of Arts in English Literature</h4>
                          <p className="text-accent text-sm mt-1">State University, 2014-2018</p>
                          <div className="mt-4 text-secondary">
                            <ul className="space-y-1 text-sm">
                              <li>• Minor in Digital Media</li>
                              <li>• Dean's List Scholar</li>
                              <li>• Editor, University Literary Magazine</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="relative flex items-center group md:justify-end md:pl-[50%]">
                      <div className="absolute left-4 w-2 h-2 rounded-full bg-accent md:left-1/2 md:-ml-1" />
                      <div className="pl-12 md:pl-8 md:pr-0">
                        <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent">
                          <h4 className="text-xl font-semibold text-primary">Professional Certifications</h4>
                          <p className="text-accent text-sm mt-1">2020-Present</p>
                          <div className="mt-4 text-secondary">
                            <ul className="space-y-1 text-sm">
                              <li>• Digital Marketing Certification (Google)</li>
                              <li>• Advanced Content Strategy (HubSpot)</li>
                              <li>• Professional Storytelling Workshop (MasterClass)</li>
                              <li>• UX Writing Fundamentals (Udacity)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements and Awards Section */}
              <div className="mt-24 w-full max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-primary mb-16 text-center">Achievements & Awards</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Awards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-1 lg:col-span-1"
                  >
                    <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent h-full">
                      <h4 className="text-xl font-semibold text-primary mb-4">Awards</h4>
                      <ul className="space-y-4 text-secondary">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">Best Creative Writer of 2023</p>
                            <p className="text-sm opacity-80">Digital Writers Association</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">Excellence in Digital Storytelling</p>
                            <p className="text-sm opacity-80">Content Creator Awards 2022</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">Rising Star Award</p>
                            <p className="text-sm opacity-80">Young Writers Foundation 2021</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Publications */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-1 lg:col-span-1"
                  >
                    <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent h-full">
                      <h4 className="text-xl font-semibold text-primary mb-4">Publications</h4>
                      <ul className="space-y-4 text-secondary">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">The Digital Narrative</p>
                            <p className="text-sm opacity-80">Published in Tech Writers Monthly</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">Future of Content Creation</p>
                            <p className="text-sm opacity-80">Featured in Content Strategy Journal</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">Stories That Connect</p>
                            <p className="text-sm opacity-80">Medium Editorial Selection</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Other Achievements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-1 lg:col-span-1"
                  >
                    <div className="p-8 rounded-lg bg-card-bg border border-border border-l-4 border-accent h-full">
                      <h4 className="text-xl font-semibold text-primary mb-4">Speaking & Features</h4>
                      <ul className="space-y-4 text-secondary">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">TEDx Speaker</p>
                            <p className="text-sm opacity-80">The Art of Digital Storytelling, 2023</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">Writers Conference Keynote</p>
                            <p className="text-sm opacity-80">Digital Writers Summit 2022</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <div>
                            <p className="font-medium">Media Feature</p>
                            <p className="text-sm opacity-80">Creative Minds Magazine Cover Story</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Future Goals Section */}
              <div className="mt-24 w-full max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-primary mb-16 text-center">Future Goals</h3>
                
                <div className="space-y-12">
                  {/* Personal Statement */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 rounded-lg bg-card-bg border border-border"
                  >
                    <h4 className="text-xl font-semibold text-primary mb-6">Personal Statement</h4>
                    <p className="text-secondary leading-relaxed">
                      As a storyteller and content creator, my vision extends beyond traditional boundaries. 
                      I am passionate about exploring new mediums and pushing the boundaries of digital storytelling. 
                      Through my work, I aim to create meaningful connections and inspire others to share their unique narratives.
                    </p>
                  </motion.div>

                  {/* Future Aspirations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {/* Creative Expansion */}
                    <div className="p-8 rounded-lg bg-card-bg border border-border">
                      <h4 className="text-lg font-semibold text-primary mb-4">Creative Expansion</h4>
                      <ul className="space-y-3 text-secondary">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Writing and publishing a novel</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Launching a storytelling podcast</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Creating digital writing workshops</span>
                        </li>
                      </ul>
                    </div>

                    {/* Collaborations */}
                    <div className="p-8 rounded-lg bg-card-bg border border-border">
                      <h4 className="text-lg font-semibold text-primary mb-4">Collaborations</h4>
                      <ul className="space-y-3 text-secondary">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Partnering with creative brands</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Co-authoring multimedia projects</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Building creative communities</span>
                        </li>
                      </ul>
                    </div>

                    {/* New Horizons */}
                    <div className="p-8 rounded-lg bg-card-bg border border-border">
                      <h4 className="text-lg font-semibold text-primary mb-4">New Horizons</h4>
                      <ul className="space-y-3 text-secondary">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Exploring UX writing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Venturing into animation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>Advanced content strategy</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Quote Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
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

              {/* Contact Information */}
              <div className="mt-24 w-full">
                <h3 className="text-2xl font-bold text-primary mb-10 text-center">Connect With Me</h3>
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
