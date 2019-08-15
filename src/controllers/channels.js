const ChannelModel = require("../models/channel");

module.exports = {
  create,
  getUserChannels,
  findByNameMatch,
  addMember,
  getMessages,
  updateChannelMessages
};

async function create(req, res) {
  const existingChannel = await ChannelModel.findOne({ name: req.body.name });

  if (existingChannel) {
    return res.json({ error: "The channel already exists." });
  }

  try {
    const channel = await ChannelModel.create(req.body);
    res.json({ channel });
  } catch (err) {
    res.status(500).json({ error: "Failed to create channel !" });
  }
}

async function getUserChannels(req, res) {
  try {
    const channels = await ChannelModel.find({
      $or: [{ ownerId: req.params.id }, { members: req.params.id }]
    });
    res.json({ channels });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve channels" });
  }
}

async function findByNameMatch(req, res) {
  const { userId, keyword } = req.query;
  const nameMatch = new RegExp(keyword, "i");

  try {
    var channels = await ChannelModel.find({ name: nameMatch })
      .nor([{ ownerId: userId }, { members: userId }])
      .lean();
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }

  return res.json({ channels });
}

async function addMember(req, res) {
  try {
    const channel = await ChannelModel.findOneAndUpdate(
      { _id: req.params.channelId },
      { $addToSet: { members: req.params.userId } },
      { new: true }
    );
    res.json({ channel });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve channels" });
  }
}

async function updateChannelMessages(req, res) {
  try {
    const channel = await ChannelModel.findOneAndUpdate(
      { _id: req.params.channelId },
      { $addToSet: { messages: req.body } },
      { new: true }
    );
    res.json({ channel });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve channels" });
  }
}

async function getMessages(req, res) {
  try {
    const channel = await ChannelModel.findById(req.params.id, "messages").sort(
      { createdAt: "asc" }
    );
    const messages = channel.messages;
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
}
