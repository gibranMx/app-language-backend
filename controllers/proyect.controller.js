const db = require("../models");
const Proyect = db.proyect;
// Create and Save a new Proyect
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Proyect
    const proyect = new Proyect({
      title: req.body.title,
      description: req.body.description
    });
    // Save proyect in the database
    proyect
      .save(proyect)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Proyect."
        });
      });
  };
// Retrieve all proyects from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Proyect.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Proyect."
        });
      });
  };

// Delete a proyect with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Proyect.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Proyect with id=${id}. Maybe Proyect was not found!`
          });
        } else {
          res.send({
            message: "Proyect was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Proyect with id=" + id
        });
      });
  };
