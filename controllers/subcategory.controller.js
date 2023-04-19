const db = require("../models");
const SubCategory = db.subcategory;
// Create and Save a new category
exports.create = (req, res) => {
    // Validate request
    console.log("puta")
    console.log(req)

    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a subcategory
    const subcategory = new SubCategory({
      title: req.body.title,
      description: req.body.description,
      idCategory: req.body.idCategory,
    });
    // Save subcategory in the database
    subcategory
      .save(subcategory)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the subcategory."
        });
      });
  };
// Retrieve all subcategory from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  SubCategory.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subcategory."
      });
    });
};



// buscar una Category por SubCategory 
exports.findByCategory = (req, res) => {
    const id = req.params.id;
    SubCategory.find({ idCategory: id }).sort({ _id: -1 })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found SubCategory with Category id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving SubCategory by Category with id=" + id });
      });
  
  }



// Delete a subcategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  SubCategory.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete subcategory with id=${id}. Maybe subcategory was not found!`
        });
      } else {
        res.send({
          message: "subcategory was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete subcategory with id=" + id
      });
    });
};