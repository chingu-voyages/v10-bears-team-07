var omit = require('lodash.omit');
var jwt = require('jsonwebtoken');
var UserModel = require('../models/user');

module.exports = { getCachedUser, login, register };

async function getCachedUser(req, res) {
  // Check if a token has been sent with the request
  // Can be extracted into a middleware
  var { authorization } = req.headers;

  if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
    return res.status(401).send();
  }

  var token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'secret';

  try {
    var decodedUser = await jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).send();
  }

  return res.json({
    user: {
      ...userToJSON(decodedUser),
      token
    }
  });
}

async function login(req, res) {
  var { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send();
  }

  try {
    var user = await UserModel.findOne({ email });
  } catch (error) {
    return res.status(500).json({ error: 'internal server error' });
  }

  if (!user || !(await user.comparePassword(password))) {
    return res.json({ error: 'invalid credentials' });
  }

  return res.json({
    user: {
      ...userToJSON(user.toObject({ virtuals: true })),
      token: getUserToken(user)
    }
  });
}

async function register(req, res) {
  try {
    const savedUser = await UserModel.create(req.body);
    if (savedUser) {
      res.json({
        user: {
          ...userToJSON(savedUser.toObject({ virtuals: true })),
          token: getUserToken(savedUser)
        },
        message: 'Bravo, you have been successfuly registered!'
      });
    }
  } catch (err) {
    let errorData;
    if (err.name == 'MongoError' && err.code == 11000) {
      if (err.errmsg.includes('username')) {
        errorData = {
          field: 'username',
          message: 'This username already exists. Please choose another one'
        };
      }
      if (err.errmsg.includes('email')) {
        errorData = {
          field: 'email',
          message: 'This email already exists !'
        };
      }

      res.status(400).json(errorData);
    } else if (err.name == 'ValidationError') {
      errorData = { message: 'Failed to validate your inputs !' };
      res.status(400).json(errorData);
    } else {
      res
        .status(500)
        .json({ message: 'Failed to register user for unknown reasons !' });
    }
  }
}

// Helpers **************************
function getUserToken({ id, email, username }) {
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.sign(
    {
      id,
      email,
      username
    },
    secret,
    { expiresIn: '90d' }
  );
}

function userToJSON(user) {
  return omit(user, ['__v', '_id', 'exp', 'iat', 'password']);
}
