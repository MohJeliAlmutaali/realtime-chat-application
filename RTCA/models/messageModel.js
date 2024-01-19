// MessageModel.js
const db = require('../config/db');

class MessageModel {
  static async createMessage(roomId, senderUserId, content) {
    const timestamp = new Date();

    try {
      const result = await db.query(
        'INSERT INTO Message (room_id, sender_user_id, content, timestamp) VALUES (?, ?, ?, ?)',
        [roomId, senderUserId, content, timestamp]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // ... (fungsi-fungsi lainnya)
}

module.exports = MessageModel;
