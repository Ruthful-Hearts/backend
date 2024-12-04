const { Hono } = require('hono');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const notfoundMiddleware = require('./middlewares/notfoundMiddleware');
const rateLimiterMiddleware = require('./middlewares/rateLimiterMiddleware');
const notFoundHandler = require('./middleware/notFoundMiddleware');
const { generalRateLimiter } = require('./middleware/rateLimiterMiddleware');
const securityMiddleware = require('./middleware/securityMiddleware');
const compressionMiddleware = require('./middleware/compressionMiddleware');
const httpLogger = require('./middleware/httpLogger');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = new Hono();
securityMiddleware(app);
app.use('*', loggingMiddleware);
app.use('*', notfoundMiddleware);
app.use('*', rateLimiterMiddleware);
app.use('*', httpLogger);
app.use('*', generalRateLimiter);
app.use('*', compressionMiddleware);

app.route('/auth', authRoutes);
app.route('/stores', storeRoutes);
app.route('/admin', adminRoutes);
app.route('/order', orderRoutes);
app.route('/payment', paymentRoutes);
app.route('/product', productRoutes);
app.route('/review', reviewRoutes);
app.all('*', notFoundHandler);

app.onError('*', errorHandlingMiddleware);

// Default route for health checks
app.get('/', (ctx) => ctx.text('Ruthful Merch Store Backend is running 🚀'));

module.exports = app;
