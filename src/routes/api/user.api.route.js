const express = require('express');
const router = express.Router();

const { userApiController } = require('../../controllers/api');

router.post('/create', userApiController.createUser);

module.exports = router;
