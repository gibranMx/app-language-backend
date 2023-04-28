const db = require("../models");
const Lesson = db.lesson;
// Create and Save a new lesson
exports.create = (req, res) => {
    // Validate request
    console.log("puta")
    console.log(req)

    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a lesson
    const lesson = new Lesson({
      title: req.body.title,
      description: req.body.description,
      longdescription: req.body.longdescription,
      material: req.body.material,
      idUnity: req.body.idUnity
    });
    // Save lesson in the database
    lesson
      .save(lesson)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the lesson."
        });
      });
  };
// Retrieve all lesson from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Lesson.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lesson."
      });
    });
};

// buscar una lesson por Unidad 
exports.findByUnity = (req, res) => {
  const id = req.params.id;
  Lesson.find({ idUnity: id }).sort({ _id: -1 })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found lesson with Unity id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving lesson by unity with id=" + id });
    });

}

// Delete a lesson with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Lesson.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete lesson with id=${id}. Maybe lesson was not found!`
        });
      } else {
        res.send({
          message: "lesson was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete lesson with id=" + id
      });
    });
};