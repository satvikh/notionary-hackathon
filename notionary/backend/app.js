const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');

// Load environment variables
dotenv.config();

// Debug: log env variables safely
console.log('📦 NOTION_TOKEN prefix:', process.env.NOTION_TOKEN?.slice(0, 10) + '...');
console.log('📦 NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID);

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
