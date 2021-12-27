const express = require('express');
const router = express.Router();

const { districtApiController } = require('../../controllers');

router.get('/:id', districtApiController.findById);
router.get('/:id/wards', districtApiController.findAllWards);

module.exports = router;
