const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');

router.get('/', productController.index);
router.get('/new', productController.newProduct);

module.exports = router;
