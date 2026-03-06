const express = require("express");
const AuthController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/JwtMiddleware");
const RoomController = require("../controllers/roomController");
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
router.get('/all-rooms', authMiddleware, RoomController.allRooms);

module.exports = router;