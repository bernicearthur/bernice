// Mock database with blog post examples
const blogPosts = [
  {
    id: 1,
    title: 'How to Write Engaging Stories',
    content: `
      <p>Writing engaging stories is an art that combines creativity, technique, and understanding of human nature. In this blog post, we'll explore the essential elements that make a story captivating and memorable.</p>
      
      <h2>1. Start with a Hook</h2>
      <p>Your opening paragraph should grab the reader's attention immediately. Consider starting with an intriguing question, a shocking statement, or an vivid scene that pulls the reader into your world.</p>
      
      <h2>2. Develop Complex Characters</h2>
      <p>Characters are the heart of any story. They should be multi-dimensional, with their own desires, fears, and contradictions. Let your readers connect with them on an emotional level.</p>
    `,
    author: {
      name: 'Bernice Arthur',
      image: '/images/profile.jpg',
      bio: 'Writer, Storyteller, Creative Coach'
    },
    publishDate: '2023-10-01',
    category: 'Tutorials',
    readTime: '5 min',
    image: '/images/blog.jpg',
    likes: 120,
    comments: [
      {
        id: 1,
        author: 'John Doe',
        content: 'This was incredibly helpful! Thank you for sharing your insights.',
        date: '2023-10-02',
        replies: [
          {
            id: 1,
            author: 'Bernice Arthur',
            content: "Thank you, John! I'm glad you found it helpful.",
            date: '2023-10-02'
          }
        ]
      }
    ],
    views: 300,
    relatedPosts: [
      {
        id: 2,
        title: 'Character Development Tips',
        image: '/images/blog2.jpg',
        category: 'Writing Tips',
        likes: 85,
        comments: 12,
        views: 250,
        publishDate: '2023-09-28'
      },
      {
        id: 3,
        title: 'Finding Your Writing Voice',
        image: '/images/blog3.jpg',
        category: 'Personal',
        likes: 92,
        comments: 8,
        views: 180,
        publishDate: '2023-09-25'
      }
    ]
  }
  // Add more blog posts as needed
];

export default function handler(req, res) {
  const { id } = req.query;
  const blog = blogPosts.find(post => post.id === parseInt(id));

  if (!blog) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  res.status(200).json(blog);
}
