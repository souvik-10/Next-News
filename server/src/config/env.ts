import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/next-news',
  JWT_SECRET: process.env.JWT_SECRET || 'next_news_super_secret_jwt_key_2026',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
