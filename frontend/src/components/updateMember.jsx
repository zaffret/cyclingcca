import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateMemberModal({ show, onHide, member, onUpdate }) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sealpoints: "",
    achievements: "",
    year: "",
    imageURL: "",
  });

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        sealpoints: member.sealpoints || 0,
        achievements: member.achievements || "",
        year: member.year || "1",
        imageURL: member.imageURL || "",
      });
    }
  }, [member]);

  const updateForm = (value) => {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/members/${member._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const updatedMember = await response.json();
      alert(t("admin_dashboard.edit_member_success"));
      console.log(updatedMember);

      onHide();
      onUpdate(updatedMember[0]);
    } catch (error) {
      alert(`${t("admin_dashboard.error_message")}: ${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("admin_dashboard.update_member")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>{t("form.name")}</Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              value={form.name}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>{t("form.email")}</Form.Label>
            <Form.Control
              className="shadow-none"
              type="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>{t("form.phone")}</Form.Label>
            <Form.Control
              className="shadow-none"
              type="tel"
              value={form.phone}
              onChange={(e) => updateForm({ phone: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSealPoints">
            <Form.Label>{t("admin_dashboard.seal_points")}</Form.Label>
            <Form.Control
              className="shadow-none"
              type="number"
              value={form.sealpoints}
              onChange={(e) => updateForm({ sealpoints: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAchievements">
            <Form.Label>{t("admin_dashboard.achievements")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              className="shadow-none"
              value={form.achievements}
              onChange={(e) => updateForm({ achievements: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formYear">
            <Form.Label>{t("form.year")}</Form.Label>
            <Form.Select
              className="shadow-none"
              value={form.year}
              onChange={(e) => updateForm({ year: e.target.value })}
            >
              <option value="1">{t("form.year")} 1</option>
              <option value="2">{t("form.year")} 2</option>
              <option value="3">{t("form.year")} 3</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImageURL">
            <Form.Label>{t("form.profile_image")}</Form.Label>
            <Form.Control
              className="shadow-none"
              type="url"
              placeholder={t("form.profile_image")}
              value={form.imageURL}
              onChange={(e) => updateForm({ imageURL: e.target.value })}
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100 mt-3">
            {t("form.save_button")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateMemberModal;
