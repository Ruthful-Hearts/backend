import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const authMiddleware = async (c: Context, next: Next) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return c.json({ error: 'Access denied. No token provided.' }, 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    c.set('user', decoded);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return c.json({ error: 'User not found.' }, 404);
    }

    c.set('userDocument', user);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid or expired token.' }, 401);
  }
};

export default authMiddleware;
