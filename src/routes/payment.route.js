const express = require('express');
const router = express.Router();

const { paymentController } = require('../controllers');

router.get('/', paymentController.pay);
module.exports = router;
