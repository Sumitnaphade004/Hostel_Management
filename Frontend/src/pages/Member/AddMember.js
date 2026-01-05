import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const AddMember = () => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    room_id: "",
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch rooms
  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:12000/api/rooms");
  //       setRooms(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchRooms();
  // }, []);

  // 🔹 Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setLoading(true);
    // setError("");

    // try {
    //   await axios.post("http://localhost:12000/api/users", formData);
    //   alert("Member added successfully ✅");

    //   setFormData({
    //     name: "",
    //     email: "",
    //     phone_no: "",
    //     room_id: "",
    //   });
    // } catch (err) {
    //   setError(err.response?.data?.message || "Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };

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
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          className="card-header"
          style={{
            background: theme.bgSecondary,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <h5 className="mb-0" style={{ color: theme.textPrimary }}>
            Add Member
          </h5>
        </div>

        {/* Body */}
        <div className="card-body">
          {error && (
            <div
              className="alert"
              style={{
                background: theme.danger,
                color: "#fff",
                border: "none",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label
                className="form-label"
                style={{ color: theme.textSecondary }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
                style={{
                  background: theme.inputBg,
                  color: theme.inputText,
                  border: `1px solid ${theme.inputBorder}`,
                }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                className="form-label"
                style={{ color: theme.textSecondary }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                style={{
                  background: theme.inputBg,
                  color: theme.inputText,
                  border: `1px solid ${theme.inputBorder}`,
                }}
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label
                className="form-label"
                style={{ color: theme.textSecondary }}
              >
                Phone No
              </label>
              <input
                type="text"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                required
                className="form-control"
                style={{
                  background: theme.inputBg,
                  color: theme.inputText,
                  border: `1px solid ${theme.inputBorder}`,
                }}
              />
            </div>

            {/* Room */}
            <div className="mb-4">
              <label
                className="form-label"
                style={{ color: theme.textSecondary }}
              >
                Room
              </label>
              <select
                name="room_id"
                value={formData.room_id}
                onChange={handleChange}
                required
                className="form-select"
                style={{
                  background: theme.inputBg,
                  color: theme.inputText,
                  border: `1px solid ${theme.inputBorder}`,
                }}
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    Room {room.room_no || room.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <button
              className="btn w-100"
              disabled={loading}
              style={{
                background: theme.btnPrimary,
                color: "#fff",
                border: "none",
              }}
            >
              {loading ? "Saving..." : "Add Member"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
