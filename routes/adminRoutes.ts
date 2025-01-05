import { Hono } from "hono";

const adminRoutes = new Hono();

adminRoutes.post("/create", (ctx) => ctx.text("Admin created!"));
adminRoutes.get("/read", (ctx) => ctx.text("Admin details!"));
adminRoutes.put("/update", (ctx) => ctx.text("Admin updated!"));
adminRoutes.delete("/delete", (ctx) => ctx.text("Admin deleted!"));

export default adminRoutes;
