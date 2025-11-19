const express = require('express');
const router = express.Router();

const { auth, isInstructor, isStudent } = require('../middlewares/auth');
const { 
    updateProfile, 
    getAllUserDetails, 
    deleteAccount, 
    getEnrolledCourses, 
    instructorDashboard 
} = require('../controllers/Profile');

router.put('/update', auth, updateProfile);
router.get('/details', auth, getAllUserDetails);
router.delete('/delete', auth, deleteAccount);
router.get('/enrolled-courses', auth, isStudent, getEnrolledCourses);

router.get('/instructor/dashboard', auth, isInstructor, instructorDashboard);

module.exports = router;