const express = require('express');
const router = express.Router();

const { patientController } = require('../controllers');

router.get('/', patientController.getList);
router.get('/create', patientController.getCreate);
router.post('/create', patientController.postCreate);
router.get('/', patientController.getDetail);
router.get('/edit/:id', patientController.getUpdate);
router.post('/edit/:id', patientController.postUpdate);

module.exports = router;
