module.exports = app => {
  const questions = require("../controllers/question.controller");
  const { authJwt } = require("../middlewares");
  var router = require("express").Router();
  // Create a new question
  router.post("/",questions.create);
  // Retrieve all questions
  router.get("/", questions.findAll);
  // Retrieve a single question with id
  router.get("/activity/:id",questions.findByQuestion);
  // Delete a questions with id
  router.delete("/:id", questions.delete);

  app.use('/api/questions',router);
};