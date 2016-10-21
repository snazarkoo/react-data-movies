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

exports.delete = function(req, res) {
    var id = req.params.id;
    Movie.remove({
        'id': id
    }, function(err, result) {
        return res.send({
            status: 200,
            msg: 'Success!'
        });
    });
};

exports.update = function(req, res) {
    Movie.findOne({
        'id': req.params.id
    }, function(err, employee) {
        employee.firstname = req.body.firstname;
        employee.lastname = req.body.lastname;
        employee.age = req.body.age;
        employee.position = req.body.position;
        employee.skill = req.body.skill;
        employee.language_level = req.body.language_level;
        employee.experience = req.body.experience;
        employee.save(function(err) {
            res.send({
                status: 200,
                message: 'employee updated!'
            });
        });

    });
}