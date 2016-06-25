var mongoose = require('mongoose');

var StatusSchema = new mongoose.Schema({
  status_Id: Number,
  status_Name: String,
  status_By: String
});

module.exports = mongoose.model('Status', StatusSchema);