const mongoose = require("mongoose");
const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    image: String,
    isMultiple: {
      type: Boolean,
      default: false
    },
    idCategory:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    answers: [
      {
        title: {
          type: String,
          required: true
        },
        isCorrect: {
          type: Boolean,
          default: false
        },
        image: {
          type: String,
          required: false,
          default: null
        }, // opcional
        audio: {
            type: String,
            required: false,
            default: null
          }, // opcional
      }
    ],
    isExpired:false
  },
    { timestamps: true }
  )

);

module.exports = Question;