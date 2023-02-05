const db = require("../models");
const TypeUser = db.typeUser;
// Create and Save a new TypeUser
exports.create = (req, res) => {
    // Validate request
    console.log("puta")
    console.log(req)

    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a TypeUser
    const typeUser = new TypeUser({
        title: req.body.title 
    });
    // Save TypeUser in the database
    typeUser
      .save(typeUser)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the TypeUser."
        });
      });
  };
// Retrieve all TypeUser from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    TypeUser.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving TypeUsers."
        });
      });
  };

// Delete a TypeUser with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  TypeUser.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete TypeUser with id=${id}. Maybe TypeUser was not found!`
        });
      } else {
        res.send({
          message: "TypeUser was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete TypeUser with id=" + id
      });
    });
};
