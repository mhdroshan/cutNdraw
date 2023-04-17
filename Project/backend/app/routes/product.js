var router = require("express").Router();
// const db = require("../models");
const products = require("../controllers/product");

module.exports = (app) => {
  router.post("/", products.addproduct);
  router.put("/:id", products.updatepro);
  // router.put("/update", products.addproduct);
  // Retrieve all Tutorials
  router.get("/", products.findAll);
  router.get("/:id", products.findAllbyId);
  router.post("/rating/:id", products.addrating);
  router.get("/getbyUser/:user", products.findAllByUser);
  router.get("/getbyType/:type", products.findAllByCollection);

  // // profile image upload

  // // Retrieve all published Tutorials
  // // router.get("/published", users.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", users.findOne);
  router.get("/photo/:id", products.photo);

  // // Update a Tutorial with id
  // router.put("/:id", users.update);

  // // Delete a Tutorial with id
  router.delete("/:id", products.delete);

  // // Delete all Tutorials
  // router.delete("/", users.deleteAll);

  app.use("/api/products", router);
};
