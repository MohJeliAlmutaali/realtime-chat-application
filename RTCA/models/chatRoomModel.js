// chatRoomModel.js
const db = require('../config/db');

class ChatRoomModel {
  static createChatRoom(roomName, createdByUserId, callback) {
    db.run('INSERT INTO ChatRoom (room_name, created_by_user_id) VALUES (?, ?)', [roomName, createdByUserId], callback);
  }
}

module.exports = ChatRoomModel;
