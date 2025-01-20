import { cors } from 'hono/cors';

const corsMiddleware = cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Requested-With'],
  credentials: true,
  maxAge: 3600,
});

export default corsMiddleware; 