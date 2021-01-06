const express = require('express');
const router = express.Router();
const uiCtrl = require('../controller/user-ui-ctrl');
const midware = require('../../middleware/auth');


router.get('/login', uiCtrl.getLogin);
router.get('/signup', uiCtrl.getSignup);

router.post('/login', uiCtrl.postLogin);
router.post('/signup', uiCtrl.postSignup);
router.post('/logout', uiCtrl.logout);

router.get('/', midware.isAuthenticated,midware.isAuthorized, uiCtrl.getHome);








module.exports = router;