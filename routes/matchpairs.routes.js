module.exports = app => {
    const matchpairs = require("../controllers/matchpairs.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new matchpairs
    router.post("/",matchpairs.create);
    // Retrieve all matchpairs
    router.get("/", matchpairs.findAll);
    // Delete a matchpairs with id
    router.delete("/:id", matchpairs.delete);
    // Retrieve matchpairs by tittle
    router.get('/matchpairs/:title', matchpairs.findByTitle); // Nueva ruta
    // Update a matchpairs with id
    router.put("/:id", matchpairs.update);
      // Retrieve a single matchpairs with id
    router.get("/:id", matchpairs.findOne);

    app.use('/api/matchpairs', [authJwt.verifyToken, authJwt.isAdminOrTeacher], router);
  };