module.exports = app => {
    const translations = require("../controllers/translation.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new phrase
    router.post("/",translations.create);
    // Retrieve all phrase
    router.get("/", translations.findAll);
    // Delete a phrase with id
    router.delete("/:id", translations.delete);
    // Retrieve translation by phrase
    router.get('/:phrase', translations.findByPhrase); // Nueva ruta
    // Update a phrase with id
    router.put("/:id", translations.update);
      // Retrieve a single translation with id
    router.get("/:id", translations.findOne);

    app.use('/api/translations', [authJwt.verifyToken, authJwt.isAdminOrTeacher], router);
  };