const express = require('express');
const router = express.Router();

const { siteController } = require('../controllers');

router.get('/', siteController.index);
router.get('/deposit', siteController.getDeposit);
module.exports = router;
