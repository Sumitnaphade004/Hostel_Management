const Member = require('../models/Member');
const Rooms = require('../models/Rooms');

class MemberController{
    static async saveMember(req, res){
        try {
            const memberData = req.body;

            const existingMember = await Member.findOne({
                where: {
                    name: memberData.name,
                    email: memberData.email
                }
            });
            
            if(existingMember){
                return res.status(200).json({
                    success: false,
                    message: "This member is already exists."
                })
            }

            await Member.create(memberData);
            res.status(200).json({success: true, message: "Member added successfully."});
        } catch (error) {
            console.error("Error while saving the member: ", error);
            res.status(500).json({ message: "Internl Server Error." });
        }
    }

    static async allMembers(req, res){
        try {
            const members = await Member.findAll({
                include: [{
                    model: Rooms,
                    as: "room",
                    attributes: ["roomNo"]
                }]
            });
            return res.status(200).json({success: true, message: "All members fetched successfully.", members});
        } catch (error) {
            console.error("Error while fetching all the member: ", error);
            res.status(500).json({ message: "Internl Server Error." });
        }
    }

    static async editMember(req, res){
        try {
            const id = req.params.id;

            const existingMember = await Member.findOne({
                where: { id }
            });

            res.status(200).json({success: true, message: "Member detail fetched successfully.", memberData: existingMember });
        } catch (error) {
            console.error("Error while fetching the member details: ", error);
            res.status(500).json({ message: "Internl Server Error." });
        }
    }

    static async updateMember(req, res){
        try {
            const body = req.body;

            await Member.update(body,{
                where: {id: body.id}
            })
            
            res.status(200).json({success: true, message: "Member details updated successfully."});
        } catch (error) {
            console.error("Error while updating the member details: ", error);
            res.status(500).json({ message: "Internl Server Error." });
        }
    }

    static async deleteMember(req, res){
        try {
            const id = req.params.id;

            await Member.destroy({
                where: { id }
            });

            return res.status(200).json({success: true, message: "Member deleted successfully."});
        } catch (error) {
            console.error("Error while fetching all the member: ", error);
            res.status(500).json({ message: "Internl Server Error." });
        }
    }
}

module.exports = MemberController;