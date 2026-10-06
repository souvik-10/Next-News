import app from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';

const startServer = async () => {
  // Connect to Database
  await connectDB();

  const PORT = ENV.PORT;
  app.listen(PORT, () => {
    console.log(`[Next News Server] Running on http://localhost:${PORT} in ${ENV.NODE_ENV} mode`);
  });
};

startServer();
