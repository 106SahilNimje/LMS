const prisma = require('../../config/prisma');

class CourseService {
  async getAllCourses() {
    return await prisma.course.findMany({
      include: {
        instructor: { select: { id: true, name: true } },
        modules: {
          include: { lessons: true }
        }
      }
    });
  }

  async getCourseById(id) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        instructor: { select: { id: true, name: true } },
        modules: {
          include: { lessons: true }
        }
      }
    });
    if (!course) throw new Error('Course not found');
    return course;
  }

  async createCourse(data, instructorId) {
    return await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        thumbnail: data.thumbnail,
        instructorId
      }
    });
  }

  async addModule(courseId, data) {
    return await prisma.module.create({
      data: {
        title: data.title,
        order: data.order || 0,
        courseId
      }
    });
  }

  async addLesson(moduleId, data) {
    return await prisma.lesson.create({
      data: {
        title: data.title,
        videoUrl: data.videoUrl,
        pdfUrl: data.pdfUrl,
        order: data.order || 0,
        moduleId
      }
    });
  }
}

module.exports = new CourseService();
