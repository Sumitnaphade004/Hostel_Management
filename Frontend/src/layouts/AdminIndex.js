import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/common/Footer";

const AdminIndex = () => {
  const { theme, isCollapsed } = useTheme();

  return (
    <div style={{ display: "flex", background: theme.bg, minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <main
          style={{
            marginLeft: isCollapsed ? "60px" : "220px",
            padding: "30px",
            background: theme.containerBg,
            minHeight: "calc(100vh - 70px - 53px)",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminIndex;