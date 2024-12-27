import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FiHeart, FiMessageSquare, FiUsers, FiEye, FiEdit2, FiTrash2, FiEye as FiView, FiSettings, FiUser, FiCamera, FiMail, FiLock, FiToggleLeft, FiToggleRight, FiGlobe, FiDatabase, FiCalendar, FiChevronDown } from 'react-icons/fi';
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
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('blogs');
  const [searchQuery, setSearchQuery] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [customDateRange, setCustomDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  // Settings state
  const [profileImage, setProfileImage] = useState('/images/neosiam.jpg');
  const [name, setName] = useState('Bernice Arthur');
  const [email, setEmail] = useState('bernice.arthur@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [preferences, setPreferences] = useState({
    enableComments: true,
    enableLikes: true,
    enableSharing: true,
    darkMode: theme === 'dark'
  });
  const [seoSettings, setSeoSettings] = useState({
    defaultMetaDescription: 'Personal portfolio and blog of Bernice Arthur',
    defaultAltText: 'Bernice Arthur - Portfolio Image',
    defaultPermalink: 'bernice-arthur.com/blog/'
  });

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

  // Mock data for different time ranges
  const analyticsData = {
    day: {
      categories: ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM'],
      data: [10, 15, 25, 35, 45, 30]
    },
    week: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [30, 40, 35, 50, 49, 60, 55]
    },
    month: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [120, 150, 180, 200]
    },
    year: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850]
    }
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setShowTimeRangeDropdown(false);
  };

  // Update chart options with dynamic data based on time range
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
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: analyticsData[timeRange].categories
    },
    grid: {
      borderColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
      strokeDashArray: 4
    },
    tooltip: {
      theme: theme,
      y: {
        formatter: (value) => `${value} views`
      }
    },
    markers: {
      size: 5,
      colors: ['var(--accent)'],
      strokeColors: theme === 'dark' ? '#27272a' : '#ffffff',
      strokeWidth: 2
    }
  };

  const chartSeries = [
    {
      name: 'Views',
      data: analyticsData[timeRange].data
    }
  ];

  const handleStatScroll = (direction) => {
    if (direction === 'next') {
      setCurrentStatIndex((prev) => (prev === 3 ? 0 : prev + 1));
    } else {
      setCurrentStatIndex((prev) => (prev === 0 ? 3 : prev - 1));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Add password validation and API call here
    console.log('Password change requested');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    if (key === 'darkMode') {
      toggleTheme();
    }
  };

  const handleSeoSettingsChange = (key, value) => {
    setSeoSettings(prev => ({
      ...prev,
      [key]: value
    }));
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

  const SettingsSection = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Profile Information */}
      <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-lg shadow-md border border-border">
        <h3 className="text-xl font-semibold text-primary mb-6">Profile Information</h3>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-full sm:w-auto flex justify-center">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-accent"
              />
              <label className="absolute bottom-0 right-1/2 sm:right-0 translate-x-16 sm:translate-x-0 p-2 bg-accent hover:bg-accent-hover rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-110">
                <FiCamera className="w-5 h-5 text-white" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card-background focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card-background focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => console.log('Update profile')}
              className="w-full sm:w-auto px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-300"
            >
              Update Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* Password Management */}
      <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-lg shadow-md border border-border">
        <h3 className="text-xl font-semibold text-primary mb-6">Password Management</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-card-background focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                {showPasswords.current ? <FiEye /> : <FiEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-card-background focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                {showPasswords.new ? <FiEye /> : <FiEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-card-background focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                {showPasswords.confirm ? <FiEye /> : <FiEye />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-300"
            >
              Update Password
            </button>
          </div>
        </form>
      </motion.div>

      {/* Site Preferences */}
      <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-lg shadow-md border border-border">
        <h3 className="text-xl font-semibold text-primary mb-6">Site Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-primary font-medium">Enable Comments</h4>
              <p className="text-sm text-secondary">Allow visitors to comment on your content</p>
            </div>
            <button
              onClick={() => handlePreferenceChange('enableComments')}
              className="relative"
            >
              {preferences.enableComments ? <FiToggleRight className="w-8 h-8 text-accent" /> : <FiToggleLeft className="w-8 h-8 text-secondary" />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-primary font-medium">Enable Likes</h4>
              <p className="text-sm text-secondary">Allow visitors to like your content</p>
            </div>
            <button
              onClick={() => handlePreferenceChange('enableLikes')}
              className="relative"
            >
              {preferences.enableLikes ? <FiToggleRight className="w-8 h-8 text-accent" /> : <FiToggleLeft className="w-8 h-8 text-secondary" />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-primary font-medium">Enable Sharing</h4>
              <p className="text-sm text-secondary">Allow visitors to share your content</p>
            </div>
            <button
              onClick={() => handlePreferenceChange('enableSharing')}
              className="relative"
            >
              {preferences.enableSharing ? <FiToggleRight className="w-8 h-8 text-accent" /> : <FiToggleLeft className="w-8 h-8 text-secondary" />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-primary font-medium">Dark Mode</h4>
              <p className="text-sm text-secondary">Switch between light and dark theme</p>
            </div>
            <button
              onClick={() => handlePreferenceChange('darkMode')}
              className="relative"
            >
              {theme === 'dark' ? <FiToggleRight className="w-8 h-8 text-accent" /> : <FiToggleLeft className="w-8 h-8 text-secondary" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Advanced Settings */}
      <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-lg shadow-md border border-border">
        <h3 className="text-xl font-semibold text-primary mb-6">Advanced Settings</h3>
        <div className="space-y-6">
          {/* SEO Settings */}
          <div>
            <h4 className="text-lg font-medium text-primary mb-4">SEO Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Default Meta Description</label>
                <textarea
                  value={seoSettings.defaultMetaDescription}
                  onChange={(e) => handleSeoSettingsChange('defaultMetaDescription', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card-background focus:ring-2 focus:ring-accent focus:border-transparent"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Default Alt Text</label>
                <input
                  type="text"
                  value={seoSettings.defaultAltText}
                  onChange={(e) => handleSeoSettingsChange('defaultAltText', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card-background focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Default Permalink Structure</label>
                <input
                  type="text"
                  value={seoSettings.defaultPermalink}
                  onChange={(e) => handleSeoSettingsChange('defaultPermalink', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card-background focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Export & Backup Options */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-lg font-medium text-primary mb-4">Export & Backup Options</h4>
            
            {/* Individual Content Export */}
            <div className="space-y-4 mb-6">
              <h5 className="text-sm font-medium text-secondary">Export Individual Content</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Blogs Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">Blogs</label>
                  <select
                    className="w-full px-3 py-2 bg-card-background border border-border rounded-lg text-primary text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Select a blog post</option>
                    {mockContent.blogs.map(blog => (
                      <option key={blog.id} value={blog.id}>{blog.title}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => console.log('Export individual blog')}
                    className="w-full px-3 py-2 text-sm bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FiDatabase className="w-4 h-4" />
                    Export Blog
                  </button>
                </div>

                {/* Stories Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">Stories</label>
                  <select
                    className="w-full px-3 py-2 bg-card-background border border-border rounded-lg text-primary text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Select a story</option>
                    {mockContent.stories.map(story => (
                      <option key={story.id} value={story.id}>{story.title}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => console.log('Export individual story')}
                    className="w-full px-3 py-2 text-sm bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FiDatabase className="w-4 h-4" />
                    Export Story
                  </button>
                </div>

                {/* Projects Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">Projects</label>
                  <select
                    className="w-full px-3 py-2 bg-card-background border border-border rounded-lg text-primary text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Select a project</option>
                    {mockContent.projects.map(project => (
                      <option key={project.id} value={project.id}>{project.title}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => console.log('Export individual project')}
                    className="w-full px-3 py-2 text-sm bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FiDatabase className="w-4 h-4" />
                    Export Project
                  </button>
                </div>
              </div>
            </div>

            {/* Bulk Export Options */}
            <div className="space-y-4 mb-6">
              <h5 className="text-sm font-medium text-secondary">Bulk Export</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => console.log('Export all blogs')}
                  className="px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FiDatabase className="w-5 h-5" />
                  Export All Blogs
                </button>
                <button
                  onClick={() => console.log('Export all stories')}
                  className="px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FiDatabase className="w-5 h-5" />
                  Export All Stories
                </button>
                <button
                  onClick={() => console.log('Export all projects')}
                  className="px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FiDatabase className="w-5 h-5" />
                  Export All Projects
                </button>
              </div>
            </div>

            {/* Complete Backup */}
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-secondary">Complete Backup</h5>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => console.log('Export all content')}
                  className="w-full sm:w-auto px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <FiDatabase className="w-5 h-5" />
                  Export All Content
                </button>
                <button
                  onClick={() => console.log('Restore backup')}
                  className="w-full sm:w-auto px-6 py-2 border border-border text-primary hover:bg-border rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <FiDatabase className="w-5 h-5" />
                  Restore Backup
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
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
            {['blogs', 'stories', 'projects', 'settings'].map((tab) => (
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
            {activeTab === 'settings' ? (
              <SettingsSection />
            ) : (
              <ContentList items={mockContent[activeTab]} />
            )}
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-primary">Analytics Overview</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              {/* Time Range Selector */}
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                  className="w-full sm:w-[160px] px-4 py-2.5 bg-card-background border border-border rounded-lg flex items-center justify-between gap-2 text-primary hover:bg-border transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    <span className="capitalize">{timeRange}</span>
                  </div>
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${showTimeRangeDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showTimeRangeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-[160px] bg-main border border-border rounded-lg shadow-lg z-10 overflow-hidden"
                  >
                    {['day', 'week', 'month', 'year'].map((range) => (
                      <button
                        key={range}
                        onClick={() => handleTimeRangeChange(range)}
                        className={`w-full px-4 py-2.5 text-left capitalize transition-colors duration-200 ${
                          timeRange === range 
                            ? 'bg-accent/10 text-accent font-medium' 
                            : 'text-primary hover:bg-border'
                        } ${range !== 'year' ? 'border-b border-border' : ''}`}
                      >
                        {range}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Custom Date Range */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <div className="flex-1 sm:flex-none">
                    <label className="block text-xs text-secondary mb-1 sm:hidden">Start Date</label>
                    <input
                      type="date"
                      value={customDateRange.start}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full sm:w-auto px-3 py-2 bg-card-background border border-border rounded-lg text-primary text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <span className="text-secondary self-end sm:self-center pb-2 sm:pb-0">to</span>
                  <div className="flex-1 sm:flex-none">
                    <label className="block text-xs text-secondary mb-1 sm:hidden">End Date</label>
                    <input
                      type="date"
                      value={customDateRange.end}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full sm:w-auto px-3 py-2 bg-card-background border border-border rounded-lg text-primary text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  onClick={() => console.log('Apply custom date range')}
                  className="w-full sm:w-auto px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-[350px] sm:h-[400px] lg:h-[350px]">
            <Chart
              options={{
                ...chartOptions,
                chart: {
                  ...chartOptions.chart,
                  toolbar: {
                    show: false
                  },
                  zoom: {
                    enabled: false
                  }
                },
                responsive: [{
                  breakpoint: 640,
                  options: {
                    chart: {
                      height: '300px'
                    },
                    markers: {
                      size: 4
                    },
                    xaxis: {
                      labels: {
                        style: {
                          fontSize: '10px'
                        }
                      }
                    },
                    yaxis: {
                      labels: {
                        style: {
                          fontSize: '10px'
                        }
                      }
                    }
                  }
                }]
              }}
              series={chartSeries}
              type="line"
              height="100%"
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
