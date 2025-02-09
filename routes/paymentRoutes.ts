import { Hono } from "hono";
import * as paymentController from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const paymentRoutes = new Hono();

// Apply auth middleware to all payment routes
paymentRoutes.use("*", authMiddleware);

// Initialize payment
paymentRoutes.post("/initialize", paymentController.initializePayment);

// Verify payment
paymentRoutes.get("/verify/:txRef", paymentController.verifyPayment);

export default paymentRoutes;
