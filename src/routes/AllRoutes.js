import { Routes, Route } from "react-router-dom";
import Header from "../layouts/Header";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Header/>}>
            <Route path="/"  element={<Dashboard />} />
            <Route path="room" element={<Dashboard />} />
            <Route path="student" element={<Dashboard />} />
        </Route>
    </Routes>
    );
};

export default AppRoutes;