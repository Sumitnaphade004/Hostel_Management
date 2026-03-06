const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    roomNo: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,           
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Available", "Occupied"),
      allowNull: false,
    },
  },
  {
    tableName: "rooms",
    timestamps: true, 
  }
);

module.exports = Room;