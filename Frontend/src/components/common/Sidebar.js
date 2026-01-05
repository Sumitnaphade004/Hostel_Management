import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { LayoutDashboard, Bed, Home, ChevronRight, UserPlus, CircleSmall, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { theme, isCollapsed } = useTheme();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Rooms", path: "/rooms", icon: Bed },
    { name: "Members", icon: UserPlus, children: [{ name: "Add Member", path: "/add-member" }, {name: "All Members", path: "/view-member"}] },
    { name: "Transactions", icon: Wallet, children: [{ name: "Add Transaction", path: "/add-transactions" }, {name: "All Transactions", path: "/view-transactions"}] },
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
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1000,
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Header */}
      <div
        className="d-flex align-items-center gap-3"
        style={{
          minHeight: "70px",
          borderBottom: `1px solid ${theme.topbarBorder}`,
          transition: "all 0.4s ease",
          justifyContent: isCollapsed ? "center" : "flex-start",
          paddingLeft: isCollapsed ? "0" : "1rem",
          paddingRight: isCollapsed ? "0" : "1rem",
        }}
      >
        <div
          style={{
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          }}
        >
          <Home size={24} color={theme.active} />
        </div>
        {!isCollapsed && (
          <span
            className="fw-bold text-white fs-5"
          >
            Hostel
          </span>
        )}
      </div>  

      {/* Menu */}
      <nav className="flex-grow-1 pt-3">
        <ul className="list-unstyled m-0 px-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            const isParentActive = item.path
              ? location.pathname === item.path
              : item.children?.some((sub) =>
                  location.pathname.startsWith(sub.path)
                );

            const isOpen = openMenu === item.name || isParentActive;

            return (
              <div
                key={item.name}
                style={{
                  animation: `fadeInSlide 0.3s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Parent Item */}
                {item.path ? (
                  /* Dashboard */
                  <Link to={item.path} className="text-decoration-none">
                    <div
                      className={`d-flex align-items-center gap-3 ${
                        isCollapsed ? "justify-content-center" : "px-3"
                      } py-3 mb-2`}
                      style={{
                        background: isParentActive
                          ? `linear-gradient(90deg, ${theme.sidebarHover} 0%, transparent 100%)`
                          : "transparent",
                        borderLeft: isParentActive
                          ? `3px solid ${theme.sidebarBorder}`
                          : "3px solid transparent",
                        borderRadius: "8px",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => {
                        if (!isParentActive) {
                          e.currentTarget.style.background = `${theme.sidebarHover}40`;
                          e.currentTarget.style.transform = "translateX(5px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isParentActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.transform = "translateX(0)";
                        }
                      }}
                    >
                      <Icon
                        size={22}
                        color={
                          isParentActive ? theme.sidebarActive : theme.text
                        }
                        style={{
                          transition: "all 0.3s ease",
                        }}
                      />
                      {!isCollapsed && (
                        <span
                          style={{
                            color: isParentActive
                              ? theme.sidebarActive
                              : theme.sidebarText,
                            fontWeight: isParentActive ? "600" : "500",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {item.name}
                        </span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <>
                    <div
                      className={`d-flex align-items-center gap-3 ${
                        isCollapsed ? "justify-content-center" : "px-3"
                      } py-3 mb-2`}
                      style={{
                        cursor: "pointer",
                        background: isParentActive
                          ? `linear-gradient(90deg, ${theme.sidebarHover} 0%, transparent 100%)`
                          : "transparent",
                        borderLeft: isParentActive
                          ? `3px solid ${theme.sidebarBorder}`
                          : "3px solid transparent",
                        borderRadius: "8px",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onClick={() => setOpenMenu(isOpen ? null : item.name)}
                      onMouseEnter={(e) => {
                        if (!isParentActive) {
                          e.currentTarget.style.background = `${theme.sidebarHover}40`;
                          e.currentTarget.style.transform = "translateX(5px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isParentActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.transform = "translateX(0)";
                        }
                      }}
                    >
                      <Icon
                        size={22}
                        color={
                          isParentActive ? theme.sidebarActive : theme.text
                        }
                        style={{
                          transition: "all 0.3s ease",
                        }}
                      />
                      {!isCollapsed && (
                        <>
                          <span
                            className="flex-grow-1"
                            style={{
                              color: isParentActive
                                ? theme.sidebarActive
                                : theme.sidebarText,
                              fontWeight: isParentActive ? "600" : "500",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {item.name}
                          </span>
                          <ChevronRight
                            size={18}
                            style={{
                              transform: isOpen
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              color: isParentActive
                                ? theme.sidebarActive
                                : theme.text,
                            }}
                          />
                        </>
                      )}
                    </div>

                    {/* Sub Menu */}
                    {item.children && !isCollapsed && (
                      <div
                        style={{
                          maxHeight: isOpen ? "500px" : "0",
                          overflow: "hidden",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                        }}
                      >
                        <div className="ps-4">
                          {item.children.map((sub, subIndex) => {
                            const isSubActive = location.pathname === sub.path;

                            return (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                className="d-block text-decoration-none py-2 px-3 mb-1"
                                style={{
                                  color: isSubActive
                                    ? theme.sidebarActive
                                    : theme.sidebarText,
                                  background: isSubActive
                                    ? theme.sidebarHover
                                    : "transparent",
                                  borderRadius: "6px",
                                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                  fontSize: "0.9rem",
                                  fontWeight: isSubActive ? "600" : "400",
                                  position: "relative",
                                  paddingLeft: "1rem",
                                  animation: isOpen
                                    ? `fadeInSlide 0.3s ease-out ${subIndex * 0.1}s both`
                                    : "none",
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSubActive) {
                                    e.currentTarget.style.background = `${theme.sidebarHover}60`;
                                    e.currentTarget.style.paddingLeft = "1.3rem";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSubActive) {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.paddingLeft = "1rem";
                                  }
                                }}
                              >
                                <CircleSmall size={12} color={isSubActive ? theme.sidebarActive : theme.sidebarText }/>
                                <span
                                  style={{
                                    display: "inline-block",
                                    background: isSubActive
                                      ? theme.sidebarActive
                                      : theme.sidebarText,
                                    marginRight: "8px",
                                    transition: "all 0.3s ease",
                                  }}
                                />
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </ul>
      </nav>

      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;