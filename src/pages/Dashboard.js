import React from "react";
import { IndianRupee, Users, BedDouble} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Monthly Income",
      value: "₹3,50,000",
      icon: IndianRupee,
      bg: "success",
    },
    {
      title: "Total Members",
      value: 120,
      icon: Users,
      bg: "primary",
    },
    {
      title: "Total Rooms",
      value: 45,
      icon: BedDouble,
      bg: "warning",
    },
    {
      title: "Total Rooms",
      value: 45,
      icon: BedDouble,
      bg: "secondary",
    },
  ];

  return (
    <div className="container">
      <h3 className="mb-4 fw-bold">Hostel Dashboard</h3>

      <div className="row g-4">
        {stats.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className={`card text-white bg-${item.bg} shadow-sm`}>
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="card-title mb-1">{item.title}</h6>
                  <h3 className="fw-bold mb-0">{item.value}</h3>
                </div>
                <item.icon size={35}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-4 mt-3">
        {/* Left Table */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-semibold">
              Recent Students
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Room</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Rahul Patil</td>
                      <td>101</td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Amit Sharma</td>
                      <td>102</td>
                      <td>
                        <span className="badge bg-warning text-dark">Pending</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Table */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-semibold">
              Recent Payments
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Student</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Rahul Patil</td>
                      <td>₹5,000</td>
                      <td>12 Sep 2025</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Amit Sharma</td>
                      <td>₹4,500</td>
                      <td>10 Sep 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>                
    </div>
  );
}
