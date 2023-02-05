const mongoose = require("mongoose");
const Unity = mongoose.model(
  "Unity",
  new mongoose.Schema({
    title: String,
    description: String,
    idProyect: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proyect"
    },
  },
  { timestamps: true }
  )
  
);
module.exports = Unity;