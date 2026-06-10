import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { CreditCard, IndianRupee, FileText, Calendar } from "lucide-react";

const AddTransaction = () => {
  const { theme, currentTheme } = useTheme();

  const [formData, setFormData] = useState({
    userId: null,
    amount: "",
    paymentDate: "",
    month: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transaction Data:", formData);
  };

  return (
    <div
      className="container-fluid p-4"
      style={{ background: theme.containerBg}}
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
                <label className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}>Category</label>
                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    background: theme.inputBg,
                    color: theme.inputText,
                    border: `1px solid ${theme.inputBorder}`,
                  }}
                >
                  <option value="">Select Category</option>
                  <option>Room Rent</option>
                  <option>Mess Fees</option>
                  <option>Electricity</option>
                  <option>Maintenance</option>
                  <option>Refund</option>
                  <option>Other</option>
                </select>
              </div>
              {/* Transaction Type */}
              <div className="col-md-4">
                <label className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}>
                  Select Member 
                </label>
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  style={{
                    background: theme.inputBg,
                    color: theme.inputText,
                    border: `1px solid ${theme.inputBorder}`,
                  }}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              {/* Category */}

              {/* Amount */}
              <div className="col-md-4">
                <label className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}>Amount</label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: theme.bgLight,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  >
                    <IndianRupee size={16} />
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

              {/* Payment Mode */}
              <div className="col-md-4">
                <label className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}>Payment Mode</label>
                <select
                  className="form-select"
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  style={{
                    background: theme.inputBg,
                    color: theme.inputText,
                    border: `1px solid ${theme.inputBorder}`,
                  }}
                >
                  <option value="">Select Mode</option>
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Bank Transfer</option>
                  <option>Card</option>
                </select>
              </div>

              {/* Reference ID */}
              <div className="col-md-4">
                <label className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}>
                  Reference ID
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: theme.bgLight,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  >
                    <CreditCard size={16} />
                  </span>
                  <input
                    type="text"
                    name="referenceId"
                    className={`form-control themed-input-${currentTheme}`}
                    value={formData.referenceId}
                    onChange={handleChange}
                    placeholder="Optional"
                    style={{
                      background: theme.inputBg,
                      color: theme.inputText,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  />
                </div>
              </div>

              {/* Date */}
              <div className="col-md-4">
                <label className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}>
                  Transaction Date
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: theme.bgLight,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  >
                    <Calendar size={16} />
                  </span>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    style={{
                      background: theme.inputBg,
                      color: theme.inputText,
                      border: `1px solid ${theme.inputBorder}`,
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="col-12">
                <label className={`form-label fw-semibold text-${currentTheme === "light" ? "dark" : "light"}`}>
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