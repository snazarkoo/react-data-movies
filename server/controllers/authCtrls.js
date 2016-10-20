var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('../models/userModel');
var config = require('../config'); // get our config file

exports.signup = function(req, res) {
  var body = req.body;
  console.log(body);
  if (body.username && body.password) {
    var user = new User({
      username: body.username,
      password: body.password
    });
    user.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully');
      res.json({
        success: true
      });
    });
  }
}

exports.authenticate = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.SECRET, {
          expiresIn: 60 * 60 // expires in 1 hour
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
}