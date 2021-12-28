const express = require('express');
const router = express.Router();

const { accountController } = require('../controllers');

router.get('/login', accountController.getLoginUsername);
router.post('/login', accountController.postLoginUsername);
router.get('/', accountController.list);

module.exports = router;
