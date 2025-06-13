import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function AddEventModal({ show, onHide, onAdd, selectedDate }) {
  const { t } = useTranslation();
  let token = localStorage.getItem("token");

  const initialFormState = {
    title: "",
    start: "",
    end: "",
    location: "",
    route: "",
    description: "",
    note: "",
    member_cap: "",
    registration_closing_time: "",
  };

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      setForm((prev) => ({ ...prev, start: dateStr }));
    }
  }, [selectedDate]);

  const updateForm = (value) => {
    setForm((prev) => ({ ...prev, ...value }));
  };

  const handleClose = () => {
    setForm(initialFormState);
    onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      alert(t("event.add_success"));
      handleClose();
      onAdd(data);
    } catch (error) {
      alert(`${t("event.add_error_message")}: ${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        className="shadow-none"
        style={{ borderBottom: "none" }}
      >
        <Modal.Title>{t("event.add_title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="m-1 mt-0">
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>{t("event.title")}*</Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder={t("event.title")}
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
              required
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formStartDate">
                <Form.Label>{t("event.start_date")}</Form.Label>
                <Form.Control
                  className="shadow-none"
                  type="date"
                  value={form.start.split("T")[0]}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formStartTime">
                <Form.Label>{t("event.start_time")}*</Form.Label>
                <Form.Control
                  className="shadow-none"
                  type="time"
                  onChange={(e) =>
                    updateForm({
                      start: `${form.start.split("T")[0]}T${e.target.value}:00`,
                    })
                  }
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
                  onChange={(e) => updateForm({ end: e.target.value })}
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
              onChange={(e) => updateForm({ location: e.target.value })}
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
              onChange={(e) => updateForm({ route: e.target.value })}
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
              onChange={(e) => updateForm({ description: e.target.value })}
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
              onChange={(e) => updateForm({ note: e.target.value })}
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
                  onChange={(e) => updateForm({ member_cap: e.target.value })}
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
                    updateForm({ registration_closing_time: e.target.value })
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
            {t("event.add_title")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddEventModal;
