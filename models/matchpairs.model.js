const mongoose = require("mongoose");
const MatchPairs = mongoose.model(
  "MatchPairs",
  new mongoose.Schema({
    
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    pairs: [ //12, 2,3,4
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Translation",
            required: true,
          },
    ],
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
  )
  
);
module.exports = MatchPairs;


