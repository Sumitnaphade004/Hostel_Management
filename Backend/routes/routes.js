const express = require("express");
const AuthController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/JwtMiddleware");
const RoomController = require("../controllers/roomController");
const MemberController = require("../controllers/memeberController");
const router = express.Router();

const Room = require('../models/Rooms');
const Member = require('../models/Member');

router.get('/', (req, res)=>{
    res.send("hello")
})

// ------------------------------------------------------------------ Authentication ------------------------------------------------------------------
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/me', authMiddleware, AuthController.loggedInUser);

// ------------------------------------------------------------------ Room ------------------------------------------------------------------
router.post('/save-room', authMiddleware, RoomController.saveRoom);
router.get('/rooms', authMiddleware, RoomController.allRooms);
router.get('/room-profile/:id', authMiddleware, RoomController.roomProfile);
router.post('/update-room', authMiddleware, RoomController.updateRoom);

// ------------------------------------------------------------------ Member ------------------------------------------------------------------
router.post('/save-member', authMiddleware, MemberController.saveMember);
router.get('/edit-member/:id', authMiddleware, MemberController.editMember);
router.post('/update-member', authMiddleware, MemberController.updateMember);
router.get('/members', authMiddleware, MemberController.allMembers);
router.get('/member-deactivate/:id', authMiddleware, MemberController.deactivateMember);

router.get('/test', async (req, res)=>{
          const memberCount = await Room.count({
            include: [{
              model: Member,
              as: "members",
              where: { status: "active" },
              required: false,
              attributes: ["id"],
            }],
            where: {id: 1}
          })

          res.json({memberCount});
});

module.exports = router;