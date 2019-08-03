var authController = require('../controllers/auth');

module.exports = { setupAuthRoutes };

function setupAuthRoutes(router) {
  router.get('/user', authController.getCachedUser);
  router.post('/login', authController.login);
  router.post('/register', authController.register);
}
