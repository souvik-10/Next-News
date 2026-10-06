import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('[Database Error] Failed to connect to MongoDB:', error);
    // In production/dev, we handle connection retries or surface errors
  }
};
