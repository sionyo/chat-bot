import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import chatRoutes from './routes/chatRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    'https://simoncontentgen20.netlify.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Health check with API status
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'AI Chatbot API is running!',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});