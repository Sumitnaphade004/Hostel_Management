const express = require("express");
const AuthController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/JwtMiddleware");
const RoomController = require("../controllers/roomController");
const MemberController = require("../controllers/memeberController");
const router = express.Router();

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

// ------------------------------------------------------------------ Member ------------------------------------------------------------------
router.post('/save-member', authMiddleware, MemberController.saveMember);
router.get('/edit-member/:id', authMiddleware, MemberController.editMember);
router.post('/update-member', authMiddleware, MemberController.updateMember);
router.get('/members', authMiddleware, MemberController.allMembers);
router.get('/delete-member/:id', authMiddleware, MemberController.deleteMember);


module.exports = router;