import React from "react";
import Footer from "./footer";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

import banner from "../assets/images/carousel-06.png";
import image from "../assets/images/Screenshot 2024-11-23 221443.png";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div
      className="about"
      style={{
        position: "relative",
        top: "0",
        width: "100%",
        margin: "0",
        padding: "0",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "3rem", fontWeight: "bold" }}>
          {t("about_page.banner_title")}
        </h1>
      </div>

      <div
        style={{
          backgroundColor: "#D8F3DC",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h2>{t("about_page.how_to_join_section_title")}</h2>
        <p>
          {t("about_page.how_to_join_steps.0")}
          <br />
          {t("about_page.how_to_join_steps.1")}
          <br />
          {t("about_page.how_to_join_steps.2")}
          <br />
          {t("about_page.how_to_join_steps.3")}
        </p>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">
          {t("about_page.our_story_section_title")}
        </h2>
        <div className="row">
          <div className="col-md-6">
            <p>{t("about_page.our_story_paragraph_1")}</p>
            <p>{t("about_page.our_story_paragraph_2")}</p>
          </div>
          <div className="col-md-6">
            <img
              src={image}
              alt={t("about_page.image_alt_text")}
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
