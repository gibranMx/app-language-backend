const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const {userLogger, logger} = require('./logger');
const app = express();
const helmet = require("helmet");

//helment
//app.use(helmet());
//

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(__dirname + '/data')); // /data/6248b286797430fbc5b6dc65/16523331-8068-4255-9960-050848255960.webp

app.use(express.static('public')); 
app.use('/data', express.static('data'));


const db = require("./models");
const Role = db.role;


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }



// simple route
app.get("/", (req, res) => {
  logger.debug('This is the "/" route.');
  logger.info('Express.js listening on port 3000.');
  logger.error('This is an error log');
  res.json({ message: "Welcome to soprasteria assesment application." });
});

// routes


require("./routes/unity.routes")(app);
require("./routes/proyect.routes")(app);
require("./routes/typeUser.routes")(app);
require("./routes/lesson.routes")(app);
require("./routes/activity.routes")(app);
require("./routes/user.routes")(app);
require("./routes/question.routes")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
//const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

