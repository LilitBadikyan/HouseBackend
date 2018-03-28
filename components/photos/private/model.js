const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PhotosSchema = Schema({
  image: Buffer,
  content_type: String,
  image_url: {
    type: String,
    default: '',
  },
  mime: String,
  size: Number,
  width: Number,
  height: Number,
  title: {
      type: String,
      default: null,
  },
  user_id: {
      type: Schema.ObjectId,
  },
})

module.exports = mongoose.model('photos', PhotosSchema);
