const handlePost = require("../controllers/register");

module.exports = app => {
  app.post("/register", handlePost);
};
