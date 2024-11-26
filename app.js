const { Hono } = require('hono');
const corsMiddleware = require('./middlewares/corsMiddleware');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const notfoundMiddleware = require('./middlewares/notfoundMiddleware');
const rateLimiterMiddleware = require('./middlewares/rateLimiterMiddleware');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = new Hono();

app.use('*', corsMiddleware);
app.use('*', loggingMiddleware);
app.use('*', errorHandlingMiddleware);
app.use('*', notfoundMiddleware);
app.use('*', rateLimiterMiddleware);

app.route('/auth', authRoutes);
app.route('/stores', storeRoutes);
app.route('/admin', adminRoutes);
app.route('/order', orderRoutes);
app.route('/payment', paymentRoutes);
app.route('/product', productRoutes);
app.route('/review', reviewRoutes);

// Default route for health checks
app.get('/', (ctx) => ctx.text('Ruthful Merch Store Backend is running 🚀'));

module.exports = app;
