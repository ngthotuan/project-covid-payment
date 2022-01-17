const express = require('express');
const router = express.Router();
const { checkAuthenAndAuthor } = require('../middleware/authentication');

const { siteController } = require('../controllers');

router.get('/deposit', siteController.getDeposit);
router.post('/deposit', siteController.postDeposit);
router.get('/login/create', siteController.getLoginCreate);
router.post('/login/create', siteController.postLoginCreate);
router.get('/login/password', siteController.getLoginPassword);
router.post('/login/password', siteController.postLoginPassword);
router.get('/login', siteController.getLoginUsername);
router.post('/login', siteController.postLoginUsername);
router.get('/logout', siteController.getLogout);
router.get('/init', siteController.getInit);
router.post('/init', siteController.postInit);

router.get(
    '/change-password',
    checkAuthenAndAuthor,
    siteController.getChangePassword,
);
router.post(
    '/change-password',
    checkAuthenAndAuthor,
    siteController.postChangePassword,
);
router.get('/', checkAuthenAndAuthor, siteController.getProfile);

module.exports = router;
