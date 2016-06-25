var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: String,
  companyID: Number,
  createDate : { type : Date, default: Date.now },
  roleID: Number
});

module.exports = mongoose.model('message', MessageSchema);