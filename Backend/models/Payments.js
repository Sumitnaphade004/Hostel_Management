const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Member = require("./Member"); 

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "members", 
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING, // e.g., "September 2025"
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Paid", "Pending"),
      defaultValue: "Pending",
    },
  },
  {
    tableName: "payments",
    timestamps: true,
  }
);

// Associations
Payment.belongsTo(Member, { foreignKey: "userId", as: "member" });
Member.hasMany(Payment, { foreignKey: "userId", as: "payments" });

module.exports = Payment;