import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import { useTheme } from "../context/ThemeContext";

const Header = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        background: theme.bg,
        minHeight: "100vh",
        transition: "0.3s",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <main
          style={{
            marginLeft: "260px",
            padding: "30px",
            color: theme.textPrimary,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Header;
