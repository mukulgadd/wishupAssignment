const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController.js')
const subscriptionController = require('../controllers/subscriptionController.js')

router.put('/user/:userName', userController.registerUser);
router.get('/user/:userName', userController.getUser)

router.post('/subscription', subscriptionController.registerSubscription)
router.get('/subscription/:userName/:date', subscriptionController.getSubscriptionWithDate)
router.get('/subscription/:userName', subscriptionController.getSubscription)

module.exports = router;