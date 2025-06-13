import React from "react";
import { useTranslation } from "react-i18next";
import FacebookIcon from "../assets/images/noun-facebook-6719933.png";
import InstagramIcon from "../assets/images/noun-instagram-6874413.png";
import TwitterIcon from "../assets/images/noun-twitter-6755467.png";
import YoutubeIcon from "../assets/images/noun-youtube-5288446.png";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        backgroundColor: "#272232",
        height: "300px",
        color: "#fff",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-start">
            <p>
              {t("footer.email_label")}: {t("footer.email_value")}
            </p>
            <p>
              {t("footer.phone_label")}: {t("footer.phone_value")}
            </p>
            <p>
              {t("footer.address_label")}: {t("footer.address_value")}
            </p>
          </div>

          <div className="col-md-3">
            <p>
              <a href="#join" style={{ color: "#fff", textDecoration: "none" }}>
                {t("footer.join_us")}
              </a>
            </p>
            <p>
              <a
                href="#about"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                {t("footer.about_us")}
              </a>
            </p>
          </div>

          <div className="col-md-3 d-flex justify-content-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 10px" }}
            >
              <img
                src={FacebookIcon}
                alt={t("footer.facebook_alt")}
                style={{ width: "30px", height: "40px" }}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 10px" }}
            >
              <img
                src={InstagramIcon}
                alt={t("footer.instagram_alt")}
                style={{ width: "30px", height: "30px" }}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 10px" }}
            >
              <img
                src={TwitterIcon}
                alt={t("footer.twitter_alt")}
                style={{ width: "30px", height: "30px" }}
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 10px" }}
            >
              <img
                src={YoutubeIcon}
                alt={t("footer.youtube_alt")}
                style={{ width: "30px", height: "30px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
