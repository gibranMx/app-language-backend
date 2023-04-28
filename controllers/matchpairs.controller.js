const db = require("../models");
const MatchPairs = db.matchpairs;

// Create and Save a new matchpairs
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a matchpairs
  const matchpairs = new MatchPairs({
    title: req.body.title,
    category: req.body.category,
    pairs: req.body.pairs,
  });
  
  // Save matchpairs in the database
  matchpairs
    .save(matchpairs)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the matchpairs."
      });
    });
};


// Retrieve all matchpairs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  MatchPairs.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matchpairs."
      });
    });
};

// Retrieve a single matchpairs with id
exports.findOne = (req, res) => {
  const id = req.params.id;
  MatchPairs.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "matchpairs not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving matchpairs with id=" + id
      });
    });
};


// Delete a matchpairs with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  MatchPairs.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot matchpairs lesson with id=${id}. Maybe matchpairs was not found!`
        });
      } else {
        res.send({
          message: "matchpairs was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete matchpairs with id=" + id
      });
    });
};






// Retrieve matchpairs by title
exports.findByTitle = (req, res) => {
  const title = req.params.title;
  MatchPairs.find({ title: { $regex: new RegExp(title, "i") } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matchpairs."
      });
    });
};



// Update a matchpairs by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  MatchPairs.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update matchpairs with id=${id}. matchpairs was not found.`
        });
      } else res.send({ message: "matchpairs was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating matchpairs with id=" + id
      });
    });
};