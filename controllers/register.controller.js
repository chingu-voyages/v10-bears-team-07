const UserModel = require('../model/user.model');

module.exports = async (req, res) => {
  try {
    const savedUser = await UserModel.create(req.body);
    if (savedUser) {
      res.json({ message: 'Bravo, you have been successfuly registered!' });
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
};
