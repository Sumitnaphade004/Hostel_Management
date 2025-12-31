import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { LayoutDashboard, Bed, Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { theme, isCollapsed } = useTheme();

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [openMenu, setOpenMenu] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    {
      name: "Rooms",
      icon: Bed,
      children: [
        { name: "All Rooms", path: "/room" },
        { name: "Room Types", path: "/room-types" },
      ],
    },
  ];

  return (
    <aside
      className="d-flex flex-column position-fixed"
      style={{
        width: isCollapsed ? "80px" : "220px",
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
            const isParentActive = activeItem === item.name;
            const isOpen = openMenu === item.name;
            return (
              <div key={item.name}>
                {/* Parent Menu */}
                <div
                  className={`d-flex align-items-center gap-3 ${
                    isCollapsed ? "justify-content-center" : "px-3"
                  } py-3 mb-1`}
                  style={{
                    cursor: "pointer",
                    background: isParentActive
                      ? theme.sidebarHover
                      : "transparent",
                    borderLeft: isParentActive
                      ? `3px solid ${theme.sidebarBorder}`
                      : "3px solid transparent",
                  }}
                  onClick={() => {
                    if (item.children) {
                      setOpenMenu(isOpen ? null : item.name);
                    } else {
                      setActiveItem(item.name);
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (!isParentActive)
                      e.currentTarget.style.background = theme.sidebarHover;
                  }}
                  onMouseLeave={(e) => {
                    if (!isParentActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon
                    size={22}
                    color={isParentActive ? theme.sidebarActive : theme.text}
                  />

                  {!isCollapsed && (
                    <>
                      <span
                        className="flex-grow-1"
                        style={{
                          color: isParentActive ? theme.sidebarActive : "",
                        }}
                      >
                        {item.name}
                      </span>

                      {/* Arrow */}
                      {item.children && (
                        <span
                          style={{
                            display: "flex",
                            transition: "transform 0.3s ease",
                            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                          }}
                        >
                          <ChevronRight size={18} />
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Sub Menu */}
                {item.children && isOpen && !isCollapsed && (
                  <div className="ps-4">
                    {item.children.map((sub) => {
                      const isSubActive = activeItem === sub.name;

                      return (
                        <Link
                          to={sub.path}
                          key={sub.name}
                          className="d-block text-decoration-none py-2 px-3 mb-1"
                          onClick={() => setActiveItem(sub.name)}
                          style={{
                            color: isSubActive
                              ? theme.sidebarActive
                              : theme.sidebarText,
                            background: isSubActive
                              ? theme.sidebarHover
                              : "transparent",
                            borderRadius: "6px",
                            transition: "background 0.3s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = theme.sidebarHover)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
