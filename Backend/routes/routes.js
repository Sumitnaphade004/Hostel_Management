const express = require("express");
const AuthController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/JwtMiddleware");
const RoomController = require("../controllers/roomController");
const MemberController = require("../controllers/memeberController");
const router = express.Router();

const Room = require('../models/Rooms');
const Member = require('../models/Member');
const uploads = require("../middlewares/uploads");
const PaymentController = require("../controllers/paymentController");
const DashboardController = require("../controllers/dashboardController");

router.get('/', (req, res)=>{
    res.send("hello")
})

// ------------------------------------------------------------------ Dashboard ------------------------------------------------------------------
router.get("/dashboard", authMiddleware, DashboardController.dashboardData);

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
router.post('/save-member', authMiddleware, uploads, MemberController.saveMember);
router.get('/edit-member/:id', authMiddleware, MemberController.editMember);
router.post('/update-member', authMiddleware, uploads, MemberController.updateMember);
router.get('/member-profile/:id', authMiddleware, uploads, MemberController.memberProfile);
router.get('/members', authMiddleware, MemberController.allMembers);
router.get('/inactive-members', authMiddleware, MemberController.inactiveMembers);
router.get('/member-deactivate/:id', authMiddleware, MemberController.deactivateMember);

// ------------------------------------------------------------------ Payment ------------------------------------------------------------------
router.post('/add-payment', authMiddleware, PaymentController.addPayment);
router.get('/payments', authMiddleware, PaymentController.allPayment);

module.exports = router;