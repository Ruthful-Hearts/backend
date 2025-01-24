import { Hono } from "hono";
import * as storeController from "../controllers/storeController";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware";

const storeRoutes = new Hono();

// Apply auth middleware to all store routes
storeRoutes.use("*", authMiddleware);

// Store owner routes
storeRoutes.post("/create", storeController.createStore);
storeRoutes.get("/my-store", storeController.getMyStore);
storeRoutes.put("/update", storeController.updateStore);

// Public routes
storeRoutes.get("/:id", storeController.getStore);
storeRoutes.get("/", storeController.getAllStores);

// Admin routes
storeRoutes.put("/:id/approve", 
  authorizeRoles(["admin"]), 
  storeController.approveStore
);
storeRoutes.put("/:id/deactivate", 
  authorizeRoles(["admin"]), 
  storeController.deactivateStore
);
storeRoutes.delete("/:id", 
  authorizeRoles(["admin"]), 
  storeController.deleteStore
);

export default storeRoutes;
