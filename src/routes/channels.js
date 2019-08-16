const channelsController = require('../controllers/channels');

module.exports = function setupChannelsRoutes(router) {
  router.get('/', channelsController.findByNameMatch);
  router.get('/user/:id', channelsController.getUserChannels);
  router.get('/:id', channelsController.getMessages);
  router.post('/', channelsController.create);
  router.put('/:channelId/:userId', channelsController.addMember);
  router.put('/:channelId', channelsController.updateChannelMessages);
};
