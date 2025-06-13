import React from "react";
import PublicPage from "./pages/publicpage";
import AdminPage from "./pages/adminpage";
import MemberPage from "./pages/memberpage";

const App = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <PublicPage />;
  } else if (user.role === "admin") {
    return <AdminPage />;
  } else if (user.role === "member") {
    return <MemberPage />;
  }
};

export default App;
