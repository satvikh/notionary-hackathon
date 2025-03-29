const { fetchFullNotes } = require('../services/notionService');

const getNotes = async (req, res) => {
  try {
    const notes = await fetchFullNotes();
    res.json(notes);
  } catch (error) {
    console.error('❌ Error fetching notes:', error.message);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

module.exports = { getNotes };
