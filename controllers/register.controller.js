const UserModel = require('../models/user.model');

module.exports = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const savedUser = await user.save();
    if (savedUser) {
      res.json({
        success: true,
        message: `Bravo, you have been successfuly registered!`
      });
    } else {
      res.json({
        success: false,
        message: `Failed to register user for unknown reasons !`
      });
    }
  } catch (err) {
    let errorData;
    if (err.name == 'MongoError' && err.code == 11000) {
      if (err.errmsg.includes('username')) {
        errorData = {
          success: false,
          field: 'username',
          message: 'This username already exists. Please choose another one'
        };
      }
      if (err.errmsg.includes('email')) {
        errorData = {
          success: false,
          field: 'email',
          message: 'This email already exists !'
        };
      }
    } else {
      console.log(err.name);
      errorData = { success: false, message: 'oops, an error occured !' };
    }

    res.json(errorData);
  }
};
