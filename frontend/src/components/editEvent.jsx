import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditEventModal = ({ show, onHide, event, onEdit }) => {
  const { t } = useTranslation();
  let token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    location: "",
    route: "",
    description: "",
    note: "",
    member_cap: "",
    registration_closing_time: "",
  });

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        start: event.start || "",
        end: event.end || "",
        location: event.location || "",
        route: event.route || "",
        description: event.description || "",
        note: event.note || "",
        member_cap: event.member_cap || "",
        registration_closing_time: event.registration_closing_time || "",
      });
    }
  }, [event]);

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      onEdit(data);
      onHide();
    } catch (error) {
      alert(t("event.update_error_message", { errorMessage: error.message }));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("event.edit_title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>{t("event.title")}*</Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder={t("event.title")}
              value={form.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              required
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formStart">
                <Form.Label>
                  {t("event.start_date")} & {t("event.start_time")}*
                </Form.Label>
                <Form.Control
                  className="shadow-none"
                  type="datetime-local"
                  value={form.start}
                  onChange={(e) => handleFormChange("start", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formEnd">
                <Form.Label>{t("event.end_date_time")}*</Form.Label>
                <Form.Control
                  className="shadow-none"
                  type="datetime-local"
                  value={form.end}
                  onChange={(e) => handleFormChange("end", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>{t("event.location")}*</Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder={t("event.location")}
              value={form.location}
              onChange={(e) => handleFormChange("location", e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRoute">
            <Form.Label>{t("event.route")}</Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder={t("event.route")}
              value={form.route}
              onChange={(e) => handleFormChange("route", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>{t("event.description")}</Form.Label>
            <Form.Control
              className="shadow-none"
              as="textarea"
              rows={3}
              placeholder={t("event.description")}
              value={form.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNote">
            <Form.Label>{t("event.note")}</Form.Label>
            <Form.Control
              className="shadow-none"
              as="textarea"
              rows={2}
              placeholder={t("event.note")}
              value={form.note}
              onChange={(e) => handleFormChange("note", e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formMemberCap">
                <Form.Label>{t("event.member_capacity")}*</Form.Label>
                <Form.Control
                  className="shadow-none"
                  type="number"
                  placeholder={t("event.member_capacity")}
                  value={form.member_cap}
                  onChange={(e) =>
                    handleFormChange("member_cap", e.target.value)
                  }
                  min="1"
                  step="1"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="formRegistrationClosingTime"
              >
                <Form.Label>{t("event.registration_closing_time")}*</Form.Label>
                <Form.Control
                  className="shadow-none"
                  type="datetime-local"
                  value={form.registration_closing_time}
                  onChange={(e) =>
                    handleFormChange(
                      "registration_closing_time",
                      e.target.value
                    )
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="dark"
            type="submit"
            className="w-100 mt-3"
            style={{
              padding: "10px",
              fontSize: 22,
              fontWeight: 500,
              backgroundColor: "#272232",
              borderRadius: "8px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            {t("event.save_changes_button")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditEventModal;
