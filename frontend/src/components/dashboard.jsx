import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import AddMemberModal from "./registerMember";
import UpdateMemberModal from "./updateMember";
import DeleteMemberModal from "./deleteMember";

const Dashboard = () => {
  const { t } = useTranslation();

  // Formatting Date
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  }

  const [members, setMembers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      const response = await fetch("http://localhost:5000/members/");
      if (!response.ok) {
        window.alert(`Error fetching members: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setMembers(data);
    }

    fetchMembers();
  }, []);

  const handleAddMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  const handleUpdateMember = (updatedMember) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === updatedMember.email ? updatedMember : member
      )
    );
  };

  const handleDeleteMember = (id) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member._id !== id)
    );
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setEditModalShow(true);
  };

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setDeleteModalShow(true);
  };

  return (
    <div className="container mt-5 mb-5 d-flex flex-column">
      <h1 className="text-center mb-4">{t("admin_dashboard.manage_users")}</h1>

      <div
        className="container d-flex flex-column"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
          padding: "10px 0px",
          borderRadius: "10px",
        }}
      >
        <div
          className="container d-flex flex-row justify-content-between"
          style={{ padding: "0px 5px 0px 0px" }}
        >
          <ul className="nav nav-tabs mb-2">
            <li className="nav-item">
              <button className="nav-link active">
                {t("admin_dashboard.members")}
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link">
                {t("admin_dashboard.coaches")}
              </button>
            </li>
          </ul>
          <button
            className="btn btn-primary shadow"
            style={{
              width: "60px",
              height: "60px",
              fontSize: "30px",
              borderRadius: "20%",
            }}
            onClick={() => setModalShow(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <div
          className="ms-2 mb-2 d-flex justify-content-between"
          style={{ fontSize: 20, fontWeight: 600, color: "#272232" }}
        >
          {t("admin_dashboard.results", { count: members.length })}
        </div>

        <div className="table-responsive">
          <table className="table text-center">
            <thead className="table-primary" style={{ height: "50px" }}>
              <tr>
                <th className="text-wrap">{t("admin_dashboard.member")}</th>
                <th className="text-wrap">
                  {t("admin_dashboard.matric_number")}
                </th>
                <th className="text-wrap">{t("admin_dashboard.email")}</th>
                <th>{t("admin_dashboard.distance_biked")}</th>
                <th>{t("admin_dashboard.events_participated")}</th>
                <th>{t("admin_dashboard.attendance")}</th>
                <th className="text-wrap">
                  {t("admin_dashboard.achievements")}
                </th>
                <th>{t("admin_dashboard.seal_points")}</th>
                <th className="text-wrap">{t("admin_dashboard.last_login")}</th>
                <th>{t("admin_dashboard.edit_button")}</th>
                <th>{t("admin_dashboard.delete_button")}</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr
                  key={member._id}
                  className={index % 2 === 0 ? "table-light" : "table-danger"}
                >
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          member.imageURL ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt="Profile"
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td className="text-wrap">{member.matric}</td>
                  <td className="text-wrap">{member.email}</td>
                  <td>{member.distance} km</td>
                  <td>{member.events.length}</td>
                  <td>{member.attendance > 0 ? member.attendance : 100}%</td>
                  <td
                    className="text-wrap"
                    style={{
                      maxWidth: "600px",
                      maxHeight: "60px",
                      overflowY: "auto",
                    }}
                  >
                    {member.achievements.length > 0 ? member.achievements : "-"}
                  </td>
                  <td>{member.sealpoints}</td>
                  <td className="text-wrap">
                    {member.lastLogin ? formatDate(member.lastLogin) : "-"}
                  </td>
                  <td>
                    <button
                      className="btn btn-light"
                      onClick={() => handleEditClick(member)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-light border-0"
                      onClick={() => handleDeleteClick(member)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddMemberModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAdd={handleAddMember}
      />
      <UpdateMemberModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        member={selectedMember}
        onUpdate={handleUpdateMember}
      />
      <DeleteMemberModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        member={selectedMember}
        onDelete={handleDeleteMember}
      />
    </div>
  );
};

export default Dashboard;
