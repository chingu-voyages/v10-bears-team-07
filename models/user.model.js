const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 3
    },
    email: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 8
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
