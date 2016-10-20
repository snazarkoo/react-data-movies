var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  id: Number,
  comments: [{
    user: {
      userId: String,
      firstName: String,
      lastName: String
    },
    text: String,
    updated_at: {
      type: Date,
      default: Date.now
    },
  }]
});

module.exports = mongoose.model('Movie', MovieSchema);