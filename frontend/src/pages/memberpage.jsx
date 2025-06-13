import { Route, Routes, Navigate } from "react-router-dom";
import MemberNavbar from "../components/memberNavbar";
import EventCalendar from "../components/eventsCalendar";

const MemberPage = () => {
  return (
    <div>
      <MemberNavbar />
      <Routes>
        <Route path="/member/events" element={<EventCalendar />} />
        <Route path="*" element={<Navigate to="/member/events" />} />
      </Routes>
    </div>
  );
};

export default MemberPage;
