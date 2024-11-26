const { Hono } = require('hono');

const orderRoutes = new Hono();

orderRoutes.post('/register', (ctx) => ctx.text('User registered!'));
orderRoutes.post('/login', (ctx) => ctx.text('User logged in!'));
orderRoutes.post('/create', (ctx) => ctx.text('Order created!'));
orderRoutes.get('/read', (ctx) => ctx.text('Order details!'));
orderRoutes.put('/update', (ctx) => ctx.text('Order updated!'));
orderRoutes.delete('/delete', (ctx) => ctx.text('Order deleted!'));

module.exports = orderRoutes;
