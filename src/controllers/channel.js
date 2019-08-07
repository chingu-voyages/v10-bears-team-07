const ChannelModel = require('../models/channel');

const create = async (req, res) => {
  try {
    const savedChannel = await ChannelModel.create(req.body);
    if (savedChannel) {
      res.json({ savedChannel, message: 'Channel successfuly created !' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create channel !' });
  }
};

const getUserChannels = async (req, res) => {
  try {
    const channels = await ChannelModel.find({ ownerId: req.params.id });
    res.send(channels);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve channels' });
  }
};

module.exports = { create, getUserChannels };
