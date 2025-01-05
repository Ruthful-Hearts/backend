import { Hono } from "hono";

const storeRoutes = new Hono();

storeRoutes.post("/create", (ctx) => ctx.text("Store created!"));
storeRoutes.get("/read", (ctx) => ctx.text("Store details!"));
storeRoutes.put("/update", (ctx) => ctx.text("Store updated!"));
storeRoutes.delete("/delete", (ctx) => ctx.text("Store deleted!"));

export default storeRoutes;
