const express = require('express');
const router = express.Router();
const {getMessages, sendMessage } = require('../controllers/message.controller');

router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

module.exports = router;