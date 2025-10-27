const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { updateProfile, getAllUserDetails, deleteAccount } = require('../controllers/Profile');

router.put('/update', auth, updateProfile);
router.get('/details', auth, getAllUserDetails);
router.delete('/delete', auth, deleteAccount);

//update

module.exports = router;