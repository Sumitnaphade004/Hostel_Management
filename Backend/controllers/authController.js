const Logins = require("../models/Logins");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middlewares/JwtMiddleware");

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Logins.findOne({
        where: {
          email: email,
        },
      });

      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Access Denied." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(401)
          .json({ success: false, message: "Access Denied." });

      // ✅ Token payload
      const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      };

      const token = generateToken(payload);

      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      });

      return res
        .status(200)
        .json({ success: true, message: "Login Successful."});
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false, // must match login
        sameSite: "lax",
        path: '/'
      });
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", err);
      return res.status(404).json({ message: "Internal Server Error." });
    }
  }

  static async loggedInUser(req, res){
    try {
      res.status(200).json({success: true, user: req.user});
    } catch (error) {
      console.error("Logout error:", err);
      return res.status(404).json({ message: "Internal Server Error." });
    }
  }
}

module.exports = AuthController;