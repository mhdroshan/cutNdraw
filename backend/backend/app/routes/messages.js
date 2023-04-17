var router = require("express").Router();
// const db = require("../models");
const messages = require("../controllers/message");

module.exports = (app) => {
  router.post("/", messages.addmessage);
  // Retrieve all messages
  router.get("/one/:id", messages.findAll);
  router.get("/all/:sid/:rid/:pid", messages.findAllByUser);
  router.get("/home/:sid/:rid/:pid", messages.findAllByUserHome);
  router.get("/allPro/:pid/:uid", messages.findAllByProd);
  // router.get("/all/:Uid", messages.findAllByUser);

  //   router.get("/getbyUser/:user", products.findAllByUser);
  //   router.get("/getbyType/:type", products.findAllByCollection);

  // // profile image upload

  // // Retrieve all published Tutorials
  // // router.get("/published", users.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", users.findOne);
  //   router.get("/photo/:id", products.photo);

  // // Update a Tutorial with id
  // router.put("/:id", users.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", users.delete);

  // // Delete all Tutorials
  // router.delete("/", users.deleteAll);

  app.use("/api/messages", router);
};
