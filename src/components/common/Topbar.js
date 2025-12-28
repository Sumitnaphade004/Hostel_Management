import React, {useState} from "react";
import { useTheme } from "../../context/ThemeContext";
import { TextAlignJustify, Moon, Sun } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

const Topbar = () => {
  const { theme, currentTheme, setCurrentTheme, isCollapsed, setIsCollapsed } = useTheme();

  const [iconColor, setIconColor] = useState();
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  const topbarStyle = {
    height: "70px",
    background: theme.topbarBg,
    color: theme.topbarText,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    marginLeft: !isCollapsed ? "250px" : "70px",
    borderBottom: `1px solid ${theme.topbarBorder}`,
    transition: "all 0.3s ease",
  };

  return (
    <nav style={topbarStyle}>
      <button
        className="btn btn-sm d-flex align-items-center justify-content-center"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          background: theme.hover,
          border: `1px solid ${theme.border}`,
          color: theme.text,
          width: "36px",
          height: "36px",
        }}
      >
        {isCollapsed ? (
          <TextAlignJustify size={20} color={theme.textPrimary} />
        ) : (
          <TextAlignJustify size={20} color={theme.textPrimary} />
        )}
      </button>

      <div style={{ fontWeight: "500" }}>Hostel Dashboard</div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: theme.bgLight,
            border: `1px solid ${theme.border}`,
            color: theme.textPrimary,
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            currentTheme === "light" ? setIconColor(theme.topbarHover) : setIconColor("yellow");
          }}
          onMouseLeave={(e) => {
            setIconColor(theme.textSecondary);
          }}
        >
          {currentTheme === "light" ? <Moon color={iconColor} /> : <Sun color={iconColor} />}
        </button>

        <div
          className="d-flex align-items-center justify-content-center"
          style={{ color: theme.textSecondary }}
        >
          <ProfileDropdown theme={theme} />
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
