import { Hono } from "hono";
// const loggingMiddleware = require('./middlewares/loggingMiddleware');
// const notfoundMiddleware = require('./middlewares/notfoundMiddleware');
// const rateLimiterMiddleware = require('./middlewares/rateLimiterMiddleware');
const notFoundHandler = require('./middlewares/notfoundMiddleware');
// const { generalRateLimiter } = require('./middleware/rateLimiterMiddleware');
// const securityMiddleware = require('./middlewares/securityMiddleware');
// const compressionMiddleware = require('./middleware/compressionMiddleware');
// import httpLogger from "./middlewares/httpLogger";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import storeRoutes from "./routes/storeRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import { auth } from "./utils/auth";

const app = new Hono();
// securityMiddleware(app);
// app.use('*', loggingMiddleware);
// app.use('*', notfoundMiddleware);
// app.use('*', rateLimiterMiddleware);
// app.use('*', httpLogger);
// app.use('*', generalRateLimiter);
// app.use('*', compressionMiddleware);

// Apply CORS middleware globally
app.use("*", corsMiddleware);

// Other auth routes
app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

app.route("/auth", authRoutes);
app.route("/user", userRoutes);
app.route("/stores", storeRoutes);
app.route("/orders", orderRoutes);
app.route("/products", productRoutes);
app.route("/payments", paymentRoutes);
app.route("/review", reviewRoutes);
// app.all('*', notFoundHandler);

app.onError(errorHandlingMiddleware);

// Default route for health checks
app.get("/", (ctx) => ctx.text("Ruthful Merch Store Backend is running 🚀"));

export default app;
