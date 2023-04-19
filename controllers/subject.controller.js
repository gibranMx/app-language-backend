const db = require("../models");
const Subject = db.subject;
// Create and Save a new subject
exports.create = (req, res) => {
    // Validate request
    console.log("puta")
    console.log(req)

    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a subject
    const subject = new Subject({
      title: req.body.title,
      description: req.body.description,
      idSubcategory: req.body.idSubcategory
    });
    // Save subject in the database
    subject
      .save(subject)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the subject."
        });
      });
  };

// Retrieve all subcategory from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Subject.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subject."
      });
    });
};



// buscar una subject por SubCategory 
exports.findBySubcategory = (req, res) => {
    const id = req.params.id;
    Subject.find({ idSubcategory: id }).sort({ _id: -1 })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found subject with SubCategory id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving subject by SubCategory with id=" + id });
      });
  
  }



// Delete a subcategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Subject.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete subject with id=${id}. Maybe subject was not found!`
        });
      } else {
        res.send({
          message: "subject was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete subject with id=" + id
      });
    });
};