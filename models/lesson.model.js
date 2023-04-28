const mongoose = require("mongoose");
const Lesson = mongoose.model(
  "Lesson",
  new mongoose.Schema({
    title: String,
    description: String,
    longdescription: String,
    material: String,
    //una leccion puede crear muchas actividades
    //una leccion pertertenece a una unidad
    idUnity: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unity"
    },
  },
  { timestamps: true }
  )
  
);
module.exports = Lesson;