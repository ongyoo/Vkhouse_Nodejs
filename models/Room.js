var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
  room_id: String,
  des: String,
  remark: String,
  status_id: Number,
  user_obj: Object
});

module.exports = mongoose.model('rooms', RoomSchema);