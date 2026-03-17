import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Search,
  Filter,
  Home,
  Bookmark,
  BookmarkX,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import ApiRequest from "../../api/ApiRequest";
import RoomGrid from "./RoomGrid";

const Rooms = () => {
  const { theme, currentTheme } = useTheme();

  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    roomNo: "",
    capacity: "",
    rent: "",
    status: "Available",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchRooms = async () => {
    try {
      const res = await ApiRequest("/rooms");
      setRooms(res.allRooms);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const addRoom = async () => {
    try {
      if (!formData.roomNo || !formData.rent || !formData.capacity) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill all required fields",
        });
        return;
      }

      const response = await ApiRequest("/save-room", {
        method: "POST",
        body: formData,
      });

      console.log(response);

      if (response?.success === false) {
        Swal.fire({
          icon: "warning",
          title: "Exists",
          text: response.message || "Room already exists",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Room Added",
        text: response.message || "Room added successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        roomNo: "",
        rent: "",
        capacity: "",
      });

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("addRoomModal"),
      );

      modal.hide();

      fetchRooms();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong!",
      });
      console.error(error);
    }
  };

  const deleteRoom = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomNo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || room.status === filterStatus;

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
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(13, 110, 253, 0.4)";
                e.currentTarget.style.background = theme.btnPrimaryHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(0, 0, 0, 0.1)";
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
              {
                label: "Total Rooms",
                value: stats.total,
                color: theme.info,
                icon: Home,
              },
              {
                label: "Available",
                value: stats.available,
                color: theme.success,
                icon: Bookmark,
              },
              {
                label: "Occupied",
                value: stats.occupied,
                color: theme.danger,
                icon: BookmarkX,
              },
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
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = theme.cardShadow;
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p
                          className="mb-1 small"
                          style={{ color: theme.textPrimary }}
                        >
                          {stat.label}
                        </p>
                        <h3
                          className="fw-bold mb-0"
                          style={{ color: stat.color }}
                        >
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

      {/* All Rooms */}
      <div className="container">
        {filteredRooms.length > 0 ? (
          <RoomGrid
            rooms={filteredRooms}
            onDelete={(room) => deleteRoom(room.id)}
          />
        ) : (
          <p className="mb-0" style={{ color: theme.textSecondary }}>
            No rooms avilable please add the rooms.
          </p>
        )}
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
                <label
                  className="form-label fw-semibold small"
                  style={{ color: theme.textSecondary }}
                >
                  Room Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="roomNo"
                  className={`form-control themed-input-${currentTheme === "light" ? "light" : "dark"}`}
                  placeholder="Enter room number"
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
                <label
                  className="form-label fw-semibold small"
                  style={{ color: theme.textSecondary }}
                >
                  Room Rent(Per Person) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="rent"
                  className={`form-control themed-input-${currentTheme === "light" ? "light" : "dark"}`}
                  placeholder="Enter amount"
                  value={formData.rent}
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
                <label
                  className="form-label fw-semibold small"
                  style={{ color: theme.textSecondary }}
                >
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
