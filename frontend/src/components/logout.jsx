import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert(t("user.logout_success"));
    navigate("/");
    window.location.reload();
  };

  return (
    <button onClick={logout} className="border-0 bg-transparent">
      <FontAwesomeIcon icon={faSignOutAlt} />
      &nbsp;&nbsp;{t("user.logout")}
    </button>
  );
};

export default Logout;
