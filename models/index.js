const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;

db.proyect = require("./proyect.model");
db.unity = require("./unity.model");
db.typeUser = require("./typeUser.model");
db.lesson = require("./lesson.model");
db.activity = require("./activity.model");
db.question = require("./question.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
//asdasd