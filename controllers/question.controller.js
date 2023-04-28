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
    idCategory: req.body.idCategory,
    audio: req.body.audio ? req.body.audio : null,
    startAudio: req.body.startAudio ? req.body.startAudio : null,
    endAudio: req.body.endAudio ? req.body.endAudio : null,
    idTranslations: req.body.idTranslations ? req.body.idTranslations : [],
    answers: req.body.answers,
    isExpired: false
  
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
// buscar una Question por categoria 
exports.findByCategory = (req, res) => {
  const id = req.params.id;
  Question.find({ idCategory: id }).sort({ _id: -1 })
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

// Update a Question by the id in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Question with id=${id}. Maybe Question was not found!`
        });
      } else res.send({ message: "Question was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Question with id=" + id
      });
    });
};

