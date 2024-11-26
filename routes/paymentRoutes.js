const { Hono } = require('hono');

const paymentRoutes = new Hono();

paymentRoutes.post('/create', (ctx) => ctx.text('Payment created!'));
paymentRoutes.get('/read', (ctx) => ctx.text('Payment details!'));
paymentRoutes.put('/update', (ctx) => ctx.text('Payment updated!'));
paymentRoutes.delete('/delete', (ctx) => ctx.text('Payment deleted!'));

module.exports = paymentRoutes;
