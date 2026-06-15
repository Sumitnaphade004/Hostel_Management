import React, { useEffect, useState, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Search, Download } from "lucide-react"; // Optional: Use any icon library
import ApiRequest from "../../api/ApiRequest";
import Swal from "sweetalert2";
import { exportToExcel } from "../../helper/ExportToExcel";
import { useNavigate } from "react-router-dom";

const TransactionsList = () => {
  const { theme, currentTheme } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await ApiRequest("/payments");
      setTransactions(response.allPayments);
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
    fetchTransactions();
  }, []);

  // Filter Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.paymentId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.userName.toLowerCase().includes(searchTerm.toLowerCase());

      const paymentDate = new Date(transaction.paymentDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDate =
        (!start || paymentDate >= start) && (!end || paymentDate <= end);

      return matchesSearch && matchesDate;
    });
  }, [transactions, searchTerm, startDate, endDate]);

  const navigate = useNavigate();

  const handleNavigation = (id) => {
    try {
      navigate(`/member-profile/${id}`);
    } catch (error) {
      console.error(
        "Error while navigating in ViewTransaction.js file: ",
        error,
      );
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
                  Transaction History
                </h3>
                <p
                  className=" small mb-0"
                  style={{ color: theme.textSecondary }}
                >
                  Track and manage hostel payment transactions
                </p>
              </div>

              {/* Search Bar */}
              <div className="col-md-8">
                <div className="row g-2 align-items-center">
                  <div className="col-md-4">
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
                        placeholder="Search here....."
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
                  <div className="col-md-2 d-flex flex-column">
                    <button
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#ffffff",
                        backgroundColor: theme.btnPrimary,
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        exportToExcel(
                          filteredTransactions,
                          `${new Date().toLocaleDateString("en-In", { day: "2-digit", month: "2-digit", year: "numeric" })}_Transactions`,
                        );
                      }}
                    >
                      <div>
                        <Download
                          style={{
                            display: "inline",
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                            verticalAlign: "middle",
                          }}
                        />
                      </div>
                      <div>Export Excel</div>
                    </button>
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
                  <th className="px-4 py-3 border-0 text-center">#</th>
                  <th className="py-3 border-0">Payment ID</th>
                  <th className="py-3 border-0">Member Name</th>
                  <th className="py-3 border-0">Month</th>
                  <th className="py-3 border-0">Amount</th>
                  <th className="py-3 border-0">Payment Date</th>
                  <th className="py-3 border-0">Status</th>
                  <th className="py-3 border-0">Description</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      Loading...
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5"
                      style={{ color: theme.textPrimary }}
                    >
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      style={{ borderBottom: `1px solid ${theme.border}` }}
                    >
                      <td className="py-3 text-center">{index + 1}</td>

                      <td className="py-2">
                        <span>{transaction.paymentId}</span>
                      </td>

                      <td className="py-2">
                        <span
                          className="fw-bold"
                          style={{
                            color: theme.textPrimary,
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "blue")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = theme.textPrimary)
                          }
                          onClick={() => {
                            handleNavigation(transaction.userId);
                          }}
                        >
                          {transaction.userName}
                        </span>
                      </td>

                      <td className="py-2" style={{ color: theme.textPrimary }}>
                        {transaction.month}
                      </td>

                      <td className="py-2">
                        <span className="text-success px-3 py-2">
                          ₹{Number(transaction.amount).toLocaleString("en-IN")}
                        </span>
                      </td>

                      <td className="py-2" style={{ color: theme.textPrimary }}>
                        {new Date(transaction.paymentDate).toLocaleDateString(
                          "en-IN",
                        )}
                      </td>

                      <td className="py-2">
                        <span
                          className={`badge bg-${
                            transaction.status === "Paid"
                              ? "success"
                              : transaction.status === "Pending"
                                ? "warning"
                                : "danger"
                          } px-3`}
                        >
                          {transaction.status}
                        </span>
                      </td>

                      <td className="py-2" style={{ color: theme.textPrimary }}>
                        {transaction.description || "N/A"}
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

export default TransactionsList;
