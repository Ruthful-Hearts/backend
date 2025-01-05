// const { serve } = require('@hono/node-server');
import { serve } from "@hono/node-server"
import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

serve(app, (info) => {
  console.log(`🌐 Server is running at http://localhost:${info.port}`);
});
