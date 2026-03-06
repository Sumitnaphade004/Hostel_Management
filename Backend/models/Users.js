const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Rooms = require("./Rooms");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Rooms", 
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// Associations
Users.belongsTo(Rooms, { foreignKey: "roomId", as: "room" });
Rooms.hasMany(Users, { foreignKey: "roomId", as: "users" });

module.exports = Users;
