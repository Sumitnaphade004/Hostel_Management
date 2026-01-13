import React, { useState } from "react";
import { Bed, Plus, Pencil, Trash2, Search, Filter, Home, Bookmark, BookmarkX } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Rooms = () => {
  const { theme, currentTheme } = useTheme();
  
  const [rooms, setRooms] = useState([
    { id: 1, roomNo: "101", type: "Single", capacity: 1, status: "Available" },
    { id: 2, roomNo: "102", type: "Double", capacity: 2, status: "Occupied" },
    { id: 3, roomNo: "103", type: "Triple", capacity: 3, status: "Available" },
    { id: 4, roomNo: "104", type: "Single", capacity: 1, status: "Maintenance" },
  ]);

  const [formData, setFormData] = useState({
    roomNo: "",
    type: "",
    capacity: "",
    status: "Available",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addRoom = () => {
    if (!formData.roomNo || !formData.type || !formData.capacity) {
      alert("Please fill all required fields");
      return;
    }

    setRooms([...rooms, { ...formData, id: Date.now() }]);
    setFormData({
      roomNo: "",
      type: "",
      capacity: "",
      status: "Available",
    });

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("addRoomModal")
    );
    modal.hide();
  };

  const deleteRoom = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };

  const getStatusColor = (status) => {
    if (status === "Available") return theme.success;
    if (status === "Occupied") return theme.danger;
    return theme.warning;
  };

  const getStatusIcon = (status) => {
    return "●";
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) || room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || room.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: rooms.length,
    available: rooms.filter((r) => r.status === "Available").length,
    occupied: rooms.filter((r) => r.status === "Occupied").length,
  };

  return (
    <div 
      className="container-fluid" 
      style={{ 
        background: theme.containerBg,
        minHeight: "100vh",
      }}
    >
      {/* Header with Stats */}
      <div className="row mb-4">
        <div className="col-12">
          <div
            className="d-flex justify-content-between align-items-center mb-4"
            style={{
              animation: "fadeInDown 0.5s ease-out",
            }}
          >
            <div>
              <h2 className="fw-bold mb-1" style={{ color: theme.textPrimary }}>
                Room Management
              </h2>
              <p className="mb-0" style={{ color: theme.textSecondary }}>
                Manage all hostel rooms efficiently
              </p>
            </div>
            <button
              className="btn d-flex align-items-center gap-2 shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#addRoomModal"
              style={{
                borderRadius: "10px",
                padding: "12px 24px",
                transition: "all 0.3s ease",
                background: theme.btnPrimary,
                color: "#ffffff",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(13, 110, 253, 0.4)";
                e.currentTarget.style.background = theme.btnPrimaryHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.background = theme.btnPrimary;
              }}
            >
              <Plus size={20} />
              Add Room
            </button>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            {[
              { label: "Total Rooms", value: stats.total, color: theme.info, icon: Home },
              { label: "Available", value: stats.available, color: theme.success, icon: Bookmark },
              { label: "Occupied", value: stats.occupied, color: theme.danger, icon: BookmarkX },
            ].map((stat, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "15px",
                    transition: "all 0.3s ease",
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                    overflow: "hidden",
                    background: theme.cardBg,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = theme.cardShadow;
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-1 small" style={{ color: theme.textPrimary }}>
                          {stat.label}
                        </p>
                        <h3 className="fw-bold mb-0" style={{ color: stat.color }}>
                          {stat.value}
                        </h3>
                      </div>
                      <div
                        style={{
                          fontSize: "2rem",
                        }}
                      >
                        {<stat.icon size={35} color={stat.color} />}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          borderRadius: "15px",
          animation: "fadeIn 0.5s ease-out 0.3s both",
          background: theme.cardBg,
        }}
      >
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <div className="position-relative">
                <Search
                  size={20}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: theme.textSecondary,
                  }}
                />
                <input
                  type="text"
                  className={`form-control ps-5 themed-input-${currentTheme}`}
                  placeholder="Search by room number or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderRadius: "10px",
                    border: `2px solid ${theme.border}`,
                    padding: "10px 15px 10px 45px",
                    transition: "all 0.3s ease",
                    background: theme.inputBg,
                    color: theme.inputText,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.inputFocus;
                    e.target.style.boxShadow = `0 0 0 0.2rem ${theme.inputFocus}40`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="position-relative">
                <Filter
                  size={20}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: theme.textSecondary,
                  }}
                />
                <select
                  className="form-select ps-5"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    borderRadius: "10px",
                    border: `2px solid ${theme.border}`,
                    padding: "10px 15px 10px 45px",
                    background: theme.inputBg,
                    color: theme.inputText,
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <span style={{ color: theme.textSecondary }}>
                Showing {filteredRooms.length} of {rooms.length} rooms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Table */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: "15px",
          animation: "fadeIn 0.5s ease-out 0.4s both",
          background: theme.cardBg,
        }}
      >
        <div className="card-body p-0">
          <div className="table-responsive rounded-4">
            <table
            className={`table align-middle table-bordered mb-0 table-${
                currentTheme === "light" ? "light" : "dark"
            }`}
            style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}
            >
            <thead>
                <tr>
                {["Room No", "Type", "Capacity", "Status", "Actions"].map((h) => (
                    <th
                    key={h}
                    className="px-4 py-3 text-uppercase small"
                    style={{
                        background: theme.bgSecondary,
                        color: theme.textMuted,
                        fontWeight: 600,
                        border: "none",
                    }}
                    >
                    {h}
                    </th>
                ))}
                </tr>
            </thead>
              <tbody>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room, index) => (
                    <tr
                      key={room.id}
                      style={{
                        transition: "all 0.3s ease",
                        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
                        borderBottom: `1px solid ${theme.border}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme.bgSecondary;
                        e.currentTarget.style.transform = "scale(1.01)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <td className="py-3 px-4 align-middle">
                        <div className="d-flex align-items-center gap-2">
                          <Bed size={18} style={{ color: theme.btnPrimary }} />
                          <span className="fw-semibold" style={{ color: theme.textPrimary }}>
                            {room.roomNo}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle" style={{ color: theme.textPrimary }}>
                        {room.type}
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <span 
                          className="badge"
                          style={{
                            background: theme.bgLight,
                            color: theme.textPrimary,
                            fontWeight: "500",
                          }}
                        >
                          {room.capacity} Person(s)
                        </span>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <span
                          className="badge"
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontWeight: "500",
                            background: getStatusColor(room.status),
                            color: "#ffffff",
                          }}
                        >
                          {getStatusIcon(room.status)} {room.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteRoom(room.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div style={{ color: theme.textMuted }}>
                        <Bed size={48} className="mb-3" style={{ opacity: 0.25 }} />
                        <p className="mb-0">No rooms found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Room Modal */}
      <div
        className="modal fade"
        id="addRoomModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              borderRadius: "20px",
              border: "none",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              background: theme.cardBg,
            }}
          >
            <div
              className="modal-header border-0 pb-0"
              style={{
                background: `linear-gradient(135deg, ${theme.btnPrimary} 0%, ${theme.btnPrimaryHover} 100%)`,
                borderRadius: "20px 20px 0 0",
                padding: "1.5rem",
              }}
            >
              <h5 className="modal-title text-white fw-bold d-flex align-items-center gap-2 mb-3">
                <Plus size={20} />
                Add New Room
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white mb-3"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fw-semibold small" style={{ color: theme.textSecondary }}>
                  Room Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="roomNo"
                  className={`form-control themed-input-${currentTheme === "light" ? "light" : "dark"}`}
                  placeholder="e.g., 101"
                  value={formData.roomNo}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: `2px solid ${theme.border}`,
                    padding: "12px",
                    background: theme.inputBg,
                    color: theme.inputText,
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small" style={{ color: theme.textSecondary }}>
                  Room Type <span className="text-danger">*</span>
                </label>
                <select
                  name="type"
                  className="form-select"
                  value={formData.type}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: `2px solid ${theme.border}`,
                    padding: "12px",
                    background: theme.inputBg,
                    color: theme.inputText,
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                  <option value="Quad">Quad</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small" style={{ color: theme.textSecondary }}>
                  Capacity <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  className={`form-control themed-input-${currentTheme === "light" ? "light" : "dark"}`}
                  placeholder="Number of persons"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  style={{
                    borderRadius: "10px",
                    border: `2px solid ${theme.border}`,
                    padding: "12px",
                    background: theme.inputBg,
                    color: theme.inputText,
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small" style={{ color: theme.textSecondary }}>
                  Status
                </label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: `2px solid ${theme.border}`,
                    padding: "12px",
                    background: theme.inputBg,
                    color: theme.inputText,
                  }}
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div className="modal-footer border-0 pt-0 pb-4 px-4">
              <button
                className="btn"
                data-bs-dismiss="modal"
                style={{
                  borderRadius: "10px",
                  padding: "10px 24px",
                  fontWeight: "500",
                  background: theme.btnSecondary,
                  color: "#ffffff",
                  border: "none",
                }}
              >
                Cancel
              </button>
              <button
                className="btn"
                onClick={addRoom}
                style={{
                  borderRadius: "10px",
                  padding: "10px 24px",
                  fontWeight: "500",
                  background: `linear-gradient(135deg, ${theme.btnPrimary} 0%, ${theme.btnPrimaryHover} 100%)`,
                  border: "none",
                  color: "#ffffff",
                }}
              >
                Save Room
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .form-control:focus,
        .form-select:focus {
          border-color: ${theme.inputFocus} !important;
          box-shadow: 0 0 0 0.2rem ${theme.inputFocus}40 !important;
          outline: none;
        }

        .table > :not(caption) > * > * {
          border-bottom-width: 1px;
          border-color: ${theme.border};
        }

        .modal-backdrop.show {
          opacity: 0.7;
        }

        .themed-input-light::placeholder {
          color: ${theme.textSecondary};
        }

        .themed-input-dark::placeholder {
          color: ${theme.textSecondary};
        }
      `}</style>
    </div>
  );
};

export default Rooms;