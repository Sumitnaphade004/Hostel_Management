import React, { useState, useRef, useEffect } from "react";
import { CircleUser, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../api/ApiRequest";

const ProfileDropdown = ({ theme, user }) => {
  const [open, setOpen] = useState(false);
  const [iconColor, setIconColor] = useState();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await apiRequest("/logout");
      console.log("Frontend logout:", response);
      navigate("/");
    } catch (error) {
      console.log("Error!");
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      {/* Profile Icon */}
      <div
        className="d-flex gap-2 align-items-center"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setIconColor(theme.topbarHover)}
        onMouseLeave={() => setIconColor(theme.textPrimary)}
        style={{
          cursor: "pointer",
          color: iconColor,
        }}
      >
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              objectFit: "cover",
              border: `2px solid ${iconColor}`,
            }}
          />
        ) : (
          <CircleUser size={32} color={iconColor} />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "1.1", // 🔥 reduces spacing
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Hello! {user?.name}
          </span>

          <span
            style={{
              fontSize: "12px",
              color: iconColor,
            }}
          >
            {user?.email}
          </span>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "40px",
            background: theme.bgLight,
            border: `1px solid ${theme.border}`,
            borderRadius: "8px",
            minWidth: "160px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
          <button
            className="d-flex align-items-center gap-2 px-3 py-2 w-100 border-0 bg-transparent"
            style={{ color: theme.textPrimary }}
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
          >
            <User size={18} />
            Profile
          </button>

          <hr className="m-0" />

          <button
            className="d-flex align-items-center gap-2 px-3 py-2 w-100 border-0 bg-transparent"
            style={{ color: "#ef4444" }}
            onClick={() => {
              setOpen(false);
              console.log("Logout clicked");
              handleLogout();
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
