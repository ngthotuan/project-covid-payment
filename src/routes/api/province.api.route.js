const express = require('express');
const router = express.Router();

const { provinceApiController } = require('../../controllers');

router.get('/', provinceApiController.findAll);
router.get('/:id', provinceApiController.findById);
router.get('/:id/districts', provinceApiController.findAllDistricts);

module.exports = router;
