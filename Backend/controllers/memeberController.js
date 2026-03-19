const Member = require("../models/Member");
const Rooms = require("../models/Rooms");

class MemberController {
  static async saveMember(req, res) {
    try {
      const memberData = req.body;

      const existingMember = await Member.findOne({
        where: {
          name: memberData.name,
          email: memberData.email,
        },
      });

      if (existingMember) {
        return res.status(200).json({
          success: false,
          message: "This member already exists.",
        });
      }

      const room = await Rooms.findOne({
        where: { id: memberData.roomId },
      });

      if (!room) {
        return res.status(404).json({
          success: false,
          message: "Room not found",
        });
      }

      const occupied = await Member.count({
        where: { roomId: memberData.roomId },
      });

      if (occupied < room.capacity) {
        await Member.create(memberData);

        if (occupied + 1 === room.capacity) {
          room.status = "Occupied";
        } else {
          room.status = "Available";
        }

        await room.save();

        return res.status(200).json({
          success: true,
          message: "Member added successfully.",
        });
      } else {
        room.status = "Occupied";
        await room.save();

        return res.status(200).json({
          success: false,
          message: "Selected room is already full.",
        });
      }
    } catch (error) {
      console.error("Error while saving the member: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  static async allMembers(req, res) {
    try {
      const members = await Member.findAll({
        include: [
          {
            model: Rooms,
            as: "room",
            attributes: ["roomNo"],
          },
        ],
        where: { status: "active"}
      });

      return res.status(200).json({
        success: true,
        message: "All members fetched successfully.",
        members,
      });
    } catch (error) {
      console.error("Error while fetching all the member: ", error);
      res.status(500).json({ message: "Internl Server Error." });
    }
  }

  static async editMember(req, res) {
    try {
      const id = req.params.id;

      const existingMember = await Member.findOne({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "Member detail fetched successfully.",
        memberData: existingMember,
      });
    } catch (error) {
      console.error("Error while fetching the member details: ", error);
      res.status(500).json({ message: "Internl Server Error." });
    }
  }

  static async updateMember(req, res) {
    try {
      const body = req.body;

      const existingMember = await Member.findOne({
        where: { id: body.id },
      });

      if (!existingMember) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      if (existingMember.roomId === body.roomId) {
        await Member.update(body, {
          where: { id: body.id },
        });

        return res.status(200).json({
          success: true,
          message: "Member updated successfully.",
        });
      }

      const oldRoom = await Rooms.findOne({
        where: { id: existingMember.roomId },
      });

      const newRoom = await Rooms.findOne({
        where: { id: body.roomId },
      });

      if (!newRoom) {
        return res.status(404).json({
          success: false,
          message: "New room not found",
        });
      }

      const occupied = await Member.count({
        where: { roomId: body.roomId },
      });

      if (occupied >= newRoom.capacity) {
        newRoom.status = "Occupied";
        await newRoom.save();

        return res.status(200).json({
          success: false,
          message: "Selected room is already full.",
          title: "Full",
        });
      }

      await Member.update(body, {
        where: { id: body.id },
      });

      if (occupied + 1 === newRoom.capacity) {
        newRoom.status = "Occupied";
      } else {
        newRoom.status = "Available";
      }
      await newRoom.save();

      if (oldRoom) {
        const oldOccupied = await Member.count({
          where: { roomId: oldRoom.id },
        });

        if (oldOccupied === 0) {
          oldRoom.status = "Available";
        } else if (oldOccupied < oldRoom.capacity) {
          oldRoom.status = "Available";
        }

        await oldRoom.save();
      }

      return res.status(200).json({
        success: true,
        message: "Member updated and room changed successfully.",
      });
    } catch (error) {
      console.error("Error while updating member: ", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  static async deactivateMember(req, res) {
    try {
      const id = req.params.id;

      const existingMember = await Member.findOne({
        where: { id },
      });

      if(!existingMember) return res.status(404).json({ success: true, message: "Member not found." });

      existingMember?.status === "active" ? existingMember.status = "inactive" : existingMember.status = "active";
      await existingMember.save();

      const room = await Rooms.findOne({
        where: { id: existingMember.roomId },
      });

      room.status = "Available";
      room.save();

      return res.status(200).json({ success: true, message: "Member status updated to inactive" });
    } catch (error) {
      console.error("Error while fetching all the member: ", error);
      res.status(500).json({ message: "Internl Server Error." });
    }
  }
}

module.exports = MemberController;
