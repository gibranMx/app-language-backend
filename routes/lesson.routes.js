module.exports = app => {
    const lessons = require("../controllers/lesson.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new Answer
    router.post("/",lessons.create);
    // Retrieve all Answers
    router.get("/", lessons.findAll);
    // Retrieve all lesson by unity
    router.get("/unity/:id", lessons.findByUnity);
    // Delete a lessons with id
    router.delete("/:id", lessons.delete);

    app.use('/api/lessons', [authJwt.verifyToken, authJwt.isAdminOrTeacher], router);
  };