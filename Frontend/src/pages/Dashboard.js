import React, { useState, useEffect } from "react";
import { IndianRupee, Users, BedDouble } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ApiRequest from "../api/ApiRequest";
import darkLoadingGif from "../assets/dark_loading.gif";
import lightLoadingGif from "../assets/light_loading.gif";

export default function Dashboard() {
  const { currentTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await ApiRequest("/dashboard");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error in dashboard screen: ", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Overall Income",
      value: "₹" + (data.overAllIncome?.toLocaleString("en-IN") || "0"),
      icon: IndianRupee,
      bg: "info-subtle",
      b: "info",
    },
    {
      title: "Monthly Income",
      value: "₹" + (data.monthlyIncome?.toLocaleString("en-IN") || "0"),
      icon: IndianRupee,
      bg: "success-subtle",
      b: "success",
    },
    {
      title: "Total Members",
      value: data.activeMemberCount || 0,
      icon: Users,
      bg: "primary-subtle",
      b: "primary",
    },
    {
      title: "Total Rooms",
      value: data.roomCount || 0,
      icon: BedDouble,
      bg: "warning-subtle",
      b: "warning",
    },
  ];

  return (
    <div className="container">
      {loading ? (
        <div className="text-center" style={{ marginTop: "150px" }}>
          <img
            src={currentTheme === "dark" ? darkLoadingGif : lightLoadingGif}
            alt="loading"
          />
        </div>
      ) : (
        <>
          <h3
            className={`mb-4 fw-bold text-${currentTheme === "dark" ? "light" : "dark"}`}
          >
            Hostel Dashboard
          </h3>
          <div className="row g-4">
            {stats.map((item, index) => (
              <div className="col-md-3" key={index}>
                <div
                  className={`card bg-${item.bg} border-${item.b} shadow-sm`}
                >
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="card-title mb-1">{item.title}</h6>
                      <h3 className="fw-bold mb-0">{item.value}</h3>
                    </div>
                    <item.icon size={35} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row g-4 mt-3">
            {/* Left Table */}
            <div className="col-md-6">
              <div className="card border-0 h-100 bg-transparent">
                <div
                  className={`card-header bg-${currentTheme !== "light" ? "light" : "dark"} text-${currentTheme === "light" ? "light" : "dark"} text-center`}
                >
                  <span className="fw-semibold">Recent Members</span>
                  <i className="bi bi-people-fill"></i>
                </div>

                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table
                      className={`table table-bordered table-hover align-middle mb-0 table-${currentTheme === "light" ? "light" : "dark"}`}
                      style={{ border: `2px solid #3a3d55` }}
                    >
                      <thead
                        className={`table-${currentTheme === "light" ? "success" : "info"}`}
                      >
                        <tr>
                          <th>#</th>
                          <th>Member Name</th>
                          <th>Room</th>
                          <th>Rent</th>
                        </tr>
                      </thead>
                      <tbody style={{ border: `2px solid #3a3d55` }}>
                        {!data.recentMembers?.length ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No members found
                            </td>
                          </tr>
                        ) : (
                          data.recentMembers.map((member, index) => (
                            <tr key={member.id}>
                              <td>{index + 1}</td>
                              <td className="fw-semibold">{member.name}</td>
                              <td>
                                <span className="badge bg-secondary">Room {member.room.roomNo}</span>
                              </td>
                              <td className="text-success fw-bold">₹{member.room.rent}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Table */}
            <div className="col-md-6">
              <div className="card border-0 h-100 bg-transparent">
                <div
                  className={`card-header bg-${currentTheme !== "light" ? "light" : "dark"} text-${currentTheme === "light" ? "light" : "dark"} text-center`}
                >
                  <span className="fw-semibold">Recent Transactions</span>
                  <i className="bi bi-people-fill"></i>
                </div>

                <div className="card-body p-0" style={{}}>
                  <div className="table-responsive">
                    <table
                      className={`table table-bordered rounded table-hover align-middle mb-0 table-${currentTheme === "light" ? "light" : "dark"}`}
                      style={{ border: `2px solid #3a3d55` }}
                    >
                      <thead
                        className={`table-${currentTheme === "light" ? "success" : "info"}`}
                      >
                        <tr>
                          <th>#</th>
                          <th>Member</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody style={{ border: `2px solid #3a3d55` }}>
                        {!data.recentTransactions?.length ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No members found
                            </td>
                          </tr>
                        ) : (
                          data.recentTransactions.map((txn, index) => (
                            <tr key={txn.id}>
                              <td>{index + 1}</td>
                              <td className="fw-semibold">{txn.userName}</td>
                              <td className="text-success fw-bold">₹{txn.amount}</td>
                              <td>
                                {new Date(txn.paymentDate).toLocaleDateString("en-IN", {day: "2-digit", month: "2-digit", year: "numeric"})}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
