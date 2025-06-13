import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MemberDetailsModal({ show, onHide, member }) {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center" id="contained-modal-title-center">
          {member.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img
            src={
              member.imageURL ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
            style={{ height: "150px", width: "150px" }}
          />
        </div>
        <p>
          {t("form.year")}: Y{member.year}
        </p>
        <p>
          {t("form.email")}: {member.email}
        </p>
        <p>
          {t("member_list.distance_biked")}: {member.distance} km
        </p>
        <p>
          {t("member_list.achievements")}:{" "}
          {member.achievements.length > 0
            ? member.achievements
            : t("member_list.proud_rookie")}
        </p>
      </Modal.Body>
    </Modal>
  );
}

const MemberCard = (props) => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div
      className="card text-center shadow-lg p-2 mb-5 bg-white rounded m-2"
      style={{
        width: "16rem",
        height: "13rem",
        margin: "auto",
        padding: "8px",
      }}
    >
      <div
        className="card-body d-flex align-items-center"
        style={{ padding: "0px" }}
      >
        <img
          src={
            props.member.imageURL ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Profile pic"
          className="rounded-circle me-3"
          style={{ height: "7rem", width: "7rem" }}
        />
        <div className="text-start">
          <h5
            className="card-title mb-1"
            style={{ fontSize: "1.3rem", fontWeight: 500 }}
          >
            {props.member.name}
          </h5>
          <p className="card-subtitle text-muted mb-2" style={{ fontSize: 20 }}>
            Y{props.member.year}
          </p>
          <button
            className="btn btn-outline-primary border-0"
            onClick={() => setModalShow(true)}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </button>
        </div>
      </div>

      <MemberDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        member={props.member}
      />
    </div>
  );
};

export default function Memberlist() {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      const response = await fetch("http://localhost:5000/members/");

      if (!response.ok) {
        window.alert(t("error_message", { errorMessage: response.statusText }));
        return;
      }

      const data = await response.json();
      setMembers(data);
    }

    fetchMembers();
  }, [t]);

  return (
    <div className="container d-flex flex-wrap flex-column mt-4">
      <div
        className="container d-flex justify-content-center mb-4"
        style={{ fontSize: 35, fontWeight: 700 }}
      >
        {t("member_list.title")}
      </div>
      <div
        className="container d-flex flex-wrap justify-content-center"
        style={{ margin: "auto", width: "90%" }}
      >
        {members.map((member) => (
          <MemberCard key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
}
