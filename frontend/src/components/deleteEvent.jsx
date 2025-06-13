import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";

const DeleteEventModal = ({ show, onHide, event, onDelete }) => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/events/${event._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(await response.text());

      onDelete(event._id);
      onHide();
    } catch (error) {
      alert(t("event.delete_error_message", { errorMessage: error.message }));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("event.delete_title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("event.delete_confirmation", { eventTitle: event?.title })}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("event.cancel_button")}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {t("event.delete_button")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEventModal;
