const handlePost = require('../controllers/register.controller');

module.exports = app => {
  app.route('/register').post((req, res) => {
    handlePost(req, res);
  });
};
