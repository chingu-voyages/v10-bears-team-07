const channelsController = require('../controllers/channels');

module.exports = function setupChannelsRoutes(router) {
  router.get('/', channelsController.findByNameMatch);
  router.get('/user/:id', channelsController.getUserChannels);
  router.post('/', channelsController.create);
};
