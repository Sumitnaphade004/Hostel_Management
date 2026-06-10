import React, { useState, useEffect } from "react";
import {
  User,
  Banknote,
  Users,
  ShieldCheck,
  Venus,
  Mars,
  Transgender,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import ApiRequest from "../../api/ApiRequest";
import { useParams } from "react-router-dom";

const MemberProfile = () => {
  const { id } = useParams();

  const { theme } = useTheme();

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
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center mx-3"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: theme.bgLight,
                }}
              >
                <User size={40} color={theme.textPrimary} />
              </div>

              <div
                style={{
                  color: theme.textPrimary,
                }}
              >
                <h4>{member.name || "Not Available"}</h4>
                <div className="small" style={{ color: theme.textSecondary }}>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ color: theme.textSecondary }}
                  >
                    {member.gender === "Male" ? (
                      <Mars size={13} color={"skyblue"} />
                    ) : member.gender === "Female" ? (
                      <Venus size={13} color={"pink"} />
                    ) : (
                      <Transgender size={13} color={"purple"} />
                    )}{" "}
                    {member.gender || "Not Available"}
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Mail size={14} color="#EA4335" />
                    <span>{member.email || "Not Available"}</span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Phone size={14} color="#22C55E" />
                    <span>
                      {member.phoneNo
                        ? "+91 " + member.phoneNo
                        : "Not Available"}
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <MapPin size={14} color="purple" />
                    <span>
                      {member.address
                        ? member.address
                        : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>
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
            <h5 className="mb-4 text-center fw-bold" style={{color: theme.textPrimary}}>--- Personal Information --- </h5>

            <div className="row">
              <div className="col-6">
                <span style={{color: theme.textPrimary}} className="fw-bold" >Guardian:</span>{" "}
                <span style={{color: theme.textSecondary}} >{member.guardianName || "Not Available"} </span> <br />
                <span style={{color: theme.textPrimary}} className="fw-bold" >Secondary Contact:</span>{" "}
                <span style={{color: theme.textSecondary}} >{member.emergencyContact || "Not Available"}</span> <br />
                <span style={{color: theme.textPrimary}} className="fw-bold" >D.O.B:</span>{" "}
                <span style={{color: theme.textSecondary}} >{ new Date(member.dateOfBirth).toLocaleDateString("en-In",{day: "2-digit", month: "2-digit", year: "numeric"}) || "Not Available"}</span> <br />
              </div>

              <div className="col-6">
                <span style={{color: theme.textPrimary}} className="fw-bold" >ID Proof Type:</span>{" "}
                <span style={{color: theme.textSecondary}} >{member.idProofType || "Not Available"} </span> <br />
                <span style={{color: theme.textPrimary}} className="fw-bold" >ID Proof No:</span>{" "}
                <span style={{color: theme.textSecondary}} >{member.idProofNumber || "Not Available"} </span> <br />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="row g-3 mb-4">
            <div className="col-3">
              <div className="card p-3">
                <div>Room</div>
                <h5>{member.roomId}</h5>
              </div>
            </div>

            <div className="col-3">
              <div className="card p-3">
                <div>Deposit</div>
                <h5>₹{member.deposite}</h5>
              </div>
            </div>

            <div className="col-3">
              <div className="card p-3">
                <div>Rent</div>
                <h5>₹{member.room.rent}</h5>
              </div>
            </div>

            <div className="col-3">
              <div className="card p-3">
                <div>Joined</div>
                <h5>{ new Date(member.dateOfJoining).toLocaleDateString("en-In",{day: "2-digit", month: "2-digit", year: "numeric"})}</h5>
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
        <h5>Payment History</h5>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Payment Month</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {member.payments?.map((pay, index) => (
                <tr key={pay.id}>
                  <td>{index+1}</td>

                  <td>{new Date(pay.paymentDate).toLocaleDateString("en-In",{day: "2-digit", month: "2-digit", year: "numeric"})}</td>

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
