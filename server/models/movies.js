var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MovieSchema = new Schema({
    id: Number,
    comments: [
      {
        user: {
          id: Number,
          firstName: String,
          lastName: String
        },
        text: String
      }
    ]
});


mongoose.model('Movie', MovieSchema);
