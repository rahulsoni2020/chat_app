const express = require('express');
const router = express.Router();
const { updateProfile, getUserList} = require('./../controllers/user.controller');

router.get('/list', getUserList);
router.put('/update-profile', updateProfile);

module.exports = router;