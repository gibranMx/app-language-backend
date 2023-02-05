const db = require("../models");
const Activity = db.activity;
// Create and Save a new Activity
exports.create = (req, res) => {
    // Validate request
    console.log("puta")
    console.log(req)

    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Activity
    const activity = new Activity({
      title: req.body.title,
      description: req.body.description,
      instruccions: req.body.instruccions,
      grammar: req.body.grammar,
      material: req.body.material,
      idLesson: req.body.idLesson
    });
    // Save Activity in the database
    activity
      .save(activity)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Activity."
        });
      });
  };
// Retrieve all Activitys from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Activity.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Activity."
      });
    });
};

// buscar una lesson por Unidad 
exports.findByLesson = (req, res) => {
  const id = req.params.id;
  Activity.find({ idLesson: id }).sort({ _id: -1 })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Activity with lession id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Activity by lession with id=" + id });
    });

}

// Delete a Activity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Activity.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`
        });
      } else {
        res.send({
          message: "Activity was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Activity with id=" + id
      });
    });
};

