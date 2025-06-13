import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function AddMemberModal({ show, onHide, onAdd }) {
  const { t } = useTranslation();
  let token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    matric: "",
    email: "",
    phone: "",
    password: "",
    year: "1",
    role: "member",
    imageURL: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const updateForm = (value) => {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/members", {
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
      alert(t("admin_dashboard.add_member_success"));
      onHide();
      onAdd(data);
    } catch (error) {
      alert(`${t("admin_dashboard.error_message")}: ${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        className="shadow-none"
        style={{ borderBottom: "none" }}
      >
        <Modal.Title>{t("admin_dashboard.add_member")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="m-1 mt-0">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>{t("form.name")}*</Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder={t("form.name")}
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMatric">
            <Form.Label>{t("form.matric_number")}*</Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder={t("form.matric_number")}
              value={form.matric}
              onChange={(e) => updateForm({ matric: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>{t("form.email")}*</Form.Label>
            <Form.Control
              className="shadow-none"
              type="email"
              placeholder={t("form.email")}
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>{t("form.phone")}*</Form.Label>
            <Form.Control
              className="shadow-none"
              type="tel"
              placeholder={t("form.phone")}
              value={form.phone}
              onChange={(e) => updateForm({ phone: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>{t("form.password")}*</Form.Label>
            <div className="input-group">
              <Form.Control
                className="shadow-none"
                type={showPassword ? "text" : "password"}
                placeholder={t("form.password")}
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
            </div>
            <p className="text-muted" style={{ fontSize: 13 }}>
              {t("form.min_password_requirements")}
            </p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formYear">
            <Form.Label>{t("form.year")}*</Form.Label>
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
            {t("form.save_button")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMemberModal;
