const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  department: String,
  rating: Number,
});

module.exports = mongoose.model('User', userSchema);
