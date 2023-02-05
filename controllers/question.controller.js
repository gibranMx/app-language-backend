const db = require("../models");
const Question = db.question;
// Create and Save a new Question
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Question
  const question = new Question({
    title: req.body.title,
    image: req.body.image,
    isMultiple: req.body.isMultiple ? req.body.isMultiple : false,
    difficulty: req.body.difficulty,
    answers: req.body.answers,
    idActivity: req.body.idActivity
  
  });
  // Save question in the database
  question
    .save(question)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question."
      });
    });
};
// Retrieve all Questions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Question.find(condition).sort({ _id: -1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    });
};
// buscar una Question por Activity 
exports.findByQuestion = (req, res) => {
  const id = req.params.id;
  Question.find({ idActivity: id }).sort({ _id: -1 })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Question with activity id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Question by activity with id=" + id });
    });

}

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Question.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
        });
      } else {
        res.send({
          message: "Question was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Question with id=" + id
      });
    });
};

