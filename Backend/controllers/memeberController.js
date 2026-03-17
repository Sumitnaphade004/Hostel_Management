const Member = require('../models/Member');

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
            const members = await Member.findAll();
            return res.status(200).json({success: true, message: "All members fetched successfully.", members});
        } catch (error) {
            console.error("Error while fetching all the member: ", error);
            res.status(500).json({ message: "Internl Server Error." });
        }
    }
}

module.exports = MemberController;