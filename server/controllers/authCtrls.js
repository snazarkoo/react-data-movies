var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('../models/userModel');
var config = require('../config'); // get our config file

exports.signup = function(req, res) {
  var body = req.body;
  console.log(body);
  if (body.username && body.password) {
    User.findOne({
      username: body.username
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        var user = new User({
          username: body.username,
          password: body.password
        });
        user.save(function(err, user) {
          if (err) throw err;

          console.log('User saved successfully');
          console.log(user);
          saveUserHandlerSuccess(user, res);
        });
      } else {
        console.log('User not saved');
        res.status(400).json({
          success: false
        });
      }
    })
  }
}

exports.authenticate = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.status(400).json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        saveUserHandlerSuccess(user, res)
      }
    }
  });
}

function saveUserHandlerSuccess(user, res) {
  var id_token = jwt.sign(user, config.SECRET, {
    expiresIn: 60 * 60 // expires in 1 hour
  });

  res.json({
    id_token: id_token,
    username: user.username,
    userId: user._id
  });
}