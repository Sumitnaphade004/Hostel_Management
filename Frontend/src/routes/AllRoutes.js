import { Routes, Route } from "react-router-dom";
import AdminIndex from "../layouts/AdminIndex";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Room/AddRoom";
import AddMember from "../pages/Member/AddMember";
import ViewMember from "../pages/Member/ViewMember";
import ViewTransaction from "../pages/Transaction/ViewTransaction";
import AddTransaction from "../pages/Transaction/AddTransactions";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/dashboard" element={ <AdminIndex/> }>
            <Route index element={ <Dashboard/> } />
            <Route path="rooms" element={ <Rooms/> } />  
            <Route path="add-member" element={ <AddMember/> } />
            <Route path="view-member" element={ <ViewMember/> } />
            <Route path="view-transactions" element={ <ViewTransaction/> } />
            <Route path="add-transactions" element={ <AddTransaction/> } />
        </Route>
    </Routes>
    );
};

export default AppRoutes;