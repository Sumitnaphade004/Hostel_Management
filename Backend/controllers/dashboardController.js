const Logins = require("../models/Logins");
const Member = require("../models/Member");
const Payment = require("../models/Payments");
const Room = require("../models/Rooms");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class DashboardController {
  static async dashboardData(req, res) {
    try {
      const now = new Date();

      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const [
        overAllIncome,
        monthlyIncome,
        activeMemberCount,
        roomCount,
        recentMembers,
        recentTransactions,
      ] = await Promise.all([
        Payment.sum("amount", { where: { status: "Paid" } }),
        Payment.sum("amount", {
          where: {
            status: "Paid",
            paymentDate: { [Op.between]: [startOfMonth, endOfMonth] },
          },
        }),
        Member.count({ where: { status: "active" } }),
        Room.count(),
        Member.findAll({
          attributes: ["id", "name"],
          order: [["id", "DESC"]],
          limit: 10,
          include: [
            {
              model: Room,
              as: "room",
              attributes: ["roomNo", "rent"],
            },
          ],
        }),
        Payment.findAll({
          attributes: ["userName", "amount", "paymentDate"],
          order: [["id", "DESC"]],
          limit: 10,
        }),
      ]);

      const data = {
        overAllIncome,
        monthlyIncome,
        activeMemberCount,
        roomCount,
        recentMembers,
        recentTransactions,
      }

      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      console.error("Error: ", error);
      return res.status(404).json({ message: "Internal Server Error." });
    }
  }
}

module.exports = DashboardController;
