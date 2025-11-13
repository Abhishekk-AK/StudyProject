const express = require('express');
const router = express.Router();

const { 
    capturePayment,  
    verifyPayment, 
    sendPaymentSuccessEmail 
} = require('../controllers/Payments');
const { 
    auth, 
    isStudent 
} = require('../middlewares/auth');

router.get('/capture', auth, isStudent, capturePayment);
router.get('/verify', verifyPayment);
router.post('/success-email', sendPaymentSuccessEmail)

module.exports = router;