const express = require('express');
const router = express.Router();

const { hospitalController, productController } = require('../controllers');

router.get('/', hospitalController.index);
router.get('/create', hospitalController.getCreate);
router.post('/create', hospitalController.postCreate);
router.get('/edit/:id', hospitalController.getEdit);
router.post('/edit/:id', hospitalController.postEdit);
router.get('/view/:id', hospitalController.getView);
router.get('/remove/:id', hospitalController.remove);

module.exports = router;
