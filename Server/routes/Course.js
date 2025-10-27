const express = require('express');
const router = express.Router();

const{ auth, isAdmin, isInstructor, isStudent } = require('../middlewares/auth');
const { createCourse, showAllCourses, getCourseDetails } = require('../controllers/Course');
const { createCategory, showAllCategorys, categoryPageDetails } = require('../controllers/Category');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { createSubSection, updateSubsection, deleteSubSection } = require('../controllers/SubSection');
const { createRatingAndReview, getALLRatingAndReview, averageRating } = require('../controllers/RatingAndReview');

router.post('/createCourse', auth, isInstructor, createCourse);
router.get('/allCourse', showAllCourses);
router.get('/courseDetail', getCourseDetails);

router.post('/category/create', auth, isAdmin, createCategory);
router.get('/allCategory', showAllCategorys);
router.get('/categoryDetail', categoryPageDetails);

router.post('/createSection', auth, isInstructor, createSection);
router.put('/updateSection', auth, isInstructor, updateSection);
router.delete('/deleteSection', auth, isInstructor, deleteSection);

router.post('/createSubSection', auth, isInstructor, createSubSection);
router.put('/updateSubSection', auth, isInstructor, updateSubsection);
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection);

router.post('/createRating', auth, isStudent, createRatingAndReview);
router.get('/allRatingReviews', getALLRatingAndReview);
router.get('/averageRating', averageRating);

module.exports = router;