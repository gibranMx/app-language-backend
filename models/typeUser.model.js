const mongoose = require("mongoose");
const TypeUser = mongoose.model(
  "TypeUser",
  new mongoose.Schema({
    title: String,
    user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
  )
  
);
module.exports = TypeUser;