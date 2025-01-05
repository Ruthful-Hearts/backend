import { Hono } from "hono";
import authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import validationMiddleware from "../middlewares/validationMiddleware";
import { registerSchema, loginSchema } from "../validations/authSchema";

const authRoutes = new Hono();

authRoutes.post("/register", authController.registerUser);
authRoutes.post(
	"/login",
	validationMiddleware(loginSchema),
	authController.loginUser,
);
authRoutes.get("/profile", authMiddleware, authController.getProfile);

export default authRoutes;
