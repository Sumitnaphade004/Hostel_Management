import React, { useState, useEffect } from "react";
import {
  User,
  Banknote,
  Users,
  ShieldCheck,
  Venus,
  Mars,
  Transgender,
  Mail,
  Phone,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import ApiRequest from "../../api/ApiRequest";
import { useParams } from "react-router-dom";

const RoomProfile = () => {
  const { id } = useParams();

  const { theme } = useTheme();

  const [room, setRoom] = useState(null);

  const fetchRoomData = async () => {
    try {
      const response = await ApiRequest(`/room-profile/${id}`);
      setRoom(response.roomData);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
    // eslint-disable-next-line
  }, []);

  if (!room) {
    return (
      <div className="text-center py-5 text-muted fst-italic">
        No room data found.
      </div>
    );
  }

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: theme.containerBg }}
    >
      {/* HEADER */}
      <div
        className="p-4 mb-4"
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: "12px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h3 className="fw-bold mb-1" style={{ color: theme.textPrimary }}>
              Room {room.roomNo}
            </h3>
            {/* <div className="small" style={{ color: theme.textSecondary }}>
              Room ID: {room.id}
            </div> */}
          </div>

          <span
            className="px-3 py-1 rounded-pill"
            style={{
              backgroundColor:
                room.status === "Available"
                  ? theme.badgeSuccess
                  : theme.badgeDanger,
              color: "#fff",
              fontSize: "0.85rem",
            }}
          >
            {room.status}
          </span>
        </div>

        {/* STATS */}
        <div className="row mt-3 g-3">
          {/* RENT */}
          <div className="col-md-4">
            <div
              className="d-flex align-items-center gap-3 px-3 py-2"
              style={{
                backgroundColor: theme.bgSecondary,
                borderRadius: "10px",
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: `${theme.success}20`,
                }}
              >
                <Banknote size={20} color={theme.success} />
              </div>

              <div>
                <div className="small" style={{ color: theme.textSecondary }}>
                  Rent
                </div>
                <div
                  className="fw-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  ₹{room.rent}
                </div>
              </div>
            </div>
          </div>

          {/* CAPACITY */}
          <div className="col-md-4">
            <div
              className="d-flex align-items-center gap-3 px-3 py-2"
              style={{
                backgroundColor: theme.bgSecondary,
                borderRadius: "10px",
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: `${theme.info}20`,
                }}
              >
                <Users size={20} color={theme.info} />
              </div>

              <div>
                <div className="small" style={{ color: theme.textSecondary }}>
                  Capacity
                </div>
                <div
                  className="fw-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  {room.members.length} / {room.capacity}
                </div>
              </div>
            </div>
          </div>

          {/* UPDATED */}
          <div className="col-md-4">
            <div
              className="d-flex align-items-center gap-3 px-3 py-2"
              style={{
                backgroundColor: theme.bgSecondary,
                borderRadius: "10px",
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: `${theme.warning}20`,
                }}
              >
                <ShieldCheck size={20} color={theme.warning} />
              </div>

              <div>
                <div className="small" style={{ color: theme.textSecondary }}>
                  Updated
                </div>
                <div
                  className="fw-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  {new Date(room.updatedAt).toLocaleDateString("en-In", {day: "2-digit", month: "2-digit", year: "numeric"})}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEMBERS */}
      <div>
        <h5 className="fw-semibold mb-3" style={{ color: theme.textPrimary }}>
          Members ({room.members.length})
        </h5>

        {room.members.length === 0 ? (
          <div className="text-center py-5" style={{ color: theme.textMuted }}>
            No members found
          </div>
        ) : (
          <div className="row g-3">
            {room.members.map((member) => (
              <div key={member.id} className="col-md-6 col-lg-4">
                <div
                  className="p-3 h-100"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "10px",
                  }}
                >
                  {/* NAME + STATUS */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <div
                        className="fw-semibold"
                        style={{ color: theme.textPrimary }}
                      >
                        <User size={16} className="text-warning" />{" "}
                        {member.name || "Not Available"}
                      </div>
                      <div
                        className="small"
                        style={{ color: theme.textSecondary }}
                      >
                        {member.gender === "Male" ? (
                          <Mars size={13} color={"skyblue"} />
                        ) : member.gender === "Female" ? (
                          <Venus size={13} color={"pink"} />
                        ) : (
                          <Transgender size={13} color={"purple"} />
                        )}{" "}
                        {member.gender}
                      </div>
                    </div>

                    <span
                      className="px-2 py-1 rounded"
                      style={{
                        fontSize: "0.75rem",
                        backgroundColor:
                          member.status === "active"
                            ? theme.success
                            : theme.danger,
                        color: "#fff",
                      }}
                    >
                      {member.status}
                    </span>
                  </div>

                  {/* INFO */}
                  <div
                    className="small mb-2"
                    style={{ color: theme.textSecondary }}
                  >
                    <div>
                      <Mail size={13} color={"#EA4335"} /> {member.email}
                    </div>
                    <div>
                      <Phone size={13} color={"#22C55E"} /> +91 {member.phoneNo}
                    </div>
                  </div>

                  {/* FINANCIAL */}
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <div className="small" style={{ color: theme.textMuted }}>
                        Deposit
                      </div>
                      <div
                        className="fw-semibold"
                        style={{ color: theme.textSecondary }}
                      >
                        ₹{member.deposite}
                      </div>
                    </div>

                    <div className="text-end">
                      <div className="small" style={{ color: theme.textMuted }}>
                        Joined
                      </div>
                      <div>{member.dateOfJoining}</div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div
                    className="mt-3 pt-2"
                    style={{
                      borderTop: `1px solid ${theme.border}`,
                      fontSize: "0.8rem",
                      color: theme.textSecondary,
                    }}
                  >
                    <div>Guardian: {member.guardianName}</div>
                    <div>Emergency: {member.emergencyContact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomProfile;
