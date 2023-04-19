const mongoose = require("mongoose");
const Subject = mongoose.model(
  "Subject",
  new mongoose.Schema({
    title: String,
    description: String,
    idSubcategory: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory"
    },
  })
);
module.exports = Subject;