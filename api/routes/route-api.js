const express = require('express');
const router = express.Router();
const apiCtrl = require('../controller/user-api-ctrl');


router.post('/login',apiCtrl.postLogin);
router.post('/signup',apiCtrl.postSignup);
router.post('/logout',apiCtrl.postLogout);

module.exports = router;