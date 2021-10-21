const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController.js')

router.put('/user/:userName', userController.registerUser);
router.get('/user/:userName', userController.getUser)


module.exports = router;