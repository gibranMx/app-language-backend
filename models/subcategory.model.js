const mongoose = require("mongoose");
const Subcategory = mongoose.model(
  "SubCategory",
  new mongoose.Schema({
    title: String,
    description: String,
    idCategory: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
  })
);
module.exports = Subcategory;