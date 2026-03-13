const paymentService = require('./payment.service');

class PaymentController {
  async createOrder(req, res, next) {
    try {
      const { courseId } = req.body;
      const order = await paymentService.createOrder(req.user.id, courseId);
      res.status(200).json({ success: true, data: order });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async verifyPayment(req, res, next) {
    try {
      await paymentService.verifyPayment(req.body);
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new PaymentController();
