const handlePost = require("../controllers/register.controller");

module.exports = app => {
  app.post("/register", handlePost);
};
