const { Hono } = require('hono');

const authRoutes = new Hono();

authRoutes.post('/register', (ctx) => ctx.text('User registered!'));
authRoutes.post('/login', (ctx) => ctx.text('User logged in!'));

module.exports = authRoutes;
