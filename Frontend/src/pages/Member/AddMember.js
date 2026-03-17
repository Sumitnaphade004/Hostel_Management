import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { HousePlus } from "lucide-react";
import ApiRequest from "../../api/ApiRequest";
import Swal from "sweetalert2";

const AddMember = () => {
  const { theme, currentTheme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    guardianName: "",
    emergencyContact: "",
    idProofType: "",
    idProofNumber: "",
    roomId: "",
    dateOfJoining: "",
    status: "active"
  });

  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await ApiRequest("/all-rooms");
      setRooms(res.allRooms);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !formData.name ||
        !formData.email ||
        !formData.phoneNo ||
        !formData.gender ||
        !formData.address ||
        !formData.roomId ||
        !formData.dateOfJoining ||
        !formData.idProofType ||
        !formData.idProofNumber
      ) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill all required fields",
        });
        return;
      }

      const response = await ApiRequest("/save-member", {
        method: "POST",
        body: formData,
      });

      if(response?.success === false){
        Swal.fire({
          icon: "warning",
          title: "Exists",
          text: response.message || "Member already exists.",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Member Added",
        text: response.message || "Member added successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        name: "",
        email: "",
        phoneNo: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        guardianName: "",
        emergencyContact: "",
        idProofType: "",
        idProofNumber: "",
        roomId: "",
        dateOfJoining: "",
        status: "active"
      });

      navigate('/view-member');
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ background: theme.containerBg }}
    >
      <div
        className="card"
        style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          boxShadow: theme.cardShadow,
          maxWidth: "850px",
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
          <h4 className="mt-2" style={{ color: theme.textPrimary }}>
            <HousePlus size={25} /> &nbsp; Hostel Member Registration
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Personal Info */}
            <h6 style={{ color: theme.textSecondary }} className="mb-3">
              Personal Information
            </h6>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNo"
                  pattern="^[6-9]\d{9}$"
                  placeholder="Enter phone number"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-3 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Gender <span className="text-danger">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Address */}
            <h6 className="mt-4 mb-3" style={{ color: theme.textSecondary }}>
              Address Details
            </h6>

            <div className="mb-3">
              <label
                className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
              >
                Address <span className="text-danger">*</span>
              </label>
              <textarea
                name="address"
                rows="2"
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* ID Proof */}
            <h6 className="mt-4 mb-3" style={{ color: theme.textSecondary }}>
              Identity Proof
            </h6>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  ID Type <span className="text-danger">*</span>
                </label>
                <select
                  name="idProofType"
                  value={formData.idProofType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option>Aadhar Card</option>
                  <option>PAN Card</option>
                  <option>Passport</option>
                  <option>Driving License</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  ID Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="idProofNumber"
                  value={formData.idProofNumber}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Hostel Info */}
            <h6 className="mt-4 mb-3" style={{ color: theme.textSecondary }}>
              Hostel Information
            </h6>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Room <span className="text-danger">*</span>
                </label>
                <select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      Room {room.roomNo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Joining Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Guardian Name
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label
                  className={`form-label text-${currentTheme === "dark" ? "light" : "dark"}`}
                >
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Button */}
            <button
              className="btn w-100 mt-3"
              style={{
                background: theme.btnPrimary,
                color: "#fff",
                border: "none",
                fontWeight: "500",
                padding: "10px",
              }}
            >
              Register Member
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
