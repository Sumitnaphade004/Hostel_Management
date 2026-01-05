import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const ViewMembers = () => {
  const { theme, currentTheme } = useTheme();
  const [members, setMembers] = useState([{id: 1, name: "Sumit", email: "abc@gmail.com", phone_no: 9877899879, room: {room_no: 1} }, {id: 2, name: "Sumit", email: "abc@gmail.com", phone_no: 9877899879, room: {room_no: 1} }]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchMembers()
  // }, []);

  // const fetchMembers = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:12000/api/users");
  //     setMembers(res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch members", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div
      className="container-fluid py-4"
      style={{ background: theme.containerBg, minHeight: "100vh" }}
    >
      <div
        className="card"
        style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          boxShadow: theme.cardShadow,
        }}
      >
        {/* Header */}
        <div 
          className={`card-header d-flex justify-content-between align-items-center bg-${currentTheme !== "light" ? "light" : "dark"}`}
          style={{
            background: theme.bgSecondary,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <h5 className={`mb-0 text-${currentTheme === "light" ? "light" : "dark"}`} style={{ color: theme.textPrimary }}>
            Members List
          </h5>
        </div>

        {/* Body */}
        <div className="card-body p-0">
          {!loading ? (
            <div className="text-center py-4" style={{ color: theme.textMuted }}>
              Loading members...
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-4" style={{ color: theme.textMuted }}>
              No members found
            </div>
          ) : (
            <div className="table-responsive">
              <table
                className={`table mb-0 table-${
                  currentTheme === "light" ? "light" : "dark"
                }`}
              >
                <thead style={{ background: theme.bgSecondary }}>
                  <tr>
                    <th style={{ color: theme.textPrimary }}>#</th>
                    <th style={{ color: theme.textPrimary }}>Name</th>
                    <th style={{ color: theme.textPrimary }}>Email</th>
                    <th style={{ color: theme.textPrimary }}>Phone</th>
                    <th style={{ color: theme.textPrimary }}>Room</th>
                    <th style={{ color: theme.textPrimary }}>Created At</th>
                  </tr>
                </thead>

                <tbody>
                  {members.map((member, index) => (
                    <tr key={member.id}>
                      <td style={{ color: theme.textSecondary }}>
                        {index + 1}
                      </td>
                      <td style={{ color: theme.textPrimary }}>
                        {member.name}
                      </td>
                      <td style={{ color: theme.textSecondary }}>
                        {member.email}
                      </td>
                      <td style={{ color: theme.textSecondary }}>
                        {member.phone_no}
                      </td>
                      <td style={{ color: theme.textSecondary }}>
                        {member.room
                          ? `Room ${member.room.room_no || member.room.id}`
                          : "—"}
                      </td>
                      <td style={{ color: theme.textMuted }}>
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMembers;
