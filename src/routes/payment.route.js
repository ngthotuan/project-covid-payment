const express = require('express');
const router = express.Router();

const { paymentController } = require('../controllers');

router.get('/', paymentController.getPayment);

module.exports = router;
