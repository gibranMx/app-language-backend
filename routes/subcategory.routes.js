module.exports = app => {
    const subcategories = require("../controllers/subcategory.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new Answer
    router.post("/",subcategories.create);
    // Retrieve all Answers
    router.get("/", subcategories.findAll);
    // Retrieve all lesson by unity
    router.get("/categories/:id", subcategories.findByCategory);
    // Delete a lessons with id
    router.delete("/:id", subcategories.delete);

    app.use('/api/subcategories', [authJwt.verifyToken, authJwt.isAdminOrTeacher], router);
  };