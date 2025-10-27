const express = require('express');
const router = express.Router();

const { auth, isAdmin, isInstructor, isStudent } = require('../middlewares/auth');
const { createCategory, showAllCategorys, categoryPageDetails } = require('../controllers/Category');
const { createCourse, showAllCourses, getCourseDetails } = require('../controllers/Course');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { createSubSection, updateSubsection, deleteSubSection } = require('../controllers/SubSection');
const { createRatingAndReview, getALLRatingAndReview, averageRating } = require('../controllers/RatingAndReview');

router.post('/create', auth, isAdmin, createCategory);
router.get('/detail', categoryPageDetails);
router.get('/all', showAllCategorys);

router.post('/course/create', auth, isInstructor, createCourse);
router.get('/course/detail', getCourseDetails);
router.get('/course/all', showAllCourses);

router.post('/course/section/create', auth, isInstructor, createSection);
router.put('/course/section/update', auth, isInstructor, updateSection);
router.delete('/course/section/delete', auth, isInstructor, deleteSection);

router.post('/course/section/subSection/create', auth, isInstructor, createSubSection);
router.put('/course/section/subSection/update', auth, isInstructor, updateSubsection);
router.delete('/course/section/subSection/delete', auth, isInstructor, deleteSubSection);

router.post('/createRating', auth, isStudent, createRatingAndReview);
router.get('/allRatingReviews', getALLRatingAndReview);
router.get('/averageRating', averageRating);

module.exports = router;