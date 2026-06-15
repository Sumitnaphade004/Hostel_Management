const Payment = require("../models/Payments");

class PaymentController {
  static async addPayment(req, res) {
    try {
      const body = req.body;
      const payment = await Payment.create(body);

      payment.paymentId = `PAY-${String(payment.id).padStart(4, "0")}`;

      await payment.save();

      res.status(200).json({ success: true, message: "Payment Done." });
    } catch (error) {
      console.error("Error while creating the payment: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error." });
    }
  }

  static async allPayment(req, res) {
    try {
      const allPayments = await Payment.findAll({
        order: [["id", "DESC"]],
      });

      res
        .status(200)
        .json({ success: true, message: "All Payment Fetched.", allPayments });
    } catch (error) {
      console.error("Error while creating the payment: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error." });
    }
  }
}

module.exports = PaymentController;
