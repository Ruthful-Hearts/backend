import { Hono } from "hono";

const reviewRoutes = new Hono();

reviewRoutes.post("/create", (ctx) => ctx.text("Review created!"));
reviewRoutes.get("/read", (ctx) => ctx.text("Review details!"));
reviewRoutes.put("/update", (ctx) => ctx.text("Review updated!"));
reviewRoutes.delete("/delete", (ctx) => ctx.text("Review deleted!"));

export default reviewRoutes;
