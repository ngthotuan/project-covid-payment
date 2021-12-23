const express = require('express');
const router = express.Router();

const { categoryController } = require('../controllers');

router.get('/', categoryController.list);
router.get('/create', categoryController.showCreate);
router.post('/create', categoryController.create);

module.exports = router;
