const express = require("express");
const AuthController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/JwtMiddleware");
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("hello")
})
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/me', authMiddleware, AuthController.loggedInUser);

module.exports = router;