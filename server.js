import { notfound, errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';
import postRoutes from './routes/postRoutes.js';
import protect from './middleware/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import connectDB from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Middleware
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.get('/api/test', protect, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user,
  });
});
//Test route
app.get('/', (req, res) => {
  res.send('Api is running.......');
});

app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//Connect DB
connectDB();
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port: ${PORT}`);
});
