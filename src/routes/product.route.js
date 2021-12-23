const express = require('express');
const router = express.Router();
const { upload } = require('../utils');

const { productController } = require('../controllers');

router.get('/', productController.index);
router.get('/create', productController.getCreate);
router.post('/create', upload.array('images'), productController.postCreate);
router.get('/edit/:id', productController.getEdit);
router.post('/edit/:id', upload.array('images'), productController.postEdit);
router.get('/remove/:id', productController.remove);

module.exports = router;
