const express = require('express');
const router = express.Router();

const { capturePayment, verifySignature } = require('../controllers/Payments');
const { auth, isStudent } = require('../middlewares/auth');

router.get('/capture', auth, isStudent, capturePayment);
router.get('/verify', verifySignature);

module.exports = router;