import { Hono } from "hono";
import * as userController from "../controllers/userController";
import * as authorizeRoles from "../middlewares/roleMiddleware";
import * as authenticate from "../middlewares/authMiddleware";

const userRoutes = new Hono();

// userRoutes.use("*", authenticate);

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
