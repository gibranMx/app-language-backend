module.exports = app => {
    const subjects = require("../controllers/subject.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new Answer
    router.post("/",subjects.create);
    // Retrieve all Answers
    router.get("/", subjects.findAll);
    // Retrieve all lesson by unity
    router.get("/subcategory/:id", subjects.findBySubcategory);
    // Delete a lessons with id
    router.delete("/:id", subjects.delete);

    app.use('/api/subjects', [authJwt.verifyToken, authJwt.isAdminOrTeacher], router);
  };