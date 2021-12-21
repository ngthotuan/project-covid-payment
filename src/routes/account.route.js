const express = require('express');
const router = express.Router();

const { accountController } = require('../controllers');

router.get('/', accountController.list);

module.exports = router;
