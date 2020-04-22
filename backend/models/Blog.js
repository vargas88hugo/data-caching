const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  _user: { type: Schema.Types.ObjectId, ref: 'user ' },
});

module.exports = Blog = mongoose.model('Blog', BlogSchema);
