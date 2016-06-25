var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  active: Boolean,
  email: String,
  password: { type: String, select: false },
  avatar_Url: String,
  role: Number
});

module.exports = mongoose.model('User', UserSchema);