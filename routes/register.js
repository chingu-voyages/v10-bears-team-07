var authController = require('../controllers/auth');

module.exports = app => {
  app.post('/register', authController.register);
};
