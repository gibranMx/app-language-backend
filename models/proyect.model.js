const mongoose = require("mongoose");
const Proyect = mongoose.model(
  "Proyect",
  new mongoose.Schema({
    title: String,
    description: String,
  },
  { timestamps: true }
  )

);

module.exports = Proyect;