var express = require('express');
var bodyParser = require('body-parser')
mongoose = require('mongoose');



var mongoUri = 'mongodb://localhost/movies';
mongoose.connect(mongoUri);
var app = express();

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
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))



require('./models/movies');
require('./routes')(app);



app.listen(8000);
console.log('Listening on port 8000...');