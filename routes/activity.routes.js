module.exports = app => {
    const activities = require("../controllers/activity.controller");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();
    // Create a new Answer
    router.post("/",activities.create);
    // Retrieve all Answers
    router.get("/", activities.findAll);
    // Retrieve all Activities by unity
    router.get("/lesson/:id",activities.findByLesson);
    // Delete a activities with id
    router.delete("/:id", activities.delete);
    // Update a Activities with id
    router.put('/:id', activities.update);
    
   app.use('/api/activities', [authJwt.verifyToken, authJwt.isAdminTeacherOrStudent], router);
  };