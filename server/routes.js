module.exports = function(app){
    var movies = require('./controllers/movies');
    app.get('/movie/:id/comments', movies.findCommentsByMovieId);
    app.post('/movie/:id/comment', movies.addCommentByMovieId);
    app.get('/import', movies.import);
    // app.get('/employees', employees.findAll);
    // app.put('/employees/:id', employees.update);
    // app.delete('/employees/:id', employees.delete);
}

