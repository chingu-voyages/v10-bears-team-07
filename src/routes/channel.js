const channelController = require("../controllers/channel");

module.exports = { setupChannelRoutes };

function setupChannelRoutes(router) {
  router.post("/channel", channelController.create);
}
