import { Hono } from "hono";
import * as orderController from "../controllers/orderController";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware";

const orderRoutes = new Hono();

orderRoutes.use("*", authMiddleware);

orderRoutes.post("/create", orderController.createOrder);
orderRoutes.get("/my-orders", orderController.getUserOrders);
orderRoutes.get("/code/:orderCode", orderController.getOrderByCode);
orderRoutes.get("/:id", orderController.getOrder);

orderRoutes.get("/store/:storeId", 
  authorizeRoles(["store_owner", "admin"]), 
  orderController.getStoreOrders
);

orderRoutes.post("/complete", 
  authorizeRoles(["store_owner", "admin", "staff"]), 
  orderController.completeOrder
);

orderRoutes.put("/:id", 
  authorizeRoles(["admin"]), 
  orderController.updateOrder
);

export default orderRoutes;
