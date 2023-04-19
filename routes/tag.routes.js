module.exports = app => {
    const tags = require("../controllers/tag.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new tags
    router.post("/",tags.create);
    // Retrieve all tags
    router.get("/", tags.findAll);
    // Retrieve all tags by category
    router.get("/category/:id", tags.findByCategory);
    // Delete a tags with id
    router.delete("/:id", tags.delete);
    // Update a Tag with id
    router.put('/:id', tags.update);


    app.use('/api/tags', [authJwt.verifyToken, authJwt.isAdminOrTeacher], router);
  };