const express = require('express');
const router = express.Router();
const userRoutes = require("./user.route");
const messageRoutes = require("./message.route");

router.use('/user', userRoutes);
router.use('/message', messageRoutes);

module.exports = router;