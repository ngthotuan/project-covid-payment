const express = require('express');
const router = express.Router();

const { patientController } = require('../controllers');

router.get('/', patientController.getList);
router.get('/create', patientController.getCreate);
router.post('/create', patientController.postCreate);
router.get('/', patientController.getDetail);

module.exports = router;
