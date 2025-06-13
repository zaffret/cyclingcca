import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";

function DeleteMemberModal({ show, onHide, member, onDelete }) {
  const { t } = useTranslation();

  const deleteMember = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/members/${member._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert(t("admin_dashboard.delete_member_success"));
      onHide();
      onDelete(member._id);
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t("admin_dashboard.delete_member", {
            memberName: member?.name,
            memberMatric: member?.matric,
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-end">
        <Button
          variant="dark"
          className="me-2"
          onClick={deleteMember}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
            backgroundColor: "#272232",
          }}
        >
          {t("admin_dashboard.delete_button")}
        </Button>
        <Button
          variant="secondary"
          onClick={onHide}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
          }}
        >
          {t("event.cancel_button")}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteMemberModal;
