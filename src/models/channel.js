const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ChannelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The channel name is required !'],
      index: { unique: true },
      minlength: [2, 'The channel name must contain at least 2 characters !']
    },
    ownerId: {
      type: ObjectId,
      required: true
    },
    tags: [String],
    members: [ObjectId],
    messages: [
      {
        authorId: ObjectId,
        text: String,
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
