const db = require("../models");
const Category = db.category;

// Create and Save a new category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a category
  const category = new Category({
    title: req.body.title,
    description: req.body.description,
    color: req.body.color,
    image: req.body.image || null, // Valor por defecto: null
    parentCategory: req.body.parentCategory || null // Valor por defecto: null
  });
  
  // Save category in the database
  category
    .save(category)
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
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Category.find(condition)
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




// Get all categories where parentCategory is null
exports.findAllWithoutParent = (req, res) => {
  Category.find({ parentCategory: null })
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



// Retrieve categories by title
exports.findByTitle = (req, res) => {
  const title = req.params.title;
  Category.find({ title: { $regex: new RegExp(title, "i") } })
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


// Delete a category by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete category with id=${id}. Category not found.`
        });
      } else {
        // Delete all child categories
        Category.deleteMany({ parentCategory: id })
          .then(() => {
            res.send({
              message: "Category and all child categories were deleted successfully!"
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while deleting child categories."
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting category."
      });
    });
};


// Update a category by id
exports.update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: "Category ID must be provided" });
  }

  // Check if category exists
  Category.findById(id)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: `Cannot update category with id=${id}. Category not found.`
        });
      }

      // Update category fields
      if (req.body.title) category.title = req.body.title;
      if (req.body.description) category.description = req.body.description;
      if (req.body.color) category.color = req.body.color;
      if (req.body.image) category.image = req.body.image;
      if (req.body.parentCategory) category.parentCategory = req.body.parentCategory;

      // Save updated category
      category.save()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while updating the category."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving category with id=" + id
      });
    });
};


// Find a category by name (either parent or child)
exports.findByName = (req, res) => {
  const categoryName = req.params.name;
  Category.findOne({ title: categoryName })
    .populate('parentCategory')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Error retrieving category with name ${categoryName}.`
      });
    });
};