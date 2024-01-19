// chatRoomRoutes.js
const express = require('express');
const ChatRoomController = require('../controllers/chatRoomController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-room', authMiddleware, ChatRoomController.createChatRoom);

module.exports = router;
