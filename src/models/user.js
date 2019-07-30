const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'The username is required !'],
      trim: true,
      index: { unique: true },
      minlength: [3, 'The username must contain at least 3 characters !']
    },
    email: {
      type: String,
      required: [true, 'The email is required'],
      trim: true,
      index: { unique: true },
      lowercase: true,
      validate: {
        validator: emailValidator.validate,
        message: props => `${props.value} is not a valid email address`
      }
    },
    password: {
      type: String,
      required: [true, 'The password is required !'],
      minlength: [8, 'The password must contain at least 8 characters !']
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function() {
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
});

userSchema.methods.comparePassword = function(plainTextPassword) {
  return bcrypt.compare(plainTextPassword, this.password);
};

module.exports = mongoose.model('user', userSchema);
