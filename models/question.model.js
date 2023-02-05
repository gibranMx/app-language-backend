const mongoose = require("mongoose");
const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    title: String,
    image: String,
    isMultiple: false,
    difficulty: Number,
    idActivity:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity"
    },
    answers: [
      {
        title: String,
        isCorrect: false
      }
    ],
    isExpired:false
  },
    { timestamps: true }
  )

);

module.exports = Question;

