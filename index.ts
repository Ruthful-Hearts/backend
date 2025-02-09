// const { serve } = require('@hono/node-server');
import { serve } from "@hono/node-server"
import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    await serve({
      fetch: app.fetch,
      port: PORT
    }, (info) => {
      console.log(`Server is running on port ${info.port}`);
    });
  } catch (error: any) {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try using a different port.`);
      process.exit(1);
    }
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
