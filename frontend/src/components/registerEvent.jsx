import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";

const RegisterEventModal = ({ show, onHide, event, onRegister }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  let token = localStorage.getItem("token");

  const handleRegister = async () => {
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/events/${event._id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || t("event.error_message"));

      alert(t("event.registration_success"));
      onRegister(event);
      onHide();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("event.register_title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("event.register_confirmation")}</p>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("event.cancel_button")}
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          {t("event.register_button")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterEventModal;
