var mongoose = require('mongoose'),
Movie = mongoose.model('Movie');



exports.import = function(req, res){
  Movie.create(
    {
      id: 271110,
      comments: [
        {
          id: 1,
          user: {
            userId: 1,
            firstName: 'John',
            lastName: 'Clisby'
          },
          text: 'First Comment',
          date: Date
        }
      ]
    },
    {
      id: 271111,
      comments: [
        {
          id: 1,
          user: {
            userId: 2,
            firstName: 'John',
            lastName: 'Clisby'
          },
          text: 'First Comment',
          date: Date
        }
      ]
    },
    {
      id: 271112,
      comments: [
        {
          id: 1,
          user: {
            userId: 3,
            firstName: 'John',
            lastName: 'Clisby'
          },
          text: 'First Comment',
          date: Date
        }
      ]
    },    {
      id: 271113,
      comments: [
        {
          id: 1,
          user: {
            userId: 1,
            firstName: 'John',
            lastName: 'Clisby'
          },
          text: 'First Comment',
          date: Date
        }
      ]
    },
    function (err) {
    if (err) return console.log(err);
    return res.send(202);
  });
};


exports.findAll = function(req, res){
  Movie.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findCommentsByMovieId = function(req, res){
  var id = req.params.id;
  Movie.findOne({'id':id},function(err, result) {
    if (!result) {
       return res.send([])
    }
    return res.send(result.comments);
  });
};

exports.delete = function(req, res){
    var id = req.params.id;
    Movie.remove({'id': id},function(err, result) {
        return res.send({status: 200, msg: 'Success!'});
    });
};

exports.update = function(req, res) {
    Movie.findOne({'id': req.params.id}, function(err, employee) {  
            employee.firstname = req.body.firstname; 
            employee.lastname = req.body.lastname; 
            employee.age = req.body.age; 
            employee.position = req.body.position; 
            employee.skill = req.body.skill; 
            employee.language_level = req.body.language_level; 
            employee.experience = req.body.experience; 
            employee.save(function(err) {
                res.send({ status: 200,  message: 'employee updated!' });
            });

        });
}

exports.add = function(req, res) {
   var employee = new Movie(req.body);
   employee.save(function(err) {
      res.json(employee);
    });
};
