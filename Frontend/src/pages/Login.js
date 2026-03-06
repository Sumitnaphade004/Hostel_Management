import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import apiRequest from "../api/ApiRequest";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

const Login = () => {
  const { theme, currentTheme } = useTheme();
  const { fetchUser } = useUser();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter valid credentials");
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/login", { method: "POST", body: formData });
      await fetchUser();
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = currentTheme !== "light";

  return (
    <div
      className="login-root d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: theme.containerBg, position: "relative", overflow: "hidden" }}
    >
      {/* Decorative background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Card */}
      <div className="login-card">
        {/* Brand strip */}
        <div className="brand-strip">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="brand-name">Hostel Management</span>
        </div>

        <div className="card-body-inner">
          {/* Heading */}
          <div className="heading-block">
            <h2 className="main-heading" style={{ color: theme.textPrimary }}>
              Welcome back
            </h2>
            <p className="sub-heading" style={{ color: theme.textMuted }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="error-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email field */}
            <div className={`field-group ${focused === "email" ? "field-focused" : ""}`}>
              <label className="field-label" style={{ color: theme.textMuted }}>
                Email address
              </label>
              <div className="field-wrap" style={{
                background: theme.inputBg,
                borderColor: focused === "email" ? "#6366f1" : theme.inputBorder,
              }}>
                <Mail size={16} className="field-icon" style={{ color: focused === "email" ? "#6366f1" : theme.textMuted }} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="field-input"
                  style={{ background: "transparent", color: theme.inputText }}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password field */}
            <div className={`field-group ${focused === "password" ? "field-focused" : ""}`} style={{ marginBottom: "28px" }}>
              <label className="field-label" style={{ color: theme.textMuted }}>
                Password
              </label>
              <div className="field-wrap" style={{
                background: theme.inputBg,
                borderColor: focused === "password" ? "#6366f1" : theme.inputBorder,
              }}>
                <Lock size={16} className="field-icon" style={{ color: focused === "password" ? "#6366f1" : theme.textMuted }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className="field-input"
                  style={{ background: "transparent", color: theme.inputText }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  style={{ color: theme.textMuted }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={17} className="btn-arrow" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .login-root * {
          font-family: 'Sora', sans-serif;
          box-sizing: border-box;
        }

        /* ── Blobs ── */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.45;
          animation: drift 10s ease-in-out infinite alternate;
        }
        .blob-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #818cf8 0%, transparent 70%);
          top: -120px; left: -120px;
          animation-duration: 12s;
        }
        .blob-2 {
          width: 320px; height: 320px;
          background: radial-gradient(circle, #34d399 0%, transparent 70%);
          bottom: -80px; right: -60px;
          animation-duration: 9s;
          animation-delay: -3s;
        }
        .blob-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, #f472b6 0%, transparent 70%);
          top: 55%; left: 65%;
          animation-duration: 14s;
          animation-delay: -6s;
          opacity: 0.25;
        }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        /* ── Grid overlay ── */
        .grid-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ── Card ── */
        .login-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          border-radius: 20px;
          overflow: hidden;
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.04) inset;
          animation: riseIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Brand strip ── */
        .brand-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 28px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border-bottom: none;
        }
        .brand-icon {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.18);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .brand-name {
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.01em;
        }

        /* ── Card inner body ── */
        .card-body-inner {
          padding: 32px 32px 24px;
        }

        /* ── Headings ── */
        .heading-block { margin-bottom: 26px; }
        .main-heading {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .sub-heading {
          font-size: 14px;
          margin: 0;
        }

        /* ── Error pill ── */
        .error-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13.5px;
          margin-bottom: 20px;
          animation: shake 0.35s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(3px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }

        /* ── Field ── */
        .field-group { margin-bottom: 18px; }
        .field-label {
          display: block;
          font-size: 12.5px;
          font-weight: 500;
          margin-bottom: 7px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .field-wrap {
          display: flex;
          align-items: center;
          border: 1.5px solid;
          border-radius: 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
          padding: 0 14px;
          gap: 10px;
          height: 48px;
        }
        .field-focused .field-wrap {
          box-shadow: 0 0 0 3px rgba(99,102,241,0.18);
        }
        .field-icon { flex-shrink: 0; transition: color 0.2s; }
        .field-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14.5px;
          height: 100%;
          padding: 0;
        }
        .field-input::placeholder { color: ${theme.textSecondary}; opacity: 0.6; }
        .eye-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .eye-btn:hover { color: #6366f1 !important; }

        /* ── Submit button ── */
        .submit-btn {
          width: 100%;
          height: 50px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 18px rgba(79,70,229,0.4);
          letter-spacing: 0.01em;
          margin-bottom: 20px;
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(79,70,229,0.5);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-arrow { transition: transform 0.2s; }
        .submit-btn:hover .btn-arrow { transform: translateX(3px); }

        /* ── Spinner ── */
        .spinner {
          width: 17px; height: 17px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

      `}</style>
    </div>
  );
};

export default Login;