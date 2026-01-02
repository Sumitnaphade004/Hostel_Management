import { Routes, Route } from "react-router-dom";
import AdminIndex from "../layouts/AdminIndex";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Room/AddRoom";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminIndex/>}>
            <Route index element={<Dashboard />} />
            <Route path="rooms" element={<Rooms />} />  
            <Route path="student" element={<Dashboard />} />
        </Route>
    </Routes>
    );
};

export default AppRoutes;