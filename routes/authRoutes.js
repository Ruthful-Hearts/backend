const { Hono } = require('hono');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const authRoutes = new Hono();

authRoutes.post('/register', authController.registerUser);
authRoutes.post('/login', authController.loginUser);
authRoutes.get('/profile',authMiddleware, authController.getProfile);

module.exports = authRoutes;
