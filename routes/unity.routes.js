module.exports = app => {
  const unities = require("../controllers/unity.controller");
  const { authJwt } = require("../middlewares");
  var router = require("express").Router();

  console.log(router);
  // Create a new unities
  router.post("/",unities.create);
  // Retrieve all unities
  router.get("/", unities.findAll);
  // Retrieve all unities by proyects
  router.get("/proyect/:id",unities.findByProyect)
  // Delete a unities with id
  router.delete("/:id", unities.delete);

 app.use('/api/unities', router);
};