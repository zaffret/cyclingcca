import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/images/logo with text.png";
import LanguageSelector from "./languageSelector";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logout from "./logout";

export default function AdminNavbar() {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav
      className="navbar navbar-expand-lg mb-4"
      style={{
        backgroundColor: "#272232",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand ms-4" href="#">
          <img
            src={Logo}
            width="180"
            height="48"
            className="d-inline-block align-text-top"
            alt="Logo"
          />
        </a>

        <div
          className="collapse navbar-collapse navbar-dark"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ms-4">
              <NavLink className="nav-link" to="/admin/admin-dashboard">
                {t("navbar.admin_dashboard")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/events">
                {t("navbar.events")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/notifications">
                {t("navbar.notifications")}
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <LanguageSelector />

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline-light"
              className="d-flex align-items-center border-0"
              id="dropdown-basic"
            >
              <img
                src={
                  user.imageURL ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                width="32"
                height="32"
                className="rounded-circle me-2"
                alt="User"
              />
              <span>{user.name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">
                <FontAwesomeIcon icon={faUser} />
                &nbsp;&nbsp;{t("user.profile")}
              </Dropdown.Item>
              <Dropdown.Item as="div">
                <Logout />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
