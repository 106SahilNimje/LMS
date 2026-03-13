const express = require('express');
const router = express.Router();
const enrollmentController = require('./enrollment.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/my-courses', protect, enrollmentController.getMyEnrollments);
router.post('/progress', protect, enrollmentController.markLessonCompleted);

module.exports = router;
