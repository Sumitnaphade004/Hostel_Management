import React, { useState, useRef, useEffect } from "react";
import { CircleUser, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ theme }) => {
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

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      {/* Profile Icon */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          color: theme.textSecondary,
        }}
        onMouseEnter={(e) => {
          setIconColor(theme.topbarHover);
        }}
        onMouseLeave={(e) => {
          setIconColor(theme.textSecondary);
        }}
      >
        <CircleUser size={26} color={iconColor}/>
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
              // logout logic here
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
