const channelController = require('../controllers/channels');

module.exports = { setupChannelRoutes };

function setupChannelRoutes(router) {
  router.post('/channel', channelController.create);
  router.get('/channel/:id', channelController.getUserChannels);
}
