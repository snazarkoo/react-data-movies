module.exports = function(app){
    var movies = require('./controllers/movies');
    app.get('/movie/:id/comments', movies.findCommentsByMovieId);
    // app.get('/employees', employees.findAll);
    // app.post('/employees', employees.add);
    // app.put('/employees/:id', employees.update);
    // app.delete('/employees/:id', employees.delete);
    app.get('/import', movies.import);
}

