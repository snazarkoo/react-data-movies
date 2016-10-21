var movieCtrls = require('./controllers/movieCtrls');
var authCtrls = require('./controllers/authCtrls');

module.exports = function(app){
    app.get('/movie/:id/comments', movieCtrls.findCommentsByMovieId);
    app.post('/movie/:id/comment', movieCtrls.addCommentByMovieId);
    //auth routes
    app.post('/signup', authCtrls.signup);
    app.post('/authenticate', authCtrls.authenticate);
}