import app from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';
import { seedDatabaseIfEmpty } from './utils/seedData';

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Seed sample data if database is empty
  await seedDatabaseIfEmpty();

  const PORT = ENV.PORT;
  app.listen(PORT, () => {
    console.log(`[Next News Server] Running on http://localhost:${PORT} in ${ENV.NODE_ENV} mode`);
  });
};

startServer();
