// Array of creative usernames for anonymous comments
const creativeUsernames = [
  'InnovativeMind',
  'DigitalDreamer',
  'TechArtisan',
  'CreativeSpirit',
  'PixelPioneer',
  'WebWanderer',
  'CodePoet',
  'DesignNinja',
  'FutureBuilder',
  'CyberCreator'
];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Comment content is required' });
  }

  try {
    // Generate a random username for anonymous comments
    const randomUsername = creativeUsernames[Math.floor(Math.random() * creativeUsernames.length)];
    
    // Create a new comment with more engaging metadata
    const newComment = {
      id: Date.now(),
      content,
      author: randomUsername,
      timestamp: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${randomUsername}`, // Generate unique avatar
      likes: 0,
      isNew: true
    };

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error posting comment' });
  }
} 