const prisma = require('../../config/prisma');

class EnrollmentService {
  async getMyEnrollments(userId) {
    return await prisma.enrollment.findMany({
      where: { userId, paymentStatus: 'SUCCESS' },
      include: {
        course: {
          include: { modules: { include: { lessons: true } } }
        },
        progress: true
      }
    });
  }

  async createEnrollment(userId, courseId, razorpayOrderId) {
    return await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        razorpayOrderId
      }
    });
  }

  async markLessonCompleted(enrollmentId, lessonId) {
    return await prisma.progress.upsert({
      where: {
        enrollmentId_lessonId: { enrollmentId, lessonId }
      },
      update: {
        isCompleted: true
      },
      create: {
        enrollmentId,
        lessonId,
        isCompleted: true
      }
    });
  }
}

module.exports = new EnrollmentService();
