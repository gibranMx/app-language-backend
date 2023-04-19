const mongoose = require("mongoose");
const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
  
    title: String, 
    description: String, 
    color: String,
    image: {
      type: String,
      required: false,
      default: null
    },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true })
);
module.exports = Category;