import  * as movieCtrls from './controllers/movieCtrls';
import * as authCtrls from './controllers/authCtrls';

export default function(app) {
  app.get('/v1/movie/:id/comments', movieCtrls.findCommentsByMovieId);
  app.post('/v1/movie/:id/comment', movieCtrls.addCommentByMovieId);
  //auth routes
  app.post('/v1/signup', authCtrls.signup);
  app.post('/v1/authenticate', authCtrls.authenticate);
}