const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Rooms = require("./Rooms");

const Members = sequelize.define(
  "Members",
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
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idProofType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idProofNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfJoining: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    guardianName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergencyContact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Rooms", 
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
    },
  },
  {
    tableName: "members",
    timestamps: true,
  }
);

// Associations
Members.belongsTo(Rooms, { foreignKey: "roomId", as: "room" });
Rooms.hasMany(Members, { foreignKey: "roomId", as: "members" });

module.exports = Members;
