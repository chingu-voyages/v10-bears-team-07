const channelController = require('../controllers/channels');

module.exports = { setupChannelRoutes };

function setupChannelRoutes(router) {
  router.post('/', channelController.create);
  router.get('/user/:id', channelController.getUserChannels);
}
