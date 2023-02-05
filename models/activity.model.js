const mongoose = require("mongoose");
const Activity = mongoose.model(
  "Activity",
  new mongoose.Schema({
    title: String,
    description: String,
    instruccions: String,
    grammar: String,
    material: String,
    idLesson: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    },
    
  },
  { timestamps: true }
  )
  
);
module.exports = Activity;