const db = require("../models");
const Translation = db.translation;

// Create and Save a new category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.phrase) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a category
  const translation = new Translation({
    phrase: req.body.phrase,
    language: req.body.language,
    translation: req.body.translation,
    audio: req.body.audio ? req.body.audio : null,
    audioStart: req.body.audioStart ? req.body.audioStart : null,
    audioEnd: req.body.audioEnd ? req.body.audioEnd : null,
    image: req.body.image ? req.body.image : null
  });
  
  // Save category in the database
  translation
    .save(translation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    });
};


// Retrieve all categories from the database.
exports.findAll = (req, res) => {
  const phrase = req.query.phrase;
  var condition = phrase ? { phrase: { $regex: new RegExp(phrase), $options: "i" } } : {};
  Translation.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving category."
      });
    });
};

// Retrieve a single translation with id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Translation.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Translation not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving translation with id=" + id
      });
    });
};


// Delete a traslation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Translation.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot category lesson with id=${id}. Maybe category was not found!`
        });
      } else {
        res.send({
          message: "category was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete category with id=" + id
      });
    });
};






// Retrieve translation by phrase
exports.findByPhrase = (req, res) => {
  const phrase = req.params.phrase;
  var condition = { phrase: phrase };
  Translation.findOne(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving translation."
      });
    });
};


// Update a phrase with id
exports.update = (req, res) => {
  const id = req.params.id;

  Translation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tag with id=${id}. Tag was not found.`
        });
      } else res.send({ message: "Tag was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tag with id=" + id
      });
    });
};

