import React, { useState, useEffect } from "react";
import {
  User,
  Banknote,
  CreditCard,
  Venus,
  Mars,
  Transgender,
  Mail,
  Phone,
  MapPin,
  Handshake,
  IndianRupee,
  Bed,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import ApiRequest from "../../api/ApiRequest";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MemberProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { theme, currentTheme } = useTheme();

  const [member, setMember] = useState(null);

  const fetchMemberData = async () => {
    try {
      const response = await ApiRequest(`/member-profile/${id}`);
      setMember(response.memberData);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    fetchMemberData();
    // eslint-disable-next-line
  }, []);

  if (!member) {
    return (
      <div className="text-center py-5 text-muted fst-italic">
        No member data found.
      </div>
    );
  }

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: theme.containerBg }}
    >
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div
            className="p-4"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: "12px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: theme.bgLight,
                  }}
                >
                  <User size={40} color={theme.textPrimary} />
                </div>

                <div>
                  <h4 className="mb-2" style={{ color: theme.textPrimary }}>
                    {member.name || "Not Available"}
                  </h4>

                  <div
                    className="small d-flex align-items-center gap-2 mb-1"
                    style={{ color: theme.textSecondary }}
                  >
                    {member.gender === "Male" ? (
                      <Mars size={13} color="skyblue" />
                    ) : member.gender === "Female" ? (
                      <Venus size={13} color="pink" />
                    ) : (
                      <Transgender size={13} color="purple" />
                    )}
                    {member.gender || "Not Available"}
                  </div>

                  <div
                    className="small d-flex align-items-center gap-2 mb-1"
                    style={{ color: theme.textSecondary }}
                  >
                    <Mail size={14} color="#EA4335" />
                    <span>{member.email || "Not Available"}</span>
                  </div>

                  <div
                    className="small d-flex align-items-center gap-2 mb-1"
                    style={{ color: theme.textSecondary }}
                  >
                    <Phone size={14} color="#22C55E" />
                    <span>
                      {member.phoneNo
                        ? `+91 ${member.phoneNo}`
                        : "Not Available"}
                    </span>
                  </div>

                  <div
                    className="small d-flex align-items-center gap-2"
                    style={{ color: theme.textSecondary }}
                  >
                    <MapPin size={14} color="purple" />
                    <span>{member.address || "Not Available"}</span>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-success d-flex align-items-center gap-2"
                onClick={() =>
                  navigate(
                    `/add-transactions/${member.id}/${member.name}/${member.room.rent}`,
                  )
                }
              >
                <CreditCard size={18} />
                Add Payment
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="p-3 h-100"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: "10px",
            }}
          >
            <h5
              className="mb-4 text-center fw-bold"
              style={{ color: theme.textPrimary }}
            >
              --- Personal Information ---{" "}
            </h5>

            <div className="row">
              <div className="col-6">
                <span style={{ color: theme.textPrimary }} className="fw-bold">
                  Guardian:
                </span>{" "}
                <span style={{ color: theme.textSecondary }}>
                  {member.guardianName || "Not Available"}{" "}
                </span>{" "}
                <br />
                <span style={{ color: theme.textPrimary }} className="fw-bold">
                  Secondary Contact:
                </span>{" "}
                <span style={{ color: theme.textSecondary }}>
                  {member.emergencyContact || "Not Available"}
                </span>{" "}
                <br />
                <span style={{ color: theme.textPrimary }} className="fw-bold">
                  D.O.B:
                </span>{" "}
                <span style={{ color: theme.textSecondary }}>
                  {new Date(member.dateOfBirth).toLocaleDateString("en-In", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }) || "Not Available"}
                </span>{" "}
                <br />
              </div>

              <div className="col-6">
                <span style={{ color: theme.textPrimary }} className="fw-bold">
                  ID Proof Type:
                </span>{" "}
                <span style={{ color: theme.textSecondary }}>
                  {member.idProofType || "Not Available"}{" "}
                </span>{" "}
                <br />
                <span style={{ color: theme.textPrimary }} className="fw-bold">
                  ID Proof No:
                </span>{" "}
                <span style={{ color: theme.textSecondary }}>
                  {member.idProofNumber || "Not Available"}{" "}
                </span>{" "}
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="row g-3">
            <div className="col-md-3">
              <div
                className="card p-2"
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "10px",
                  color: theme.textPrimary,
                }}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="card-title mb-1">Room</h6>
                    <h4 className="fw-bold mb-0">{member.roomId}</h4>
                  </div>
                  <Bed size={35} color="Skyblue"/>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="card p-2"
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "10px",
                  color: theme.textPrimary,
                }}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="card-title mb-1">Deposit</h6>
                    <h4 className="fw-bold mb-0">₹{member.deposite}</h4>
                  </div>
                  <Banknote size={35} color="Olive" />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="card p-2"
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "10px",
                  color: theme.textPrimary,
                }}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="card-title mb-1">Rent</h6>
                    <h4 className="fw-bold mb-0">₹{member.room.rent}</h4>
                  </div>
                  <IndianRupee size={35} color="Green" />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="card p-2"
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "10px",
                  color: theme.textPrimary,
                }}
              >
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="card-title mb-1">Joined</h6>
                    <h4 className="fw-bold mb-0">
                      {new Date(member.dateOfJoining).toLocaleDateString(
                        "en-In",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        },
                      )}
                    </h4>
                  </div>
                  <Handshake size={35} color="Orange" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-3"
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: "10px",
        }}
      >
        <h5 style={{color: theme.textPrimary}}>Payment History</h5>

        <div className="table-responsive mt-3">
          <table className="table table-bordered border-secondary"   style={{
            "--bs-table-color": theme.textPrimary,
            "--bs-table-bg": theme.cardBg,
          }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Payment Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ maxWidth: "200px" }}>Description</th>
              </tr>
            </thead>

            <tbody>
              { member.payments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No transaction history available.</td>
                </tr>
              ) : (member.payments?.map((pay, index) => (
                <tr key={pay.id}>
                  <td>{pay.paymentId}</td>

                  <td>
                    {new Date(pay.paymentDate).toLocaleDateString("en-In", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>

                  <td>{pay.month}</td>

                  <td>₹{pay.amount}</td>

                  <td>
                    <span
                      className={`badge ${
                        pay.status === "Paid" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>

                  <td style={{ maxWidth: "200px" }}>
                    {pay.description ? (
                      pay.description
                    ) : (
                      <span className="small text-secondary fst-italic">
                        {" "}
                        Not Available{" "}
                      </span>
                    )}
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
