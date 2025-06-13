import { Route, Routes, Navigate } from "react-router-dom";
import Memberlist from "../components/memberlist";
import HomeNavbar from "../components/homeNavbar";
import AboutPage from "../components/about";

const PublicPage = () => {
  return (
    <div>
      <HomeNavbar />
      <Routes>
        <Route path="/" element={<Memberlist />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default PublicPage;
