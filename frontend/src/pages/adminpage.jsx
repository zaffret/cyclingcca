import { Route, Routes, Navigate } from "react-router-dom";
import AdminNavbar from "../components/adminNavbar";
import Dashboard from "../components/dashboard";
import EventCalendar from "../components/eventsCalendar";
const AdminPage = () => {
  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route path="/admin/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin/events" element={<EventCalendar />} />
        <Route path="/admin/notifications" element={<></>} />
        <Route path="*" element={<Navigate to="/admin/admin-dashboard" />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
