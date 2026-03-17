import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { LayoutDashboard, Bed, Home, ChevronRight, UserPlus, MinusIcon, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { theme, isCollapsed } = useTheme();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Rooms", path: "/rooms", icon: Bed },
    { name: "Members", icon: UserPlus, children: [{ name: "Add Member", path: "/add-member" }, { name: "All Members", path: "/view-member" }] },
    { name: "Transactions", icon: Wallet, children: [{ name: "Add Transaction", path: "/add-transactions" }, { name: "All Transactions", path: "/view-transactions" }] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 179, 237, 0.15); }
          50% { box-shadow: 0 0 0 6px rgba(99, 179, 237, 0); }
        }

        @keyframes dotBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }

        .sidebar-root {
          font-family: 'DM Sans', sans-serif;
        }

        .sidebar-root * {
          font-family: 'DM Sans', sans-serif;
        }

        .sidebar-logo-wrap {
          position: relative;
        }
        .sidebar-logo-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }

        .sidebar-nav-item {
          position: relative;
        }

        .sidebar-nav-item .active-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(180deg, #63b3ed, #4299e1);
          box-shadow: 0 0 8px rgba(99, 179, 237, 0.6);
          transition: all 0.3s ease;
        }

        .nav-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-icon-wrap.active {
          background: rgba(99, 179, 237, 0.18);
          box-shadow: 0 2px 10px rgba(99, 179, 237, 0.25);
        }

        .nav-icon-wrap.hovered:not(.active) {
          background: rgba(255, 255, 255, 0.07);
        }

        .sidebar-menu-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          margin-bottom: 4px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          text-decoration: none;
          border: 1px solid transparent;
        }

        .sidebar-menu-row.active {
          background: linear-gradient(135deg, rgba(99,179,237,0.15) 0%, rgba(66,153,225,0.08) 100%);
          border-color: rgba(99, 179, 237, 0.2);
          box-shadow: 0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .sidebar-menu-row:not(.active):hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.06);
          transform: translateX(3px);
        }

        .sidebar-menu-row.collapsed-row {
          justify-content: center;
          padding: 10px 8px;
        }
        .sidebar-menu-row.collapsed-row:not(.active):hover {
          transform: translateY(-1px);
        }

        .sidebar-label {
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: all 0.25s ease;
          flex-grow: 1;
        }

        .sidebar-label.active {
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .chevron-icon {
          opacity: 0.6;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
        }
        .chevron-icon.open {
          transform: rotate(90deg);
          opacity: 1;
        }

        .submenu-wrap {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }

        .sub-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          padding: 8px 12px;
          margin-bottom: 2px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 400;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .sub-link.sub-active {
          background: rgba(99, 179, 237, 0.12);
          font-weight: 600;
        }

        .sub-link:not(.sub-active):hover {
          background: rgba(255,255,255,0.05);
          padding-left: 16px;
        }

        .sub-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .sub-link.sub-active .sub-dot {
          width: 6px;
          height: 6px;
          animation: dotBounce 1.5s ease infinite;
        }

        .sidebar-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #68d391;
          box-shadow: 0 0 6px rgba(104, 211, 145, 0.7);
        }

        .tooltip-label {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: rgba(15,20,35,0.95);
          color: #e2e8f0;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 7px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 2000;
        }

        .sidebar-menu-row:hover .tooltip-label {
          opacity: 1;
        }

        .sidebar-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0 14px;
          margin-bottom: 6px;
          margin-top: 12px;
          opacity: 0.35;
        }

        .sidebar-footer {
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .sidebar-footer-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .avatar-ring {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #63b3ed, #4299e1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(99,179,237,0.35);
        }

        .footer-text-primary {
          font-size: 0.78rem;
          font-weight: 600;
          color: #e2e8f0;
          line-height: 1.2;
        }

        .footer-text-secondary {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.2;
        }
      `}</style>

      <aside
        className="d-flex flex-column position-fixed sidebar-root"
        style={{
          width: isCollapsed ? "72px" : "230px",
          height: "100vh",
          background: theme.sidebarBg || "linear-gradient(180deg, #0f1724 0%, #111827 100%)",
          color: theme.sidebarText,
          borderRight: `1px solid rgba(255,255,255,0.06)`,
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1000,
          boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="d-flex align-items-center gap-3 sidebar-logo-wrap"
          style={{
            minHeight: "68px",
            transition: "all 0.4s ease",
            justifyContent: isCollapsed ? "center" : "flex-start",
            paddingLeft: isCollapsed ? "0" : "1.1rem",
            paddingRight: isCollapsed ? "0" : "1.1rem",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "11px",
              background: "linear-gradient(135deg, rgba(99,179,237,0.25) 0%, rgba(66,153,225,0.15) 100%)",
              border: "1px solid rgba(99,179,237,0.3)",
              boxShadow: "0 2px 12px rgba(99,179,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(8deg)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,179,237,0.35), inset 0 1px 0 rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(99,179,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)";
            }}
          >
            <Home size={18} color="#63b3ed" />
          </div>
          {!isCollapsed && (
            <div style={{ overflow: "hidden" }}>
              <span
                className="fw-bold fs-5"
                style={{
                  background: "linear-gradient(135deg, #e2e8f0 30%, #94a3b8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.01em",
                  display: "block",
                }}
              >
                Hostel
              </span>
              <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", fontWeight: 500 }}>
                MANAGEMENT
              </span>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-grow-1 pt-3" style={{ overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}>
          <ul className="list-unstyled m-0 px-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              const isParentActive = item.path
                ? location.pathname.startsWith(item.path)
                : item.children?.some((sub) => location.pathname.startsWith(sub.path));

              const isOpen = openMenu === item.name || isParentActive;
              const isHovered = hoveredItem === item.name;

              return (
                <div
                  key={item.name}
                  className="sidebar-nav-item"
                  style={{
                    animation: `fadeInSlide 0.35s ease-out ${index * 0.08}s both`,
                  }}
                >
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`sidebar-menu-row ${isParentActive ? "active" : ""} ${isCollapsed ? "collapsed-row" : ""}`}
                      style={{ color: "inherit" }}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {isParentActive && <div className="active-indicator" />}

                      <div className={`nav-icon-wrap ${isParentActive ? "active" : ""} ${isHovered && !isParentActive ? "hovered" : ""}`}>
                        <Icon
                          size={18}
                          color={isParentActive ? "#63b3ed" : isHovered ? "#94a3b8" : "rgba(255,255,255,0.45)"}
                          style={{ transition: "all 0.25s ease" }}
                        />
                      </div>

                      {!isCollapsed && (
                        <span
                          className={`sidebar-label ${isParentActive ? "active" : ""}`}
                          style={{
                            color: isParentActive ? "#e2e8f0" : "rgba(255,255,255,0.55)",
                          }}
                        >
                          {item.name}
                        </span>
                      )}

                      {isCollapsed && (
                        <span className="tooltip-label">{item.name}</span>
                      )}
                    </Link>
                  ) : (
                    <>
                      <div
                        className={`sidebar-menu-row ${isParentActive ? "active" : ""} ${isCollapsed ? "collapsed-row" : ""}`}
                        onClick={() => setOpenMenu(isOpen && !isParentActive ? null : item.name)}
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {isParentActive && <div className="active-indicator" />}

                        <div className={`nav-icon-wrap ${isParentActive ? "active" : ""} ${isHovered && !isParentActive ? "hovered" : ""}`}>
                          <Icon
                            size={18}
                            color={isParentActive ? "#63b3ed" : isHovered ? "#94a3b8" : "rgba(255,255,255,0.45)"}
                            style={{ transition: "all 0.25s ease" }}
                          />
                        </div>

                        {!isCollapsed && (
                          <>
                            <span
                              className={`sidebar-label ${isParentActive ? "active" : ""}`}
                              style={{
                                color: isParentActive ? "#e2e8f0" : "rgba(255,255,255,0.55)",
                              }}
                            >
                              {item.name}
                            </span>
                            <ChevronRight
                              size={15}
                              className={`chevron-icon ${isOpen ? "open" : ""}`}
                              style={{
                                color: isParentActive ? "#63b3ed" : "rgba(255,255,255,0.3)",
                              }}
                            />
                          </>
                        )}

                        {isCollapsed && (
                          <span className="tooltip-label">{item.name}</span>
                        )}
                      </div>

                      {/* Sub Menu */}
                      {item.children && !isCollapsed && (
                        <div
                          className="submenu-wrap"
                          style={{
                            maxHeight: isOpen ? "500px" : "0",
                            opacity: isOpen ? 1 : 0,
                          }}
                        >
                          <div className="ps-4 pb-1">
                            <div
                              style={{
                                borderLeft: "1px solid rgba(99,179,237,0.15)",
                                paddingLeft: "12px",
                                marginLeft: "4px",
                              }}
                            >
                              {item.children.map((sub, subIndex) => {
                                const isSubActive = location.pathname === sub.path;

                                return (
                                  <Link
                                    key={sub.name}
                                    to={sub.path}
                                    className={`sub-link ${isSubActive ? "sub-active" : ""}`}
                                    style={{
                                      color: isSubActive ? "#93c5fd" : "rgba(255,255,255,0.42)",
                                      animation: isOpen
                                        ? `fadeInSlide 0.3s ease-out ${subIndex * 0.08}s both`
                                        : "none",
                                    }}
                                  >
                                    <div
                                      className="sub-dot"
                                      style={{
                                        background: isSubActive ? "#63b3ed" : "rgba(255,255,255,0.2)",
                                        boxShadow: isSubActive ? "0 0 6px rgba(99,179,237,0.5)" : "none",
                                      }}
                                    />
                                    {sub.name}
                                  </Link>
                                );
                              })}
                            </div>
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

        {/* Footer */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="sidebar-footer-inner">
              <div className="avatar-ring">A</div>
              <div style={{ overflow: "hidden", minWidth: 0 }}>
                <div className="footer-text-primary">Admin</div>
                <div className="footer-text-secondary">admin@hostel.com</div>
              </div>
              <div className="sidebar-badge" />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;