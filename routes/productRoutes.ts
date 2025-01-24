import { Hono } from "hono";
import * as productController from "../controllers/productController";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware";

const productRoutes = new Hono();

// Public routes
productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:id", productController.getProduct);
productRoutes.get("/store/:storeId", productController.getStoreProducts);

// Protected routes
productRoutes.use("*", authMiddleware);

// Store owner routes
productRoutes.post("/create", 
  authorizeRoles(["store_owner"]), 
  productController.createProduct
);
productRoutes.put("/:id", 
  authorizeRoles(["store_owner"]), 
  productController.updateProduct
);
productRoutes.delete("/:id", 
  authorizeRoles(["store_owner"]), 
  productController.deleteProduct
);

// Admin routes
productRoutes.put("/:id/status", 
  authorizeRoles(["admin"]), 
  productController.toggleProductStatus
);

export default productRoutes;
