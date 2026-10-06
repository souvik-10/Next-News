import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { ENV } from './config/env';

// Route Imports
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import articleRoutes from './routes/articleRoutes';
import commentRoutes from './routes/commentRoutes';
import watchlistRoutes from './routes/watchlistRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app: Application = express();

// Core Middleware
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads (avatars)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/articles/:articleId/comments', commentRoutes);
app.use('/api/v1/watchlist', watchlistRoutes);

// Base Health Check Endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Next News API server operational',
    timestamp: new Date().toISOString()
  });
});

// Fallback 404 handler for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error Handling Middleware
app.use(errorHandler);

export default app;
