// Mock database with creative project examples
const ghanaianCities = [
  'Accra',
  'Kumasi',
  'Tamale',
  'Cape Coast',
  'Ho',
  'Koforidua',
  'Sunyani',
  'Wa',
  'Bolgatanga',
  'Techiman',
  'Tema',
  'Obuasi',
  'Winneba'
];

const projects = [
  {
    id: 1,
    title: 'Time Capsule',
    description: `A digital time capsule that preserves memories in an interactive 3D space. Users can create virtual memory rooms, embedding photos, videos, and stories in a spatial environment that evolves over time.`,
    images: [
      '/images/bg1.jpg',
      '/images/bg2.jpg',
      '/images/bg3.jpg',
      '/images/bg4.jpg'
    ],
    type: 'Archive',
    location: 'Kumasi',
    technologies: ['Three.js', 'WebGL', 'React Three Fiber', 'GSAP', 'Firebase', 'WebXR'],
    liveUrl: 'https://timecapsule.demo',
    githubUrl: 'https://github.com/username/time-capsule',
    likes: 328,
    views: 2405,
    date: '2024-01-15T08:30:00Z',
    featured: true,
    highlights: [
      'Interactive 3D environment',
      'Spatial audio storytelling',
      'VR/AR compatibility'
    ],
    status: 'experimental'
  },
  {
    id: 2,
    title: 'Story Weaver',
    description: `An AI-powered narrative platform that weaves together community stories into interactive digital tapestries. Each story contributes to a larger, interconnected narrative visualization.`,
    images: [
      '/images/bg5.jpg',
      '/images/bg6.jpg',
      '/images/bg7.jpg',
      '/images/bg8.jpg'
    ],
    type: 'Platform',
    location: 'Cape Coast',
    technologies: ['Next.js', 'GPT-4', 'D3.js', 'Web Audio API', 'MongoDB', 'WebGL'],
    liveUrl: 'https://storyweaver.ai',
    githubUrl: 'https://github.com/username/story-weaver',
    likes: 456,
    views: 3890,
    date: '2024-01-16T10:20:00Z',
    featured: true,
    highlights: [
      'Neural story generation',
      'Voice-activated interactions',
      'Real-time collaboration'
    ],
    status: 'live'
  },
  {
    id: 3,
    title: 'Heritage Lens',
    description: `An augmented reality platform that brings historical artifacts to life. Point your device at physical locations to reveal their hidden stories, archived memories, and cultural significance.`,
    images: [
      '/images/vintage.jpg',
      '/images/bg9.jpg',
      '/images/bg10.jpg'
    ],
    type: 'Archive',
    location: 'Accra',
    technologies: ['Unity', 'ARKit/ARCore', 'TensorFlow', 'Cloud Anchors', 'Photogrammetry'],
    liveUrl: 'https://heritage-lens.demo',
    githubUrl: 'https://github.com/username/heritage-lens',
    likes: 289,
    views: 1867,
    date: '2024-01-10T19:15:00Z',
    featured: false,
    highlights: [
      'AR storytelling',
      'Geospatial anchoring',
      'Community contributions'
    ],
    status: 'beta'
  },
  {
    id: 4,
    title: 'Echo Chamber',
    description: `An immersive audio documentation platform that captures and preserves the soundscapes of communities. Creates interactive sound maps and allows for collaborative sonic storytelling.`,
    images: [
      '/images/story.jpg',
      '/images/bg11.jpg',
      '/images/bg12.jpg'
    ],
    type: 'Documentation',
    location: 'Tamale',
    technologies: ['Web Audio API', 'React', 'Three.js', 'TensorFlow.js', 'WebRTC'],
    liveUrl: 'https://echo-chamber.demo',
    githubUrl: 'https://github.com/username/echo-chamber',
    likes: 245,
    views: 1580,
    date: '2024-01-05T14:30:00Z',
    featured: false,
    highlights: [
      'Spatial audio recording',
      'Sound visualization',
      'Collaborative mixing'
    ],
    status: 'alpha'
  },
  {
    id: 5,
    title: 'Memory Forge',
    description: `A generative art platform that transforms personal stories and memories into unique digital artworks. Uses AI to analyze emotional content and create abstract visualizations.`,
    images: [
      '/images/bg13.jpg',
      '/images/bg4.jpg',
      '/images/bg7.jpg'
    ],
    type: 'Platform',
    location: 'Ho',
    technologies: ['Stable Diffusion', 'P5.js', 'WebGL', 'React', 'Socket.io'],
    liveUrl: 'https://memory-forge.art',
    githubUrl: 'https://github.com/username/memory-forge',
    likes: 567,
    views: 4230,
    date: '2024-01-20T09:45:00Z',
    featured: true,
    highlights: [
      'Emotional AI analysis',
      'Generative animations',
      'NFT integration'
    ],
    status: 'live'
  }
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Add dynamic metadata
    const projectsWithMetadata = projects.map(project => ({
      ...project,
      location: project.location || ghanaianCities[Math.floor(Math.random() * ghanaianCities.length)],
      engagement: {
        trend: Math.random() > 0.5 ? 'rising' : 'stable',
        weeklyGrowth: Math.floor(Math.random() * 25) + 5,
        recentInteractions: Math.floor(Math.random() * 50) + 10
      },
      awards: project.featured ? [
        {
          title: 'Innovation Spotlight',
          date: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        },
        {
          title: 'Community Choice',
          date: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        }
      ] : [],
      collaborators: Math.floor(Math.random() * 10) + 2
    }));

    res.status(200).json(projectsWithMetadata);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
} 