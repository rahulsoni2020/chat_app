const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routing')
const validateRoutes = require('./validate.route');
const authRequest = require("./../middleware/auth.middleware")

router.use('/validate', validateRoutes);
router.use('/check', authRequest, validateRoutes)
router.use('/auth',authRequest, authRoutes);

module.exports = router;