module.exports = app => {
  const proyects = require("../controllers/proyect.controller");
  const { authJwt } = require("../middlewares");
  var router = require("express").Router();
  // Create a new Answer
  router.post("/",proyects.create);
  // Retrieve all Answers
  router.get("/", proyects.findAll);
  // Delete a proyects with id
  router.delete("/:id", proyects.delete);

 app.use('/api/proyects', router);
};