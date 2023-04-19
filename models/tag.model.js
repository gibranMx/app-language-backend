const mongoose = require("mongoose");
const Tag = mongoose.model(
  "Tag",
  new mongoose.Schema({
    title: String,
    description: String,
    idCategory: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    isExpired:false
  })
);
module.exports = Tag;