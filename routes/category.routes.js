module.exports = app => {
    const categories = require("../controllers/category.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new Answer
    router.post("/",categories.create);
    // Retrieve all Answers
    router.get("/", categories.findAll);
    // Delete a lessons with id
    router.delete("/:id", categories.delete);
    // Get all categories where parentCategory is null
    router.get('/parent', categories.findAllWithoutParent); // Nueva ruta
    // Retrieve categories by title
    router.get('/categories/:title', categories.findByTitle); // Nueva ruta
    // Delete all child categories
    router.delete('/categories/:id', categories.delete); // Nueva ruta
    // Update a category with id
    router.put("/:id", categories.update);

    app.use('/api/categories', [authJwt.verifyToken, authJwt.isAdminOrTeacher], router);
  };