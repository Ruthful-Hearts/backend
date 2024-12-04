const { Hono } = require('hono');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../validations/authSchema');

const authRoutes = new Hono();

authRoutes.post('/register', validationMiddleware(registerSchema),authController.registerUser);
authRoutes.post('/login',validationMiddleware(loginSchema) ,authController.loginUser);
authRoutes.get('/profile',authMiddleware, authController.getProfile);

module.exports = authRoutes;
