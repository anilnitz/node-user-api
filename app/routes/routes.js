module.exports = app => {
  const home = require("../controllers/homeController.js");
  var router = require("express").Router();
  // Create a new user
  router.post("/register", home.register);
  // Create a new home
  router.post("/login", home.login);
  // Retrieve all user
  router.get("/getalluser", home.findAll);
  // Retrieve a single user with id
  router.get("/getuserdetails/:id", home.findOne);
  // Update a user with id
  router.put("/:id", home.update);
  // Delete a user with id
  router.delete("/:id", home.delete);
  // Delete all user
  router.delete("/", home.deleteAll);
  app.use('/api', router);
};