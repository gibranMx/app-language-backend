const db = require("../models");
const Unity = db.unity;
// Create and Save a new Unity
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Unity
    const unity = new Unity({
      title: req.body.title,
      description: req.body.description,
      idProyect: req.body.idProyect
    });
    // Save Unity in the database
    unity
      .save(unity)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Unity."
        });
      });
  };
// Retrieve all Unity from the database.
exports.findAll = (req, res) => {
    const idProyect = req.query.id;
    var condition = idProyect ? { idProyect: { $regex: new RegExp(idProyect), $options: "i" } } : {};
    Unity.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Unitys."
        });
      });
  };

 // buscar una Unity por proyecto 
  exports.findByProyect = (req, res) => {
    const id = req.params.id;
    Unity.find({ idProyect: id }).sort({ _id: -1 })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Unities with proyect id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Unities by proyect with id=" + id });
      });
  
  }

// Delete a Unity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Unity.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Unity with id=${id}. Maybe Unity was not found!`
        });
      } else {
        res.send({
          message: "Unity was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Unity with id=" + id
      });
    });
};

