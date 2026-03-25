const Room = require("../models/Rooms");
const Member = require("../models/Member");

class RoomController {
  static async saveRoom(req, res) {
    try {
      const body = req.body;

      const existingRoom = await Room.findOne({
        where: { roomNo: body.roomNo },
      });

      if (existingRoom) {
        return res.status(200).json({
          success: false,
          message: "Room number already exists",
        });
      }

      await Room.create(body);

      res.status(200).json({ message: "Room data stored successfully." });
    } catch (error) {
      console.error("Error while saving the room:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  static async allRooms(req, res) {
    try {
      const status = req.query.status;
      let whereCondition = {};

      if (status) {
        whereCondition = { status: status };
      }

      const allRooms = await Room.findAll({
        where: whereCondition,
        include: [
          {
            model: Member,
            as: "members",
            where: { status: "active" },
            required: false,
            attributes: ["id"],
          },
        ],
      });

      res.status(200).json({ message: "All room data.", allRooms });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  static async roomProfile(req, res) {
    try {
      const id = req.params.id;

      const roomData = await Room.findOne({
        where: { id },
        include: [
          {
            model: Member,
            as: "members",
            where: { status: "active" },
            required: false,
          },
        ],
      });

      res.status(200).json({ message: "Room profile data.", roomData });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  static async updateRoom(req, res) {
    try {
      let body = req.body;
      console.log("Incomming data from frontend: ", body);

      const existingRoom = await Room.findOne({
        where: { roomNo: body.id },
      });

      if (!existingRoom) {
        return res.status(200).json({
          success: false,
          message: "Room not exists",
        });
      }

      const memberCount = await Room.count({
        include: [
          {
            model: Member,
            as: "members",
            where: { status: "active" },
            required: false,
            attributes: ["id"],
          },
        ],
        where: { id: 1 },
      });

      if (body.capacity < memberCount){
        res.status(200).json({ success: false, message: "You can't" });
      }

      if (body.capacity > existingRoom.capacity){
        body.status = "Available";
      }

      // await Room.update(body, { where: body.id });

      res.status(200).json({ success: true, message: "Room data updated successfully." });
    } catch (error) {
      console.error("Error while updating the room:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }
}

module.exports = RoomController;
