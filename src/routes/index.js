/* eslint-disable new-cap */
var express = require('express');
var setupAuthRoutes = require('./auth');
var setupChannelsRoutes = require('./channels');

module.exports = function setupRoutes(app) {
  var authRouter = express.Router();
  setupAuthRoutes(authRouter);
  app.use('/api/auth', authRouter);

  var channelsRouter = express.Router();
  setupChannelsRoutes(channelsRouter);
  app.use('/api/channels', channelsRouter);
};
