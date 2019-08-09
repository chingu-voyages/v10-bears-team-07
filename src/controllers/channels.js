const ChannelModel = require('../models/channel');

module.exports = { create, getUserChannels };

async function create(req, res) {
  const existingChannel = await ChannelModel.findOne({ name: req.body.name });

  if (existingChannel) {
    return res.json({ error: 'The channel already exists.' });
  }

  try {
    const channel = await ChannelModel.create(req.body);
    res.json({ channel });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create channel !' });
  }
}

async function getUserChannels(req, res) {
  try {
    const channels = await ChannelModel.find().or(
      { ownerId: req.params.id },
      { members: req.params.id }
    );
    res.json({ channels });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve channels' });
  }
}
