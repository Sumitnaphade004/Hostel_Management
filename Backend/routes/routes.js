const express = require("express");
const AuthController = require("../controllers/authController");
const router = express.Router();

router.get('/', AuthController.loginPage);

module.exports = router;