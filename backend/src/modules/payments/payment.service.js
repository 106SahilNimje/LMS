const Razorpay = require('razorpay');
const crypto = require('crypto');
const prisma = require('../../config/prisma');

class PaymentService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(userId, courseId) {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new Error('Course not found');

    const amount = course.price * 100; // Razorpay expects amount in paise

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_order_${courseId}_${userId}`,
    };

    const order = await this.razorpay.orders.create(options);
    
    // Create pending enrollment
    await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        razorpayOrderId: order.id,
        paymentStatus: 'PENDING'
      }
    });

    return order;
  }

  async verifyPayment(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update enrollment status
      await prisma.enrollment.updateMany({
        where: { razorpayOrderId: razorpay_order_id },
        data: { paymentStatus: 'SUCCESS' }
      });
      return true;
    } else {
      await prisma.enrollment.updateMany({
        where: { razorpayOrderId: razorpay_order_id },
        data: { paymentStatus: 'FAILED' }
      });
      throw new Error("Payment verification failed");
    }
  }
}

module.exports = new PaymentService();
