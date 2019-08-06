const ChannelModel = require("../models/channel");

const create = async (req, res) => {
  try {
    const savedChannel = await ChannelModel.create(req.body);
    if (savedChannel) {
      res.json({ savedChannel, message: "Channel successfuly created !" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create channel !" });
  }
};

module.exports = { create, getAll };
