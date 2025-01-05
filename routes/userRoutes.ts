const { Hono } = require('hono');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const userRoutes = new Hono();

userRoutes.use('*', authenticate);

userRoutes.get('/', authorizeRoles(['admin']), userController.getAllUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.put('/:id', userController.updateUserProfile);
userRoutes.delete('/:id', authorizeRoles(['admin']), userController.deleteUser);

module.exports = userRoutes;
