export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    // In a real application, you would update this in your database
    // For now, we'll just return a success response
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error updating view count' });
  }
} 