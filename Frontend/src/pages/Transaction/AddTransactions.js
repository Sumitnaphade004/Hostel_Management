import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { User, IndianRupee, Calendar } from "lucide-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ApiRequest from "../../api/ApiRequest";

const AddTransaction = () => {
  const { theme, currentTheme } = useTheme();
  const { id, name, rent } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: null,
    userName: "",
    paymentDate: "",
    amount: "",
    month: "",
    description: "",
    status: "Paid",
  });

  useEffect(() => {
    setFormData({
      userId: id || null,
      userName: name || "",
      paymentDate: new Date().toISOString().split("T")[0] || "",
      amount: rent || "",
      month: null,
      description: null,
      status: "Paid",
    });
  }, [id, name, rent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.userId ||
      !formData.userName ||
      !formData.paymentDate ||
      !formData.amount ||
      !formData.month ||
      !formData.status
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all required fields",
      });
    }

    await ApiRequest("/add-payment", {
      method: "POST",
      body: formData,
    });

    await Swal.fire({
      icon: "success",
      title: "Transaction Done",
      text: "Transaction details stored successfully."
    })

    navigate(-1);
  };

  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div
      className="container-fluid p-4"
      style={{ background: theme.containerBg }}
    >
      {/* Page Title */}
      <h4 className="fw-bold mb-4" style={{ color: theme.textPrimary }}>
        Add Transaction
      </h4>

      {/* Card */}
      <div
        className="card border-0 rounded-4"
        style={{
          background: theme.cardBg,
          boxShadow: theme.cardShadow,
          //   maxWidth: "900px",
        }}
      >
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-4">
                <label
                  className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}
                >
                  Member Name <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: theme.bgLight,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  >
                    <User
                      size={16}
                      color={currentTheme === "light" ? "#000000" : "#ffffff"}
                    />
                  </span>
                  <input
                    type="text"
                    name="userName"
                    className={`form-control themed-input-${currentTheme}`}
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Enter member name"
                    style={{
                      background: theme.inputBg,
                      color: theme.inputText,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label
                  className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}
                >
                  Transaction Date <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: theme.bgLight,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  >
                    <Calendar
                      size={16}
                      color={currentTheme === "light" ? "#000000" : "#ffffff"}
                    />
                  </span>
                  <input
                    type="date"
                    name="paymentDate"
                    className="form-control"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    style={{
                      background: theme.inputBg,
                      color: theme.inputText,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label
                  className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}
                >
                  Amount <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: theme.bgLight,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  >
                    <IndianRupee
                      size={16}
                      color={currentTheme === "light" ? "#000000" : "#ffffff"}
                    />
                  </span>
                  <input
                    type="number"
                    name="amount"
                    className={`form-control themed-input-${currentTheme}`}
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    style={{
                      background: theme.inputBg,
                      color: theme.inputText,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label
                  className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}
                >
                  Month <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option value="">Select Month</option>

                  {months.map((month) => (
                    <option key={month} value={`${month} ${currentYear}`}>
                      {month} {currentYear}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label
                  className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}
                >
                  Status <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="col-12">
                <label
                  className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}
                >
                  Description / Notes
                </label>
                <textarea
                  className={`form-control themed-input-${currentTheme}`}
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional notes"
                  style={{
                    background: theme.inputBg,
                    color: theme.inputText,
                    border: `1px solid ${theme.inputBorder}`,
                  }}
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="reset"
                className="btn btn-outline-secondary"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  background: theme.btnPrimary,
                  color: "#fff",
                }}
              >
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
      <style>{`
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

export default AddTransaction;
