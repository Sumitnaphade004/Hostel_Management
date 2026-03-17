import React, { useEffect, useState, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Search,
  Calendar,
  SquarePen,
  Trash2,
  Mail,
  PhoneCall,
} from "lucide-react"; // Optional: Use any icon library
import ApiRequest from "../../api/ApiRequest";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ViewMembers = () => {
  const { theme, currentTheme } = useTheme();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchMember = async () => {
    try {
      setLoading(true);
      const response = await ApiRequest("/members");
      setMembers(response.members);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "Error",
        title: "Server Error",
        text: "Something went wrong.",
      });
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  // Filter Logic
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase());

      const memberDate = new Date(m.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDate =
        (!start || memberDate >= start) && (!end || memberDate <= end);

      return matchesSearch && matchesDate;
    });
  }, [members, searchTerm, startDate, endDate]);

  const navigate = useNavigate();


  const handleEdit = async (id) => {
    try {
      navigate(`/edit-member/${id}`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
      });
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ApiRequest(`/delete-member/${id}`); 

        Swal.fire({
          title: "Deleted!",
          text: "Record deleted successfully.",
          icon: "success",
        });

        fetchMember();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div
      className="container-fluid py-3"
      style={{ background: theme.containerBg, minHeight: "100vh" }}
    >
      <div className="container">
        {/* Header & Filter Section */}
        <div
          className="card border-0 mb-4"
          style={{
            background: theme.cardBg,
            boxShadow: theme.cardShadow,
            borderRadius: "15px",
          }}
        >
          <div className="card-body p-4">
            <div className="row align-items-center g-3">
              <div className="col-md-4">
                <h3
                  className="mb-0 fw-bold"
                  style={{ color: theme.textPrimary }}
                >
                  Members Directory
                </h3>
                <p
                  className=" small mb-0"
                  style={{ color: theme.textSecondary }}
                >
                  Manage and monitor your hostel members
                </p>
              </div>

              {/* Search Bar */}
              <div className="col-md-8">
                <div className="row g-2">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span
                        className="input-group-text border-1"
                        style={{ background: theme.bgSecondary }}
                      >
                        <Search
                          size={18}
                          style={{ color: theme.textSecondary }}
                        />
                      </span>
                      <input
                        type="text"
                        className={`form-control border-1 shadow-none themed-input-${currentTheme === "light" ? "light" : "dark"}`}
                        placeholder="Search by name or email..."
                        style={{
                          background: theme.bgSecondary,
                          color: theme.textPrimary,
                        }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Date Filters */}
                  <div className="col-md-3">
                    <input
                      type="date"
                      className={`form-control border-1 shadow-none ${currentTheme === "dark" ? "date-dark" : "date-light"}`}
                      style={{
                        background: theme.bgSecondary,
                        color: theme.textPrimary,
                      }}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="date"
                      className={`form-control border-1 shadow-none ${currentTheme === "dark" ? "date-dark" : "date-light"}`}
                      style={{
                        background: theme.bgSecondary,
                        color: theme.textPrimary,
                      }}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table/List Section */}
        <div
          className="card border-0 shadow-sm"
          style={{
            background: theme.cardBg,
            borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <div className="table-responsive">
            <table
              className={`table mb-0 align-middle ${currentTheme === "dark" ? "table-dark table-hover" : "table-light table-hover"}`}
            >
              <thead style={{ background: theme.bgSecondary }}>
                <tr>
                  <th className="px-4 py-3 border-0">ID</th>
                  <th className="px-4 py-3 border-0">Name</th>
                  <th className="py-3 border-0">Contact No</th>
                  <th className="py-3 border-0 text-center">Room</th>
                  <th className="py-3 border-0">Joined Date</th>
                  <th className="py-3 border-0">Status</th>
                  <th className="py-3 border-0 text-end px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      Loading...
                    </td>
                  </tr>
                ) : filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No members match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member, index) => (
                    <tr
                      key={member.id}
                      style={{ borderBottom: `1px solid ${theme.border}` }}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                            style={{ width: "40px", height: "40px" }}
                          >
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div
                              className="fw-bold"
                              style={{ color: theme.textPrimary }}
                            >
                              {member.name}
                            </div>
                            <div
                              className="small"
                              style={{ color: theme.textSecondary }}
                            >
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2">
                        <div
                          className="small"
                          style={{ color: theme.textPrimary }}
                        >
                          <PhoneCall size={16} className="me-2 text-success" />{" "}
                          +91 {member.phoneNo}
                        </div>
                      </td>
                      <td className="py-2 text-center">
                        <span className="badge rounded-pill bg-info-subtle text-dark px-3">
                          {member.room ? `Room ${member.room.roomNo}` : "N/A"}
                        </span>
                      </td>
                      <td className="py-2" style={{ color: theme.textPrimary }}>
                        <Calendar size={14} className="me-2 text-info" />
                        {new Date(member.createdAt).toLocaleDateString(
                          "en-IN",
                          { day: "2-digit", month: "2-digit", year: "numeric" },
                        )}
                      </td>
                      <td className="py-2" style={{ color: theme.textPrimary }}>
                        <span
                          className={`badge bg-${member.status === "active" ? "success" : "danger"} px-3`}
                        >
                          {member.status ? member.status : "N/A"}
                        </span>
                      </td>
                      <td className="py-2 text-end px-4">
                        <SquarePen size={20} className="me-2 text-success" style={{ cursor: "pointer" }} onClick={() => handleEdit(member.id)} />
                        <Trash2
                          size={20}
                          className="me-2 text-danger cursor-pointer"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(member.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`
        .themed-input-light::placeholder {
          color: ${theme.textSecondary};
        }

        .themed-input-dark::placeholder {
          color: ${theme.textSecondary};
        }

        .date-dark::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }

        .date-light::-webkit-calendar-picker-indicator {
          filter: invert(0);
        }
      `}</style>
    </div>
  );
};

export default ViewMembers;
