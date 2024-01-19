// chatRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const ChatRoomController = require('../controllers/ChatRoomController');

const router = express.Router();

router.post('/send-message', authMiddleware, ChatRoomController.sendMessage);

module.exports = router;
