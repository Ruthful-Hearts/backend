import { Hono } from "hono";
// const loggingMiddleware = require('./middlewares/loggingMiddleware');
// const notfoundMiddleware = require('./middlewares/notfoundMiddleware');
// const rateLimiterMiddleware = require('./middlewares/rateLimiterMiddleware');
// const notFoundHandler = require('./middlewares/notfoundMiddleware');
// const { generalRateLimiter } = require('./middleware/rateLimiterMiddleware');
// const securityMiddleware = require('./middlewares/securityMiddleware');
// const compressionMiddleware = require('./middleware/compressionMiddleware');
// import httpLogger from "./middlewares/httpLogger";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import storeRoutes from "./routes/storeRoutes";
import adminRoutes from "./routes/adminRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";

const app = new Hono();
// securityMiddleware(app);
// app.use('*', loggingMiddleware);
// app.use('*', notfoundMiddleware);
// app.use('*', rateLimiterMiddleware);
// app.use('*', httpLogger);
// app.use('*', generalRateLimiter);
// app.use('*', compressionMiddleware);

// Apply CORS middleware globally
app.use('*', corsMiddleware);

app.route("/auth", authRoutes);
app.route("/user", userRoutes);
app.route("/stores", storeRoutes);
app.route("/admin", adminRoutes);
app.route("/order", orderRoutes);
app.route("/payment", paymentRoutes);
app.route("/product", productRoutes);
app.route("/review", reviewRoutes);
// app.all('*', notFoundHandler);

app.onError(errorHandlingMiddleware);

// Default route for health checks
app.get("/", (ctx) => ctx.text("Ruthful Merch Store Backend is running 🚀"));

export default app;
