import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";

const WithdrawEventModal = ({ show, onHide, event, onWithdraw }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  let token = localStorage.getItem("token");

  const handleWithdraw = async () => {
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/events/${event._id}/withdraw`,
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
        throw new Error(data.message || t("event.withdraw_error_message"));

      alert(t("event.withdraw_success"));
      onWithdraw(event);
      onHide();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("event.withdraw_title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("event.withdraw_confirmation")}</p>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("event.cancel_button")}
        </Button>
        <Button variant="danger" onClick={handleWithdraw}>
          {t("event.withdraw_button")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WithdrawEventModal;
