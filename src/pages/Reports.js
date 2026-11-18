import React, { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import { IconPrint } from "../components/BrandIcons";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Reports() {
  const [donors, setDonors] = useState([]);
  const [inventory, setInventory] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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

      setInventory(inventoryMap);
      setRequests(requestsRes.data.requests || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load report data.");
    } finally {
      setLoading(false);
    }
  };

  const statistics = useMemo(() => {
    const totalUnits = BLOOD_GROUPS.reduce(
      (total, group) => total + Number(inventory[group] || 0),
      0,
    );

    const pending = requests.filter(
      (request) => request.status === "Pending",
    ).length;

    const approved = requests.filter(
      (request) => request.status === "Approved",
    ).length;

    const rejected = requests.filter(
      (request) => request.status === "Rejected",
    ).length;

    return {
      donors: donors.length,
      units: totalUnits,
      requests: requests.length,
      pending,
      approved,
      rejected,
    };
  }, [donors, inventory, requests]);

  const getStockPercentage = (units) => {
    return Math.min((Number(units) / 400) * 100, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <p className="page-kicker">Insights</p>
          <h1>Reports</h1>
          <p>Operational summary of donors, stock, and request outcomes.</p>
        </div>

        <button className="primary-btn" onClick={handlePrint}>
          <IconPrint />
          Print report
        </button>
      </div>

      {error && <div className="request-message error">{error}</div>}

      {loading ? (
        <div className="dashboard-empty">
          <p>Loading report data...</p>
        </div>
      ) : (
        <>
          {/* SUMMARY CARDS */}

          <div className="reports-summary">
            <div className="report-stat-card">
              <div className="report-stat-icon">DR</div>

              <div>
                <span>Total Donors</span>

                <strong>{statistics.donors}</strong>
              </div>
            </div>

            <div className="report-stat-card">
              <div className="report-stat-icon">U+</div>

              <div>
                <span>Blood Units</span>

                <strong>{statistics.units}</strong>
              </div>
            </div>

            <div className="report-stat-card">
              <div className="report-stat-icon">RQ</div>

              <div>
                <span>Total Requests</span>

                <strong>{statistics.requests}</strong>
              </div>
            </div>

            <div className="report-stat-card">
              <div className="report-stat-icon">OK</div>

              <div>
                <span>Approved</span>

                <strong>{statistics.approved}</strong>
              </div>
            </div>
          </div>

          {/* REPORT GRID */}

          <div className="reports-grid">
            {/* BLOOD INVENTORY */}

            <div className="report-card">
              <div className="report-card-header">
                <div>
                  <h3>Blood Group Inventory</h3>

                  <p>Current available units by blood group.</p>
                </div>
              </div>

              <div className="blood-report-list">
                {BLOOD_GROUPS.map((group) => {
                  const units = Number(inventory[group]) || 0;

                  return (
                    <div className="blood-report-row" key={group}>
                      <div className="blood-report-group">
                        <strong>{group}</strong>
                      </div>

                      <div className="blood-report-progress">
                        <div
                          className="blood-report-progress-bar"
                          style={{
                            width: `${getStockPercentage(units)}%`,
                          }}
                        />
                      </div>

                      <strong className="blood-report-units">{units}</strong>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* REQUEST STATUS */}

            <div className="report-card">
              <div className="report-card-header">
                <div>
                  <h3>Request Status</h3>

                  <p>Blood request processing summary.</p>
                </div>
              </div>

              <div className="request-report-list">
                <div className="request-report-item">
                  <span className="report-status pending">Pending</span>

                  <strong>{statistics.pending}</strong>
                </div>

                <div className="request-report-item">
                  <span className="report-status fulfilled">Approved</span>

                  <strong>{statistics.approved}</strong>
                </div>

                <div className="request-report-item">
                  <span className="report-status rejected">Rejected</span>

                  <strong>{statistics.rejected}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* OPERATIONAL SUMMARY */}

          <div className="report-card">
            <div className="report-card-header">
              <div>
                <h3>Operational Summary</h3>

                <p>Current system data summary.</p>
              </div>
            </div>

            <div className="report-summary-table">
              <div className="summary-row summary-heading">
                <strong>Metric</strong>
                <strong>Value</strong>
              </div>

              <div className="summary-row">
                <span>Registered Donors</span>

                <strong>{statistics.donors}</strong>
              </div>

              <div className="summary-row">
                <span>Available Blood Units</span>

                <strong>{statistics.units}</strong>
              </div>

              <div className="summary-row">
                <span>Total Blood Requests</span>

                <strong>{statistics.requests}</strong>
              </div>

              <div className="summary-row">
                <span>Pending Requests</span>

                <strong>{statistics.pending}</strong>
              </div>

              <div className="summary-row">
                <span>Approved Requests</span>

                <strong>{statistics.approved}</strong>
              </div>

              <div className="summary-row">
                <span>Rejected Requests</span>

                <strong>{statistics.rejected}</strong>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
