const { serve } = require('@hono/node-server');
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config(); 

connectDB();

const PORT = process.env.PORT || 3000;

serve(app, (info) => {
  console.log(`🌐 Server is running at http://localhost:${info.port}`);
});
