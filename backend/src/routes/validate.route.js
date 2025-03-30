const express = require('express');
const router = express.Router();
const {loginUser, logoutUser, signupUser, checkUser} = require('./../controllers/validate.controller');

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);
router.get('/user', checkUser);

module.exports = router;
