import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FiHeart, FiMessageSquare, FiUsers, FiEye, FiEdit2, FiTrash2, FiEye as FiView } from 'react-icons/fi';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useTheme } from '../components/theme';

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

  const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-card-background p-6 rounded-lg shadow-md border border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-secondary text-sm">{title}</p>
          <p className="text-2xl font-bold text-primary mt-1">{value.toLocaleString()}</p>
        </div>
        <Icon className="w-8 h-8 text-accent" />
      </div>
    </div>
  );

  const ContentList = ({ items }) => (
    <div className="bg-card-background rounded-lg shadow-md border border-border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-secondary">Date</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-secondary">Likes</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-secondary">Comments</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-secondary">Views</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border hover:bg-background-secondary transition-colors duration-200">
              <td className="px-6 py-4 text-primary">{item.title}</td>
              <td className="px-6 py-4 text-secondary">{item.date}</td>
              <td className="px-6 py-4 text-center text-secondary">{item.likes}</td>
              <td className="px-6 py-4 text-center text-secondary">{item.comments}</td>
              <td className="px-6 py-4 text-center text-secondary">{item.views}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center space-x-2">
                  <button className="p-1 text-accent hover:text-accent-hover">
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-accent hover:text-accent-hover">
                    <FiView className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-red-500 hover:text-red-600">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Dashboard</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-64 px-4 py-2 rounded-lg border border-border bg-card-background text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setShowEditor(true)}
              className="w-full sm:w-auto px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-300"
            >
              + Create New
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard icon={FiHeart} title="Total Likes" value={stats.likes} />
          <StatCard icon={FiMessageSquare} title="Total Comments" value={stats.comments} />
          <StatCard icon={FiUsers} title="Total Members" value={stats.members} />
          <StatCard icon={FiEye} title="Total Views" value={stats.views} />
        </div>

        {/* Content Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex space-x-4 border-b border-border overflow-x-auto">
            {['blogs', 'stories', 'projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 text-sm font-medium capitalize transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-accent text-accent'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4 sm:mt-6 overflow-x-auto">
            <div className="min-w-[600px]">
              <ContentList items={mockContent[activeTab]} />
            </div>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-card-background p-4 sm:p-6 rounded-lg shadow-md border border-border mb-6 sm:mb-8 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold text-primary mb-4">Analytics Overview</h2>
          <div className="min-w-[500px]">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="line"
              height={350}
            />
          </div>
        </div>

        {/* Editor Modal */}
        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-card-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
