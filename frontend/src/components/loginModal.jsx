import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function LoginModal({ show, onHide }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const updateForm = (value) => {
    setForm((prev) => ({ ...prev, ...value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin/admin-dashboard");
      } else if (data.user.role === "member") {
        navigate("/member/member-home");
      }

      alert(t("login.success_message"));
      window.location.reload();
      onHide();
    } catch (error) {
      alert(t("login.error_message", { errorMessage: error.message }));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        className="shadow-none"
        style={{ borderBottom: "none" }}
      ></Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="m-4 mt-0">
          <Form.Group
            className="mb-3"
            controlId="formEmail"
            style={{ backgroundColor: "#DCDCDC", borderRadius: "8px" }}
          >
            <Form.Label
              className="form-label"
              style={{ fontSize: 15, fontWeight: 500 }}
            >
              &nbsp;&nbsp;&nbsp;{t("login.email_placeholder")}
            </Form.Label>
            <Form.Control
              type="email"
              className="custom-input border-0 shadow-none"
              style={{ backgroundColor: "transparent" }}
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formPassword"
            style={{ backgroundColor: "#DCDCDC", borderRadius: "8px" }}
          >
            <Form.Label
              className="form-label"
              style={{ fontSize: 15, fontWeight: 500 }}
            >
              &nbsp;&nbsp;&nbsp;{t("login.password_placeholder")}
            </Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? "text" : "password"}
                className="custom-input border-0 shadow-none"
                style={{ backgroundColor: "transparent" }}
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
                required
              />
              <Button
                variant="outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
            </div>
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
            {t("login.login_button")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
