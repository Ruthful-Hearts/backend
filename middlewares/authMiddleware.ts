import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface JWTPayload {
  id: string;
  role: string;
}

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return c.json({ error: 'Access denied. No token provided.' }, 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
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

export const authorizeRoles = (allowedRoles: string[]) => {
  return async (c: Context, next: Next) => {
    try {
      const user = c.get('user') as JWTPayload;
      
      if (!user || !allowedRoles.includes(user.role)) {
        return c.json({ 
          error: 'Access denied. You do not have permission to perform this action.' 
        }, 403);
      }

      await next();
    } catch (error) {
      return c.json({ error: 'Authorization failed.' }, 403);
    }
  };
};

export default authMiddleware;
