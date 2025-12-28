import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  LayoutDashboard,
  Bed,
  Users,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const { theme, isCollapsed} = useTheme();

  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Room Allocation", path: "/room", icon: Bed },
    { name: "Student Records", path: "/student", icon: Users },
  ];

  return (
      <aside
        className="d-flex flex-column position-fixed"
        style={{
          width: isCollapsed ? "80px" : "260px",
          height: "100vh",
          background: theme.sidebarBg,
          color: theme.sidebarText,
          borderRight: `1px solid ${theme.border}`,
          transition: "width 0.3s ease",
          zIndex: 1000,
        }}
      >
        {/* Header */}
        <div
          className={`d-flex align-items-center ${
            isCollapsed ? "justify-content-center" : "justify-content-start"
          } px-3 gap-3`}
          style={{
            minHeight: "70px",
            borderBottom: `1px solid ${theme.topbarBorder}`,
          }}
        >
          <Home size={24} color={theme.active} />

          {!isCollapsed && (
            <span className="fw-bold text-white fs-5">Hostel</span>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-grow-1 pt-3">
          <ul className="list-unstyled m-0 px-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;

              return (
                <Link
                  to={item.path}
                  key={item.name}
                  className={`d-flex align-items-center gap-3 ${
                    isCollapsed ? "justify-content-center" : "px-3"
                  } py-3 mb-1 text-decoration-none text-reset`}
                  onClick={() => setActiveItem(item.name)}
                  title={isCollapsed ? item.name : ""}
                  style={{
                    cursor: "pointer",
                    background: isActive ? theme.sidebarHover : "transparent",
                    borderLeft: isActive
                      ? `3px solid ${theme.sidebarBorder}`
                      : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = theme.sidebarHover;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon
                    size={22}
                    color={isActive ? theme.sidebarActive : theme.text}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  {!isCollapsed && (
                    <span
                      className={"fs-6"}
                      style={{
                        color: isActive ? theme.sidebarActive : ""
                      }}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </ul>
        </nav>
      </aside>
  );
};

export default Sidebar;
