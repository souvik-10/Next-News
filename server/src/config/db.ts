import mongoose from 'mongoose';
import { ENV } from './env';

// Disable command buffering when disconnected so requests do not hang
mongoose.set('bufferCommands', false);

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('[Database Warning] MongoDB connection failed or offline. Server running in API mode.');
  }
};
