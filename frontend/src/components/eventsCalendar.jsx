import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import AddEventModal from "./addEvent";
import EditEventModal from "./editEvent";
import DeleteEventModal from "./deleteEvent";
import ViewEventModal from "./viewEvent";
import RegisterEventModal from "./registerEvent";
import WithdrawEventModal from "./withdrawEvent";

const EventCalendar = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventToRegister, setEventToRegister] = useState(null);
  const [eventToWithdraw, setEventToWithdraw] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        if (!response.ok) throw new Error(t("event.error_message"));
        const data = await response.json();
        setEvents(
          data.map((event) => ({
            id: event._id,
            title: event.title,
            start: event.start,
            end: event.end,
            extendedProps: { ...event },
          }))
        );
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEvents();
  }, [t]);

  const handleAddEvent = (event) => {
    setEvents((prev) => [
      ...prev,
      {
        id: event._id,
        title: event.title,
        start: event.start,
        end: event.end,
        extendedProps: { ...event },
      },
    ]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent._id
          ? {
              ...event,
              title: updatedEvent.title,
              extendedProps: { ...updatedEvent },
            }
          : event
      )
    );
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const handleRegisterEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent._id
          ? {
              ...event,
              member_registered: Array.isArray(updatedEvent.member_registered)
                ? [
                    ...updatedEvent.member_registered.map((id) =>
                      id.toString()
                    ),
                    user._id,
                  ]
                : console.log(updatedEvent.member_registered),
            }
          : event
      )
    );
  };

  const handleWithdrawEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent._id
          ? {
              ...event,
              member_registered: updatedEvent.member_registered.filter(
                (id) => id !== user._id
              ),
            }
          : event
      )
    );
  };

  const handleDateSelect = (selectInfo) => {
    const selectedDate = new Date(selectInfo.startStr);
    const now = new Date();

    if (selectedDate < now) {
      return;
    }

    if (user.role === "admin") {
      setSelectedDate(selectedDate);
      setShowAddModal(true);
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps);
    setShowViewModal(true);
  };

  return (
    <div className="container py-4">
      <style>
        {`
      .fc .fc-col-header-cell-cushion,
      .fc .fc-daygrid-day-number,
      .fc .fc-list-day-side-text,
      .fc .fc-list-day-text {
        color: black !important;
        text-decoration: none !important;
      }
    `}
      </style>
      <h1 className="mb-4 text-center">{t("calendar.title")}</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        buttonText={{
          today: t("calendar.today"),
          month: t("calendar.month"),
          week: t("calendar.week"),
          day: t("calendar.day"),
          list: t("calendar.list"),
        }}
        locale={localStorage.getItem("i18nextLng")}
      />

      <AddEventModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAddEvent}
        selectedDate={selectedDate}
      />
      <EditEventModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        event={selectedEvent}
        onEdit={handleEditEvent}
      />
      <DeleteEventModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        event={selectedEvent}
        onDelete={handleDeleteEvent}
      />
      <ViewEventModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        event={selectedEvent}
        onEdit={(event) => {
          setShowViewModal(false);
          setSelectedEvent(event);
          setShowEditModal(true);
        }}
        onDelete={(event) => {
          setShowViewModal(false);
          setSelectedEvent(event);
          setShowDeleteModal(true);
        }}
        onRegister={(event) => {
          setShowViewModal(false);
          setEventToRegister(event);
          setShowRegisterModal(true);
        }}
        onWithdraw={(event) => {
          setShowViewModal(false);
          setEventToWithdraw(event);
          setShowWithdrawModal(true);
        }}
      />

      <RegisterEventModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        event={eventToRegister}
        onRegister={handleRegisterEvent}
      />

      <WithdrawEventModal
        show={showWithdrawModal}
        onHide={() => setShowWithdrawModal(false)}
        event={eventToWithdraw}
        onWithdraw={handleWithdrawEvent}
      />
    </div>
  );
};

export default EventCalendar;
