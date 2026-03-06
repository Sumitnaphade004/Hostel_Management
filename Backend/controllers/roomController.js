const Room = require("../models/Rooms");

class RoomController {
  static async saveRoom(req, res) {
    try {
      const body = req.body;

      const existingRoom = await Room.findOne({
        where: { roomNo: body.roomNo },
      });

      if (existingRoom) {
        res.status(
          res.status(409).json({
            success: false,
            message: "Room number already exists",
          }),
        );
      }

      await Room.create(body);

      res.status(200).json({ message: "Room data stored successfully." });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  static async allRooms(req, res) {
    try {
      const allRooms = await Room.findAll();

      res.status(200).json({ message: "All room data.", allRooms });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }
}

module.exports = RoomController;
