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
    console.log(err);
  }
};
