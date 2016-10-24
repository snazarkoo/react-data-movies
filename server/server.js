var express = require('express');
var bodyParser  = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config'); // get our config file
var User = require('./models/userModel'); // get our mongoose model

var app = express();
var port = 5000; // used to create, sign, and verify tokens
mongoose.connect(config.DB); // connect to database
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, PUT, POST");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes')(app);

app.listen(port);
console.log('Listening on port ' + port +'...');