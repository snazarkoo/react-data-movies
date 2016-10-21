var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  id: Number,
  comments: [{
    user: {
      userId: String,
      username: String
    },
    text: String,
    updatedAt: {
      type: Date,
      default: Date.now
    },
  }]
});

module.exports = mongoose.model('Movie', MovieSchema);