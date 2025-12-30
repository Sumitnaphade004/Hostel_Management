import { Routes, Route } from "react-router-dom";
import AdminIndex from "../layouts/AdminIndex";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminIndex/>}>
            <Route path="/"  element={<Dashboard />} />
            <Route path="room" element={<Dashboard />} />
            <Route path="student" element={<Dashboard />} />
        </Route>
    </Routes>
    );
};

export default AppRoutes;