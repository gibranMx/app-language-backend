 
const { createLogger, format, transports, config } = require('winston');

const options = {
    file: {
      level: 'info',
      filename: './logs/app.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };
 
const logger = createLogger({
   levels: config.npm.levels,
   transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
     ]
 });

 const userlogger = createLogger({
  levels: config.npm.levels,
  transports: [
   new transports.File(options.file),
   new transports.Console(options.console)
    ]
});

const authlogger = createLogger({
  levels: config.npm.levels,
  transports: [
   new transports.File(options.file),
   new transports.Console(options.console)
    ]
});



 module.exports = {
    logger: logger
   };