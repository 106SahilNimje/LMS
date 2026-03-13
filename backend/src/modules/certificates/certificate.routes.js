const express = require('express');
const router = express.Router();
const certificateController = require('./certificate.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.post('/generate/:courseId', protect, certificateController.generate);
router.get('/my-certificates', protect, certificateController.getMyCertificates);

module.exports = router;
