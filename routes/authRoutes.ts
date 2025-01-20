import { Hono } from "hono";
import * as authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const authRoutes = new Hono();

authRoutes.post("/register", async (c) => await authController.registerUser(c));
authRoutes.post("/login", async (c) => await authController.loginUser(c));
authRoutes.get("/profile", authMiddleware, async (c) => await authController.getProfile(c));

export default authRoutes;
