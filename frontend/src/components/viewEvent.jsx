import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faRoute,
  faInfoCircle,
  faStickyNote,
  faUsers,
  faCheckCircle,
  faExclamationTriangle,
  faTrashAlt,
  faEdit,
  faUserPlus,
  faUserMinus,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const ViewEventModal = ({
  show,
  onHide,
  event,
  onEdit,
  onDelete,
  onRegister,
  onWithdraw,
}) => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!event) return null;

  const now = new Date();
  const eventEndDate = new Date(event.end);

  const isRegistered = event.member_registered.includes(user._id);
  const canRegister = event.member_registered.length < event.member_cap;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          {event.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <FontAwesomeIcon icon={faCalendarAlt} className="text-primary me-2" />
          <strong>{t("event.start_date")}: </strong>{" "}
          {new Date(event.start).toLocaleString()}
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} className="text-primary me-2" />
          <strong>{t("event.end_date_time")}: </strong>{" "}
          {new Date(event.end).toLocaleString()}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-primary me-2"
          />
          <strong>{t("event.location")}: </strong> {event.location}
        </p>
        {event.route && (
          <p>
            <FontAwesomeIcon icon={faRoute} className="text-primary me-2" />
            <strong>{t("event.route")}: </strong> {event.route}
          </p>
        )}
        {event.description && (
          <p>
            <FontAwesomeIcon icon={faInfoCircle} className=" me-2" />
            {event.description}
          </p>
        )}
        {event.note && (
          <p className="text-muted">
            <FontAwesomeIcon icon={faStickyNote} className="me-2" />
            {event.note}
          </p>
        )}
        <p>
          <FontAwesomeIcon icon={faUsers} className="me-2" />
          {t("event.member_capacity")}: {event.member_cap}
        </p>
        <p>
          <FontAwesomeIcon icon={faCheckCircle} className="me-2 " />
          {event.member_registered.length}{" "}
          {eventEndDate <= now
            ? t("event.members_participated")
            : t("event.registered_members")}
        </p>
        {isRegistered && (
          <p className="text-success">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="me-2 text-success"
            />
            <strong>{t("event.registration_success")}</strong>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <div>
          {eventEndDate <= now && (
            <span className="text-danger d-flex align-items-center">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="me-2 text-danger"
              />
              {t("event.event_has_ended")}
            </span>
          )}
        </div>
        <div>
          {user.role === "admin" && eventEndDate > now && (
            <>
              <Button variant="danger me-1" onClick={() => onDelete(event)}>
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                {t("event.delete_button")}
              </Button>

              <Button variant="primary" onClick={() => onEdit(event)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" />
                {t("event.save_changes_button")}
              </Button>
            </>
          )}
          {user.role === "member" && eventEndDate > now && (
            <>
              {isRegistered ? (
                <Button
                  variant="warning me-1"
                  onClick={() => onWithdraw(event)}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faUserMinus} className="me-2" />
                  {t("event.withdraw_button")}
                </Button>
              ) : canRegister ? (
                <Button
                  variant="success"
                  onClick={() => onRegister(event)}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                  {t("event.register_button")}
                </Button>
              ) : (
                <Button variant="secondary" disabled>
                  <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                  {t("event.event_full")}
                </Button>
              )}
            </>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewEventModal;
