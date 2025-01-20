import { Context } from 'hono';
import * as userService from "../services/userService";

export const registerUser = async (c: Context) => {
  try {
    const userData = await c.req.json();
    const user = await userService.createUser(userData);
    return c.json({ message: "User registered successfully", user }, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const { user, token } = await userService.authenticateUser(email, password);
    return c.json({ message: "Login successful", user, token }, 200);
  } catch (error) {
    return c.json({ error: error.message }, 401);
  }
};

export const getProfile = async (c: Context) => {
  try {
    const userId = c.get('user').id;
    const user = await userService.getUserById(userId);
    return c.json(user, 200);
  } catch (error) {
    return c.json({ error: error.message }, 404);
  }
};
