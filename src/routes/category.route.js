const express = require('express');
const router = express.Router();

const { categoryController } = require('../controllers');

router.get('/create', categoryController.getCreate);
router.post('/create', categoryController.postCreate);
router.get('/delete/:id', categoryController.destroy);
router.get('/edit/:id', categoryController.getUpdate);
router.post('/edit/:id', categoryController.postCreate);
router.get('/:id', categoryController.detail);
router.get('/', categoryController.getList);

module.exports = router;
