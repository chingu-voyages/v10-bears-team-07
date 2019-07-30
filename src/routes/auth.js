var authController = require('../controllers/auth');

module.exports = { setupAuthRoutes };

function setupAuthRoutes(router) {
  router.post('/login', authController.login);
  router.post('/register', authController.register);
}
