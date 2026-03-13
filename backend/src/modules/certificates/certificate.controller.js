const certificateService = require('./certificate.service');

class CertificateController {
  async generate(req, res, next) {
    try {
      const { courseId } = req.params;
      const cert = await certificateService.generateCertificate(req.user.id, courseId);
      res.status(201).json({ success: true, data: cert });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getMyCertificates(req, res, next) {
    try {
      const certs = await certificateService.getMyCertificates(req.user.id);
      res.status(200).json({ success: true, data: certs });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new CertificateController();
