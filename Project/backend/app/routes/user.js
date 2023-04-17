var router = require("express").Router();
// const db = require("../models");
// const Users = db.users;
const users = require("../controllers/user");
// const multer = require('multer');
module.exports = (app) => {
  // const storage = multer.diskStorage({
  //     destination: function (req, file, cb) {
  //         cb(null, './uploads');
  //     },
  //     filename: function (req, file, cb) {

  //         cb(null, Date.now() + file.originalname);
  //     }
  // });
  // const upload = multer({ storage: storage });

  // profile image upload

  // Create a new Tutorial
  router.post("/", users.create);

  // Retrieve all users
  router.get("/admin", users.findAll);

  // profile image upload

  // Retrieve all published Tutorials
  // router.get("/published", users.findAllPublished);

  // Retrieve a single user with id
  router.get("/:id", users.findUser);

  // Retrieve a single profile image
  router.get("/photo/:id", users.photo);

  // Update a Tutorial with id
  router.put("/:id", users.update);
  // router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Delete all Tutorials
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
