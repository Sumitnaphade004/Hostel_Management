const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Users = require("./Users"); 

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // must match User table name
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_date: {
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
Payment.belongsTo(Users, { foreignKey: "user_id", as: "user" });
Users.hasMany(Payment, { foreignKey: "user_id", as: "payments" });

module.exports = Payment;
