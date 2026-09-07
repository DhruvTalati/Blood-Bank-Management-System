import React, { useEffect, useState } from "react";
import API from "../api/api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const LOW_STOCK_LIMIT = 50;

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("bloodBankUser") || "{}");
  } catch (error) {
    return {};
  }
}

function Dashboard() {
  const isAdmin = getCurrentUser().role === "Administrator";

  const [donors, setDonors] = useState([]);
  const [inventory, setInventory] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [donorsRes, inventoryRes, requestsRes] = await Promise.all([
        API.get("/donors"),
        API.get("/inventory"),
        API.get("/requests"),
      ]);

      setDonors(donorsRes.data.donors || []);

      const inventoryMap = {};

      (inventoryRes.data.inventory || []).forEach((item) => {
        inventoryMap[item.bloodGroup] = item.units;
      });

      // On a brand-new database with no inventory yet, an Administrator
      // can initialize it in one click straight from the dashboard.
      if (
        Object.keys(inventoryMap).length === 0 &&
        isAdmin &&
        inventoryRes.data.inventory
      ) {
        const initRes = await API.post("/inventory/initialize");

        (initRes.data.inventory || []).forEach((item) => {
          inventoryMap[item.bloodGroup] = item.units;
        });
      }

      setInventory(inventoryMap);
      setRequests(requestsRes.data.requests || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const totalUnits = BLOOD_GROUPS.reduce(
    (total, group) => total + Number(inventory[group] || 0),
    0,
  );

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending",
  );

  const approvedRequests = requests.filter(
    (request) => request.status === "Approved",
  );

  const lowStockGroups = BLOOD_GROUPS.filter(
    (group) => Number(inventory[group] || 0) <= LOW_STOCK_LIMIT,
  );

  const getStockPercentage = (units) => {
    return Math.min((units / 400) * 100, 100);
  };

  return (
    <div className="dashboard-page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h2>Dashboard</h2>

          <p>Overview of your Blood Bank Management System.</p>
        </div>

        <button
          className="primary-btn"
          onClick={loadDashboardData}
          disabled={loading}
        >
          ↻ {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && <div className="request-message error">{error}</div>}

      {/* STATISTICS */}

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">👥</div>

          <div>
            <span>Total Donors</span>

            <h3>{donors.length}</h3>

            <small>Registered donors</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🩸</div>

          <div>
            <span>Blood Units</span>

            <h3>{totalUnits}</h3>

            <small>Available units</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📋</div>

          <div>
            <span>Pending Requests</span>

            <h3>{pendingRequests.length}</h3>

            <small>Awaiting approval</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⚠️</div>

          <div>
            <span>Low Stock</span>

            <h3>{lowStockGroups.length}</h3>

            <small>Groups need attention</small>
          </div>
        </div>
      </div>

      {/* SECONDARY STATISTICS */}

      <div className="dashboard-mini-stats">
        <div className="mini-stat">
          <span>Total Requests</span>
          <strong>{requests.length}</strong>
        </div>

        <div className="mini-stat">
          <span>Approved Requests</span>
          <strong>{approvedRequests.length}</strong>
        </div>

        <div className="mini-stat">
          <span>Blood Groups</span>
          <strong>{BLOOD_GROUPS.length}</strong>
        </div>

        <div className="mini-stat">
          <span>System Status</span>
          <strong className="system-online">● Online</strong>
        </div>
      </div>

      {/* MAIN DASHBOARD GRID */}

      <div className="dashboard-grid">
        {/* BLOOD INVENTORY */}

        <div className="dashboard-panel">
          <div className="panel-header">
            <h4>Blood Inventory</h4>

            <span>Current Stock</span>
          </div>

          <div className="blood-stock">
            {BLOOD_GROUPS.map((group) => {
              const units = Number(inventory[group]) || 0;

              const isLow = units <= LOW_STOCK_LIMIT;

              return (
                <div className="blood-row" key={group}>
                  <div className="blood-group">{group}</div>

                  <div className="stock-info">
                    <div className="stock-title-row">
                      <strong>{units} units</strong>

                      {isLow && <span className="stock-low-text">Low</span>}
                    </div>

                    <div className="stock-bar">
                      <div
                        className="stock-progress"
                        style={{
                          width: `${getStockPercentage(units)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECENT REQUESTS */}

        <div className="dashboard-panel">
          <div className="panel-header">
            <h4>Recent Requests</h4>

            <span>{requests.length} total</span>
          </div>

          {requests.length === 0 ? (
            <div className="dashboard-empty">
              <div>📋</div>

              <p>No blood requests yet.</p>
            </div>
          ) : (
            <div className="request-list">
              {requests.slice(0, 5).map((request) => (
                <div className="request-item" key={request._id}>
                  <div className="request-icon">🩸</div>

                  <div>
                    <strong>{request.hospital}</strong>

                    <small>
                      {request.bloodGroup}
                      {" • "}
                      {request.units} units
                    </small>
                  </div>

                  <span
                    className={`status ${
                      request.status === "Approved"
                        ? "approved"
                        : request.status === "Rejected"
                          ? "rejected"
                          : "pending"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LOW STOCK ALERT */}

      {lowStockGroups.length > 0 && (
        <div className="inventory-warning">
          <div className="warning-icon">⚠️</div>

          <div>
            <strong>Low Stock Alert</strong>

            <p>
              {lowStockGroups.join(", ")}{" "}
              {lowStockGroups.length === 1 ? "has" : "have"} reached the minimum
              stock level.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
