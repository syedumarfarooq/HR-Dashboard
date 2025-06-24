const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  department: String,
  rating: Number,
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
