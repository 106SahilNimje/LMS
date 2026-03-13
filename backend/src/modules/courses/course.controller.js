const courseService = require('./course.service');

class CourseController {
  async getAllCourses(req, res, next) {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json({ success: true, data: courses });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getCourseById(req, res, next) {
    try {
      const course = await courseService.getCourseById(req.params.id);
      res.status(200).json({ success: true, data: course });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createCourse(req, res, next) {
    try {
      // req.user from protect middleware
      const course = await courseService.createCourse(req.body, req.user.id);
      res.status(201).json({ success: true, data: course });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async addModule(req, res, next) {
    try {
      const module = await courseService.addModule(req.params.id, req.body);
      res.status(201).json({ success: true, data: module });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async addLesson(req, res, next) {
    try {
      const lesson = await courseService.addLesson(req.params.moduleId, req.body);
      res.status(201).json({ success: true, data: lesson });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new CourseController();
