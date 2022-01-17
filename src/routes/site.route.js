const express = require('express');
const router = express.Router();

const { siteController } = require('../controllers');

router.get('/login/create', siteController.getLoginCreate);
router.post('/login/create', siteController.postLoginCreate);
router.get('/login/password', siteController.getLoginPassword);
router.post('/login/password', siteController.postLoginPassword);
router.get('/login', siteController.getLoginUsername);
router.post('/login', siteController.postLoginUsername);
router.get('/logout', siteController.getLogout);
router.get('/change-password', siteController.getChangePassword);
router.post('/change-password', siteController.postChangePassword);
router.get('/', siteController.getProfile);

module.exports = router;
