const express = require('express');
const router = express.Router();

const { paymentController } = require('../controllers');

router.get('/', paymentController.getPayment);
router.post('/', paymentController.postPayment);
module.exports = router;
