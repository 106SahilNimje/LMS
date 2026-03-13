const enrollmentService = require('./enrollment.service');

class EnrollmentController {
  async getMyEnrollments(req, res, next) {
    try {
      const enrollments = await enrollmentService.getMyEnrollments(req.user.id);
      res.status(200).json({ success: true, data: enrollments });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async markLessonCompleted(req, res, next) {
    try {
      const { enrollmentId, lessonId } = req.body;
      const progress = await enrollmentService.markLessonCompleted(enrollmentId, lessonId);
      res.status(200).json({ success: true, data: progress });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new EnrollmentController();
