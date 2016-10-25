import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import User from '../models/userModel';
import {config} from '../config'; // get our config file

export function signup(req, res) {
  const body = req.body;
  if (body.username && body.password) {
    User.findOne({
      username: body.username
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        const user = new User({
          username: body.username,
          password: body.password
        });
        user.save(function(err, user) {
          if (err) throw err;
          saveUserHandlerSuccess(user, res);
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'User not saved'
        });
      }
    });
  }
}

export function authenticate(req, res) {
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
        saveUserHandlerSuccess(user, res);
      }
    }
  });
}

function saveUserHandlerSuccess(user, res) {
  const id_token = jwt.sign(user, config.SECRET, {
    expiresIn: 60 * 60 // expires in 1 hour
  });

  res.json({
    id_token,
    username: user.username,
    userId: user._id
  });
}