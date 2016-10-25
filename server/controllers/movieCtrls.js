import mongoose from 'mongoose';
import Movie from '../models/movieModel';

export function findCommentsByMovieId(req, res) {
  const id = req.params.id;
  Movie.findOne({
    'id': id
  }, function(err, result) {
    if (!result) {
      return res.send([]);
    }
    return res.send(result.comments);
  });
}

export function addCommentByMovieId(req, res, next) {
  const id = req.params.id;
  Movie.findOne({
    'id': id
  }, function(err, movie) {
    if (!movie) {
      const movieBody = {
        id: id,
        comments: [req.body]
      };
      const movie = new Movie(movieBody);
      movie.save(function(err) {
        res.json(movie.comments[movie.comments.length - 1]);
        return next(err);
      });
    } else {
      movie.comments.push(req.body);
      movie.save(function(err) {
        res.json(movie.comments[movie.comments.length - 1]);
      });
    }
  });
}