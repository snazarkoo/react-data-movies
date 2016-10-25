import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
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
    }
  }]
});

export default mongoose.model('Movie', MovieSchema);