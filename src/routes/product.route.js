const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');

router.get('/', productController.index);
router.get('/create', productController.getCreate);
router.post('/create', productController.postCreate);

module.exports = router;
