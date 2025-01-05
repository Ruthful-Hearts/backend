import { Hono } from "hono";

const productRoutes = new Hono();

productRoutes.post("/create", (ctx) => ctx.text("Product created!"));
productRoutes.get("/read", (ctx) => ctx.text("Product details!"));
productRoutes.put("/update", (ctx) => ctx.text("Product updated!"));
productRoutes.delete("/delete", (ctx) => ctx.text("Product deleted!"));

export default productRoutes;
