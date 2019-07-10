const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name !"],
    minlength: [2, "The name must contain at least two characters"]
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    minlength: [2, "The username must contain at least two characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, "Please provide a username"],
    minlength: [6, "The password's length must be greater than 5"]
  }
});

module.exports = mongoose.model("UserModel", userSchema);
