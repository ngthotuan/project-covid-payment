const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

router.get('/', userController.index);
router.get('/details', userController.getProfile);
router.get('/manager-history', userController.getUserHistories);
router.get('/payment-history', userController.getTransactionHistory);

module.exports = router;
