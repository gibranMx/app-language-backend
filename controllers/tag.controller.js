const db = require("../models");
const Tag = db.tag;
// Create and Save a new Tag
exports.create = (req, res) => {
    // Validate request
    console.log("puta")
    console.log(req)

    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Tag
    const tag = new Tag({
      title: req.body.title,
      description: req.body.description,
      idCategory: req.body.idCategory,
      isExpired: false,
    });
    // Save Tag in the database
    tag
      .save(tag)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tag."
        });
      });
  };

// Retrieve all Tags from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Tag.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tag."
      });
    });
};



// buscar una Tag por categoria 
exports.findByCategory = (req, res) => {
    const id = req.params.id;
    Tag.find({ idCategory: id }).sort({ _id: -1 })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tag with Category id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tag by Category with id=" + id });
      });
  
  }



// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Tag.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`
        });
      } else {
        res.send({
          message: "Tag was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tag with id=" + id
      });
    });
};


// Update a Tag by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tag.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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