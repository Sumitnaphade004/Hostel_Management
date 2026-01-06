const Logins = require("../models/Logins");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10) || 86400000,
      });

      return res
        .status(200)
        .json({ success: true, message: "Login Successful.", token });
    } catch (err) {
      console.error("Login error:", err);
      return res.redirect("/login?error=ServerError");
    }
  }
}

module.exports = AuthController;
