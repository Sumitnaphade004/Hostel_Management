import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const RoomForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const { theme, currentTheme } = useTheme();

  const [formData, setFormData] = useState({
    id: null,
    roomNo: "",
    rent: "",
    capacity: "",
    status: "Available",
  });

  // ✅ Pre-fill data for update
  useEffect(() => {
    if (!initialData) {
      setFormData({
        id: null,
        roomNo: "",
        rent: "",
        capacity: "",
        status: "Available",
      });
    }

    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        id: initialData.id || null,
        roomNo: initialData.roomNo || "",
        rent: initialData.rent || "",
        capacity: initialData.capacity || "",
        status: initialData.status || "Available",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <>
      <div className="modal-body p-4">
        <div className="mb-3">
          <label className="form-label fw-semibold small" style={{ color: theme.textSecondary }}>
            Room Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            className={`form-control themed-input-${currentTheme}`}
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
            Rent (Each Member) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            className={`form-control themed-input-${currentTheme}`}
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
            Capacity <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className={`form-control themed-input-${currentTheme}`}
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
            background: theme.btnSecondary,
            color: "#fff",
          }}
        >
          Cancel
        </button>

        <button
          className="btn"
          onClick={handleSubmit}
          style={{
            borderRadius: "10px",
            padding: "10px 24px",
            background: theme.btnPrimary,
            color: "#fff",
          }}
        >
          {isEdit ? "Update Room" : "Save Room"}
        </button>
      </div>
    </>
  );
};

export default RoomForm;