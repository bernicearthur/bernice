import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FiHeart, FiMessageSquare, FiUsers, FiEye, FiEdit2, FiTrash2, FiEye as FiView } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useTheme } from '../components/theme';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Dynamic imports
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse rounded-lg border border-border" />
});

const Dashboard = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('blogs');
  const [searchQuery, setSearchQuery] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Import Quill styles only on client side
    import('react-quill/dist/quill.snow.css');
  }, []);

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  // Mock data for demonstration
  const stats = {
    likes: 1234,
    comments: 856,
    members: 432,
    views: 10567
  };

  const mockContent = {
    blogs: [
      { id: 1, title: 'First Blog Post', date: '2024-01-15', likes: 45, comments: 12, views: 234 },
      { id: 2, title: 'Second Blog Post', date: '2024-01-16', likes: 32, comments: 8, views: 186 },
    ],
    stories: [
      { id: 1, title: 'My Journey', date: '2024-01-14', likes: 67, comments: 15, views: 345 },
      { id: 2, title: 'Life Lessons', date: '2024-01-13', likes: 89, comments: 23, views: 567 },
    ],
    projects: [
      { id: 1, title: 'Portfolio Website', date: '2024-01-12', likes: 78, comments: 19, views: 432 },
      { id: 2, title: 'Mobile App', date: '2024-01-11', likes: 56, comments: 14, views: 289 },
    ]
  };

  // Chart options
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      foreColor: theme === 'dark' ? '#fff' : '#000'
    },
    theme: {
      mode: theme
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  };

  const chartSeries = [
    {
      name: 'Views',
      data: [30, 40, 35, 50, 49, 60]
    }
  ];

  const handleStatScroll = (direction) => {
    if (direction === 'next') {
      setCurrentStatIndex((prev) => (prev === 3 ? 0 : prev + 1));
    } else {
      setCurrentStatIndex((prev) => (prev === 0 ? 3 : prev - 1));
    }
  };

  const StatCard = ({ icon: Icon, title, value }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-card-background p-4 sm:p-5 rounded-lg shadow-md border border-border h-[120px] sm:h-[140px] flex items-center justify-center"
    >
      <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
        </motion.div>
        <div>
          <p className="text-sm sm:text-base text-secondary">{title}</p>
          <motion.p 
            className="text-xl sm:text-2xl font-bold text-primary mt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {value.toLocaleString()}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );

  const ContentList = ({ items }) => (
    <motion.div 
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="bg-card-background rounded-lg shadow-md border border-border"
    >
      <div className="block w-full overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-2 sm:px-4 py-3 text-left text-sm font-medium text-secondary max-w-[180px] sm:max-w-none">Title</th>
              <th className="px-1 sm:px-2 py-3 text-left text-sm font-medium text-secondary w-[90px] sm:w-[100px]">Date</th>
              <th className="hidden sm:table-cell px-6 py-3 text-center text-sm font-medium text-secondary">Likes</th>
              <th className="hidden sm:table-cell px-6 py-3 text-center text-sm font-medium text-secondary">Comments</th>
              <th className="hidden sm:table-cell px-6 py-3 text-center text-sm font-medium text-secondary">Views</th>
              <th className="px-2 sm:px-4 py-3 text-right sm:text-center text-sm font-medium text-secondary w-[80px] sm:w-auto">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {items.map((item) => (
                <motion.tr 
                  key={item.id} 
                  className="border-b border-border hover:bg-background-secondary transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-2 sm:px-4 py-4 text-primary truncate max-w-[180px] sm:max-w-none">{item.title}</td>
                  <td className="px-1 sm:px-2 py-4 text-secondary text-sm whitespace-nowrap">{item.date}</td>
                  <td className="hidden sm:table-cell px-6 py-4 text-center text-secondary">{item.likes}</td>
                  <td className="hidden sm:table-cell px-6 py-4 text-center text-secondary">{item.comments}</td>
                  <td className="hidden sm:table-cell px-6 py-4 text-center text-secondary">{item.views}</td>
                  <td className="px-2 sm:px-4 py-4">
                    <div className="flex justify-end sm:justify-center gap-0.5 sm:gap-2">
                      <motion.button 
                        className="p-1 text-accent hover:text-accent-hover"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                      <motion.button 
                        className="p-1 text-accent hover:text-accent-hover"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiView className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                      <motion.button 
                        className="p-1 text-red-500 hover:text-red-600"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-border rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-border rounded"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
      >
        {/* Header */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-primary"
          >
            Dashboard
          </motion.h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <motion.input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-64 px-4 py-2 rounded-lg border border-border bg-card-background text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              onClick={() => setShowEditor(true)}
              className="w-full sm:w-auto px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + Create New
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid/Carousel */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 sm:mb-8"
        >
          {/* Mobile Carousel */}
          <div className="sm:hidden">
            <div className="relative px-4">
              <div className="overflow-hidden">
                <motion.div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentStatIndex * 100}%)` }}
                  animate={{ x: -currentStatIndex * 100 + '%' }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="w-full flex-shrink-0 px-2">
                    <StatCard icon={FiHeart} title="Total Likes" value={stats.likes} />
                  </div>
                  <div className="w-full flex-shrink-0 px-2">
                    <StatCard icon={FiMessageSquare} title="Total Comments" value={stats.comments} />
                  </div>
                  <div className="w-full flex-shrink-0 px-2">
                    <StatCard icon={FiUsers} title="Total Members" value={stats.members} />
                  </div>
                  <div className="w-full flex-shrink-0 px-2">
                    <StatCard icon={FiEye} title="Total Views" value={stats.views} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard icon={FiHeart} title="Total Likes" value={stats.likes} />
            <StatCard icon={FiMessageSquare} title="Total Comments" value={stats.comments} />
            <StatCard icon={FiUsers} title="Total Members" value={stats.members} />
            <StatCard icon={FiEye} title="Total Views" value={stats.views} />
          </div>
        </motion.div>

        {/* Content Tabs */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-6 sm:mb-8"
        >
          <div className="flex space-x-4 border-b border-border">
            {['blogs', 'stories', 'projects'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 sm:px-4 py-2 text-sm font-medium capitalize transition-colors duration-300 ${
                  activeTab === tab
                    ? 'border-b-2 border-accent text-accent'
                    : 'text-secondary hover:text-primary'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>
          <div className="mt-4 sm:mt-6">
            <ContentList items={mockContent[activeTab]} />
          </div>
        </motion.div>

        {/* Analytics Chart */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-card-background p-4 sm:p-6 rounded-lg shadow-md border border-border mb-6 sm:mb-8"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg sm:text-xl font-bold text-primary mb-4">Analytics Overview</h2>
          <div className="w-full">
            <Chart
              options={{
                ...chartOptions,
                chart: {
                  ...chartOptions.chart,
                  width: '100%',
                  height: '100%',
                  animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                      enabled: true,
                      delay: 150
                    },
                    dynamicAnimation: {
                      enabled: true,
                      speed: 350
                    }
                  }
                }
              }}
              series={chartSeries}
              type="line"
              height={350}
              width="100%"
            />
          </div>
        </motion.div>

        {/* Editor Modal */}
        <AnimatePresence>
          {showEditor && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary">Create New Content</h2>
                    <button
                      onClick={() => setShowEditor(false)}
                      className="text-secondary hover:text-primary text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full px-4 py-2 mb-4 rounded-lg border border-border bg-card-background text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <div className={`${theme === 'dark' ? 'quill-dark' : ''} border border-border rounded-lg overflow-hidden`}>
                    <ReactQuill
                      theme="snow"
                      value={editorContent}
                      onChange={setEditorContent}
                      modules={modules}
                      formats={formats}
                      className="bg-card-background text-primary"
                      preserveWhitespace
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-16">
                    <button
                      onClick={() => setShowEditor(false)}
                      className="w-full sm:w-auto px-4 py-2 text-secondary hover:text-primary border border-border rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        console.log('Content to save:', editorContent);
                        setShowEditor(false);
                      }}
                      className="w-full sm:w-auto px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-300"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Dashboard;
