module.exports = app => {
    const typeUsers = require("../controllers/typeUser.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new typeUsers
    router.post("/",typeUsers.create);
    // Retrieve all typeUsers
    router.get("/", typeUsers.findAll);
    // Delete a typeUsers with id
    router.delete("/:id", typeUsers.delete);

   app.use('/api/typeUsers', router);
  };