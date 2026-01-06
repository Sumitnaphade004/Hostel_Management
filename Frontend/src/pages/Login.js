import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { theme, currentTheme } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 🔗 API call here
    setTimeout(() => {
      setLoading(false);
      if (!formData.email || !formData.password) {
        setError("Please enter valid credentials");
      }
    }, 1500);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: theme.containerBg }}
    >
      <div
        className="card p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          boxShadow: theme.cardShadow,
          borderRadius: "16px",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h3 style={{ color: theme.textPrimary, fontWeight: "700" }}>
            Hostel Management
          </h3>
          <p style={{ color: theme.textMuted }}>
            Login to continue
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3 position-relative">
            <Mail
              size={18}
              style={{
                position: "absolute",
                top: "50%",
                left: "14px",
                transform: "translateY(-50%)",
                color: theme.textMuted,
              }}
            />
            <input
              type="email"
              name="email"
              className={`form-control themed-input-${currentTheme === "light" ? "light" : "dark"}`}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              style={{
                paddingLeft: "42px",
                background: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                color: theme.inputText,
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4 position-relative">
            <Lock
              size={18}
              style={{
                position: "absolute",
                top: "50%",
                left: "14px",
                transform: "translateY(-50%)",
                color: theme.textMuted,
              }}
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`form-control themed-input-${currentTheme === "light" ? "light" : "dark"}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                paddingLeft: "42px",
                paddingRight: "42px",
                background: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                color: theme.inputText,
              }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "50%",
                right: "14px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: theme.textMuted,
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-100"
            disabled={loading}
            style={{
              background: theme.btnPrimary,
              color: "#fff",
              padding: "10px",
              fontWeight: "600",
              borderRadius: "10px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-3">
          <small style={{ color: theme.textMuted }}>
            © {new Date().getFullYear()} Hostel Management System
          </small>
        </div>
      </div>
      <style>{`
        .themed-input-light::placeholder {
          color: ${theme.textSecondary};
        }

        .themed-input-dark::placeholder {
          color: ${theme.textSecondary};
        }
        `}</style>
    </div>
  );
};

export default Login;