var mongoose = require('mongoose');
var Movie = require('../models/movieModel');

exports.findCommentsByMovieId = function(req, res) {
    var id = req.params.id;
    Movie.findOne({
        'id': id
    }, function(err, result) {
        if (!result) {
            return res.send([])
        }
        return res.send(result.comments);
    });
};

exports.addCommentByMovieId = function(req, res, next) {
    var id = req.params.id;
    Movie.findOne({
        'id': id
    }, function(err, movie) {
        if (!movie) {
            var movieBody = {
              id: id,
              comments: [req.body]
            }
            var movie = new Movie(movieBody);
            movie.save(function(err) {
                res.json(movie.comments[movie.comments.length - 1]);
                return next(err)
            });
        } else {
            movie.comments.push(req.body);
            movie.save(function(err) {
                res.json(movie.comments[movie.comments.length - 1]);
            });
        }
    });
    
};