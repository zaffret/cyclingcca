import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

import Logo from "../assets/images/logo with text.png";
import LanguageSelector from "./languageSelector";
import LoginModal from "./loginModal";

export default function HomeNavbar() {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg"
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
          className="collapse navbar-dark navbar-collapse"
          id="nabvarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ms-4">
              <NavLink className="nav-link" to="/">
                {t("navbar.members")}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                {t("navbar.about")}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <LanguageSelector />
          <button
            className="btn btn-outline-light me-4"
            type="button"
            style={{ height: "2.5rem" }}
            onClick={() => setModalShow(true)}
          >
            {t("navbar.login_button")}
          </button>
        </div>
      </div>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </nav>
  );
}
