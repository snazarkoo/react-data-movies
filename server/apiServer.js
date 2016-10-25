var bodyParser  = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config'); // get our config file
var User = require('./models/userModel'); // get our mongoose model
var routes = require('./routes');

export function apiServer(app) {
  mongoose.connect(config.DB); // connect to database
  app.use(morgan('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  routes(app);
}

