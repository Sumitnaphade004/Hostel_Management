import { Routes, Route } from "react-router-dom";
import AdminIndex from "../layouts/AdminIndex";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Room/ViewRoom";
import AddMember from "../pages/Member/AddMember";
import MemberList from "../pages/Member/MemberList";
import ViewTransaction from "../pages/Transaction/ViewTransaction";
import AddTransaction from "../pages/Transaction/AddTransactions";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoutes";
import EditMember from "../pages/Member/EditMember";
import RoomProfile from "../pages/Room/RoomProfile";
import InactiveMemberList from "../pages/Member/InactiveMemberList";
import MemberProfile from "../pages/Member/MemberProfile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* 🔒 Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminIndex />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room-profile/:id" element={<RoomProfile />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/inactive-members" element={<InactiveMemberList />} />
          <Route path="/edit-member/:id" element={<EditMember />} />
          <Route path="/member-profile/:id" element={<MemberProfile />} />
          <Route path="/add-transactions/:id/:name/:rent" element={<AddTransaction />} />
          <Route path="/view-transactions" element={<ViewTransaction />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;