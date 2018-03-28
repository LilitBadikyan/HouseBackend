const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemsSchema = Schema({
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
  category: {
    type: String,
    enum: ['kitchen', 'livingRoom', 'bathRoom', 'bedRoom'],
  },
  shop_name: {
    type: String
  },
});


module.exports = mongoose.model('items', ItemsSchema);
