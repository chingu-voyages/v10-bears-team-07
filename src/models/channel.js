const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const channelSchema = new mongoose.Schema(
  {
    ownerId: {
      type: ObjectId,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'The channel name is required !'],
      index: { unique: true },
      minlength: [3, 'The channel name must contain at least 3 characters !']
    },
    description: {
      type: String,
      trim: true,
      maxLength: [150, 'The description must contain at most 150 characters']
    },
    tags: [{ type: String, trim: true }],
    members: [ObjectId],
    messages: [
      {
        authorId: ObjectId,
        text: { type: String, trim: true },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChannelModel', ChannelSchema);
