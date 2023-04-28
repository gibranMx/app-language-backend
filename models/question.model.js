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
    audio:
    {
      type: String, // adio 1 min assets/adio/audio.mp3
      default: null
    },
    startAudio:
    {
      type: Number, // 00.01s
      default: null
    },
    endAudio:
    {
      type: Number,// 10.00s
      default: null
    },
    idTranslations: [ //[34234234234,234234234,234234234,234234234]
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Translation"
      }
    ],
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
          startAudio:
          {
            type: Number, // 00.01s
            default: null
          },
        endAudio:
          {
            type: Number,// 10.00s
            default: null
          },
      }
    ],
    isExpired:false
  },
    { timestamps: true }
  )

);

module.exports = Question;