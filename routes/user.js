const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//file upload middleware
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup) //POST method for sign-up `body{email:"string",password:"string"}`
router.post('/login', userCtrl.login) //POST method for log-in `body{email:"string",password:"string"}`
router.post('/forgot-password', userCtrl.forgotPassword) //POST method for log in `body{email:"string"}`
router.post('/reset-password', userCtrl.verifyNumber) //POST method to verify secret code `body{resetPasswordNumber:number}`
router.post('/modify-password', userCtrl.modifyPassword) //POST method to change user password `body{_id:number,password:"string"}`
router.post('/modify-avatar/:id', multer ,userCtrl.modifyAvatar) //Post method to change user avatar
router.get('/verifytoken', userCtrl.verifyToken) //Get method to verify if jwt is valid
router.get('/getAvatar/:id',userCtrl.getAvatar) //Get user avatar, usefull for comments section

module.exports = router;