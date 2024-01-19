// chatRoomController.js
const ChatRoomModel = require('../models/chatRoomModel');
const MessageModel = require('../models/messageModel');


class ChatRoomController {
  static createChatRoom(req, res) {
    const { roomName } = req.body;
    const createdByUserId = req.user.user_id; // Ambil user_id dari token JWT

    // Validation: Check if required fields are present
    if (!roomName) {
      return res.status(400).json({ message: 'Please provide room name' });
    }

    // Create a new chat room
    ChatRoomModel.createChatRoom(roomName, createdByUserId, (err) => {
      if (err) {
        console.error('Error creating chat room:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      return res.json({ message: 'Chat room created successfully' });
    });
  }
  static async sendMessage(req, res) {
    try {
      const { roomName, content } = req.body;
      const senderUserId = req.user.user_id;

      // Validasi data
      if (!roomName || !content) {
        return res.status(400).json({ message: 'Room name and content are required' });
      }

      // Pastikan pengguna memiliki akses ke ruang obrolan
      const chatRoom = await ChatRoomModel.findByRoomName(roomName);
      if (!chatRoom) {
        return res.status(404).json({ message: 'Chat room not found' });
      }

      // Simpan pesan dalam database
      await MessageModel.createMessage(chatRoom.room_id, senderUserId, content);

      // Kirim pesan ke semua klien terhubung melalui WebSocket
      io.emit('chat message', { roomName, senderUserId, content });

      res.json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}


module.exports = ChatRoomController;
