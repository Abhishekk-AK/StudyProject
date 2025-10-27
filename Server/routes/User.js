const express = require('express');
const router = express.Router();

const { signup, login, sendOTP, changePassword } = require('../controllers/Auth');
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword');
const { auth } = require('../middlewares/auth');

router.post('/otp', sendOTP);
router.post('/signup', signup);
router.post('/login', login);
router.post('/password-change', auth, changePassword);
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);

module.exports = router;