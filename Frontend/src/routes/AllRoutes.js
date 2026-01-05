import { Routes, Route } from "react-router-dom";
import AdminIndex from "../layouts/AdminIndex";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Room/AddRoom";
import AddMember from "../pages/Member/AddMember";
import ViewMember from "../pages/Member/ViewMember";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminIndex/>}>
            <Route index element={<Dashboard />} />
            <Route path="rooms" element={<Rooms />} />  
            <Route path="add-member" element={<AddMember />} />
            <Route path="view-member" element={<ViewMember />} />
        </Route>
    </Routes>
    );
};

export default AppRoutes;