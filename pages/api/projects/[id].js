// Mock database with creative project examples
const projects = [
  {
    id: 1,
    title: 'EcoTrack - Smart Sustainability Monitor',
    description: `EcoTrack is an IoT-powered sustainability monitoring system that helps businesses and homes track their environmental impact in real-time. The dashboard visualizes energy consumption, water usage, and carbon footprint through interactive charts and provides AI-driven recommendations for reducing environmental impact.

Features:
• Real-time energy and water consumption monitoring
• Machine learning-powered usage predictions
• Customizable alerts and recommendations
• Integration with smart home devices
• Monthly sustainability reports`,
    images: [
      '/images/ecotrack-dashboard.jpg',
      '/images/ecotrack-mobile.jpg',
      '/images/ecotrack-charts.jpg',
      '/images/ecotrack-devices.jpg'
    ],
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    demoUrl: 'https://ecotrack-demo.vercel.app/demo',
    technologies: ['React', 'Node.js', 'TensorFlow.js', 'IoT Sensors', 'WebSocket', 'D3.js'],
    liveUrl: 'https://ecotrack-demo.vercel.app',
    githubUrl: 'https://github.com/username/ecotrack',
    socialLinks: {
      facebook: 'https://facebook.com/ecotrack',
      instagram: 'https://instagram.com/ecotrack.ai',
      twitter: 'https://twitter.com/ecotrack',
      linkedin: 'https://linkedin.com/company/ecotrack'
    },
    likes: 128,
    views: 1205,
    comments: [
      {
        id: 1,
        author: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Sarah',
        content: 'Love how the dashboard makes complex data so easy to understand! The AI recommendations are surprisingly accurate.',
        timestamp: '2024-01-15T08:30:00Z',
        likes: 15
      },
      {
        id: 2,
        author: 'Mike Rodriguez',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Mike',
        content: 'Been using this for my small business. Already reduced our energy bills by 20%!',
        timestamp: '2024-01-14T15:45:00Z',
        likes: 8
      }
    ],
    highlights: [
      {
        title: 'Featured in TechCrunch',
        url: 'https://techcrunch.com/article',
        date: '2024-01-10'
      },
      {
        title: 'Product Hunt #1 Product of the Day',
        url: 'https://producthunt.com/posts/ecotrack',
        date: '2024-01-05'
      }
    ]
  },
  {
    id: 2,
    title: 'ArtMind - AI-Powered Creative Assistant',
    description: `ArtMind is a revolutionary AI-powered platform that helps artists overcome creative blocks and explore new artistic directions. It combines machine learning with traditional art principles to generate unique inspiration and suggestions.

Key Features:
• AI-generated mood boards and color palettes
• Style transfer experiments
• Creative prompt generator
• Virtual art gallery with community feedback
• Collaboration tools for artists`,
    images: [
      '/images/artmind-interface.jpg',
      '/images/artmind-gallery.jpg',
      '/images/artmind-generation.jpg',
      '/images/artmind-community.jpg'
    ],
    technologies: ['Next.js', 'Python', 'Stable Diffusion', 'WebGL', 'Firebase', 'Three.js'],
    liveUrl: 'https://artmind.ai',
    githubUrl: 'https://github.com/username/artmind',
    socialLinks: {
      facebook: 'https://facebook.com/artmind',
      instagram: 'https://instagram.com/artmind.ai',
      twitter: 'https://twitter.com/artmind',
      linkedin: 'https://linkedin.com/company/artmind'
    },
    likes: 256,
    views: 2890,
    comments: [
      {
        id: 1,
        author: 'Alex Thompson',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Alex',
        content: 'This tool has completely transformed my creative process. The AI suggestions are incredibly inspiring!',
        timestamp: '2024-01-16T10:20:00Z',
        likes: 10
      }
    ],
    highlights: [
      {
        title: 'Featured in Wired',
        url: 'https://wired.com/article',
        date: '2024-01-12'
      },
      {
        title: 'Product Hunt #1 Product of the Day',
        url: 'https://producthunt.com/posts/artmind',
        date: '2024-01-07'
      }
    ]
  },
  {
    id: 3,
    title: 'SoundScape - Interactive Music Experience',
    description: `SoundScape transforms your surroundings into an interactive musical experience. Using computer vision and spatial audio, it creates dynamic soundscapes based on your movement and environment.

Highlights:
• Motion-reactive sound generation
• Environmental sound integration
• Collaborative music creation
• Virtual instrument simulation
• Spatial audio experiences`,
    images: [
      '/images/soundscape-experience.jpg',
      '/images/soundscape-interface.jpg',
      '/images/soundscape-performance.jpg',
      '/images/soundscape-installation.jpg'
    ],
    technologies: ['Three.js', 'TensorFlow.js', 'Web Audio API', 'WebGL', 'Socket.io', 'MediaPipe'],
    liveUrl: 'https://soundscape-demo.vercel.app',
    githubUrl: 'https://github.com/username/soundscape',
    socialLinks: {
      facebook: 'https://facebook.com/soundscape',
      instagram: 'https://instagram.com/soundscape.ai',
      twitter: 'https://twitter.com/soundscape',
      linkedin: 'https://linkedin.com/company/soundscape'
    },
    likes: 189,
    views: 1567,
    comments: [
      {
        id: 1,
        author: 'Emma Wilson',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Emma',
        content: 'Performed with this at our gallery opening. The audience was mesmerized!',
        timestamp: '2024-01-10T19:15:00Z',
        likes: 7
      },
      {
        id: 2,
        author: 'David Kim',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=David',
        content: 'The spatial audio implementation is incredible. Creates such immersive experiences.',
        timestamp: '2024-01-12T14:30:00Z',
        likes: 5
      }
    ],
    highlights: [
      {
        title: 'Featured in Rolling Stone',
        url: 'https://rollingstone.com/article',
        date: '2024-01-11'
      },
      {
        title: 'Product Hunt #1 Product of the Day',
        url: 'https://producthunt.com/posts/soundscape',
        date: '2024-01-06'
      }
    ]
  }
];

export default function handler(req, res) {
  const { id } = req.query;
  
  try {
    const project = projects.find(p => p.id === parseInt(id));
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project data' });
  }
} 