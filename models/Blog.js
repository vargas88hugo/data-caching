const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  _user: { type: Schema.Types.ObjectId, ref: 'user ' },
});

mongoose.model('blog', BlogSchema);
