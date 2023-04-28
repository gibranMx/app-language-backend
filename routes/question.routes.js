module.exports = app => {
  const questions = require("../controllers/question.controller");
  const { authJwt } = require("../middlewares");
  var router = require("express").Router();
  // Create a new question
  router.post("/",questions.create);
  // Retrieve all questions
  router.get("/", questions.findAll);
  // Retrieve a single question with id category
  router.get("/category/:id",questions.findByCategory);
  // Delete a questions with id
  router.delete("/:id", questions.delete);
  // Update a questions with id
  router.put('/:id', questions.update);

  app.use('/api/questions',[authJwt.verifyToken, authJwt.isAdminOrTeacher], router);
};