import React, { useEffect, useState, useCallback } from "react";
import API from "../api/api";
import { IconPlus, IconSearch } from "../components/BrandIcons";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const URGENCY_LEVELS = ["Normal", "Urgent", "Critical"];

const EMPTY_FORM = {
  hospital: "",
  patientName: "",
  patientAge: "",
  bloodGroup: "",
  units: "",
  urgency: "Normal",
  contact: "",
  reason: "",
};

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("bloodBankUser") || "{}");
  } catch (error) {
    return {};
  }
}

function Requests() {
  const currentUser = getCurrentUser();
  const isAdmin = currentUser.role === "Administrator";

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [actioningId, setActioningId] = useState(null);

  const showMessage = useCallback((text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, []);

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);

      const response = await API.get("/requests");

      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to load blood requests.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setFormError("");
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.hospital.trim() ||
      !formData.patientName.trim() ||
      !formData.patientAge ||
      !formData.bloodGroup ||
      !formData.units ||
      !formData.contact.trim()
    ) {
      setFormError(
        "Hospital, patient name, age, blood group, units and contact are required.",
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await API.post("/requests", {
        ...formData,
        patientAge: Number(formData.patientAge),
        units: Number(formData.units),
      });

      if (response.data.success) {
        resetForm();
        loadRequests();
        showMessage("Blood request created successfully.");
      }
    } catch (error) {
      setFormError(
        error.response?.data?.message || "Unable to create blood request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setActioningId(id);

      const response = await API.put(`/requests/${id}/approve`);

      if (response.data.success) {
        loadRequests();
        showMessage("Blood request approved and inventory updated.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to approve this request.",
        "error",
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm("Reject this blood request?");

    if (!confirmed) return;

    try {
      setActioningId(id);

      const response = await API.put(`/requests/${id}/reject`);

      if (response.data.success) {
        loadRequests();
        showMessage("Blood request rejected.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to reject this request.",
        "error",
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this blood request? This cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setActioningId(id);

      const response = await API.delete(`/requests/${id}`);

      if (response.data.success) {
        loadRequests();
        showMessage("Blood request deleted.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to delete this request.",
        "error",
      );
    } finally {
      setActioningId(null);
    }
  };

  const filteredRequests = requests.filter((request) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      request.hospital?.toLowerCase().includes(searchText) ||
      request.patientName?.toLowerCase().includes(searchText) ||
      request.requestId?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length;

  return (
    <div className="page-container">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <p className="page-kicker">Hospital workflow</p>
          <h1>Blood requests</h1>
          <p>Review, approve, and track transfusion requests.</p>
        </div>

        <button className="primary-btn" onClick={() => setShowForm(true)}>
          <IconPlus />
          New request
        </button>
      </div>

      {/* MESSAGE */}

      {message && (
        <div
          className={
            messageType === "error"
              ? "request-message error"
              : "request-message"
          }
        >
          {messageType === "error" ? "⚠ " : "✓ "}
          {message}
        </div>
      )}

      {/* STATISTICS */}

      <div className="dashboard-cards request-stats">
        <div className="dashboard-card">
          <div className="card-icon card-icon-pending">ALL</div>

          <div>
            <span>Total Requests</span>
            <h3>{requests.length}</h3>
            <small>All time</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-alert">PD</div>

          <div>
            <span>Pending</span>
            <h3>{pendingCount}</h3>
            <small>Awaiting review</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-ok">OK</div>

          <div>
            <span>Approved</span>
            <h3>{approvedCount}</h3>
            <small>Units deducted</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-blood">NO</div>

          <div>
            <span>Rejected</span>
            <h3>{rejectedCount}</h3>
            <small>Not fulfilled</small>
          </div>
        </div>
      </div>

      {/* SEARCH / FILTER */}

      <div className="donor-toolbar">
        <div className="search-box">
          <IconSearch />
          <input
            type="text"
            placeholder="Search by hospital, patient or request ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="blood-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* TABLE */}

      <div className="request-table-container">
        <div className="panel-header">
          <h4>Blood Requests</h4>

          <span>
            {filteredRequests.length} request
            {filteredRequests.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="dashboard-empty">
            <p>Loading requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="empty-requests">
            <h4>No blood requests found</h4>

            <p>
              {requests.length === 0
                ? "Create the first blood request to get started."
                : "Try changing your search or filter."}
            </p>

            {requests.length === 0 && (
              <button className="primary-btn" onClick={() => setShowForm(true)}>
                + New Request
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="request-table">
              <thead>
                <tr>
                  <th>REQUEST</th>
                  <th>PATIENT</th>
                  <th>BLOOD GROUP</th>
                  <th>UNITS</th>
                  <th>URGENCY</th>
                  <th>STATUS</th>
                  {isAdmin && <th>ACTION</th>}
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request._id}>
                    <td>
                      <strong>{request.hospital}</strong>
                      <span className="table-subtext">{request.requestId}</span>
                    </td>

                    <td>
                      <strong>{request.patientName}</strong>
                      <span className="table-subtext">
                        Age {request.patientAge} · {request.contact}
                      </span>
                    </td>

                    <td>
                      <span className="blood-badge">{request.bloodGroup}</span>
                    </td>

                    <td>{request.units}</td>

                    <td>
                      <span
                        className={`urgency-badge ${request.urgency.toLowerCase()}`}
                      >
                        {request.urgency}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`request-status ${request.status.toLowerCase()}`}
                      >
                        {request.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td>
                        <div className="request-actions">
                          {request.status === "Pending" ? (
                            <>
                              <button
                                className="approve-btn"
                                disabled={actioningId === request._id}
                                onClick={() => handleApprove(request._id)}
                              >
                                Approve
                              </button>

                              <button
                                className="reject-btn"
                                title="Reject request"
                                disabled={actioningId === request._id}
                                onClick={() => handleReject(request._id)}
                              >
                                ×
                              </button>
                            </>
                          ) : (
                            <button
                              className="action-btn delete"
                              title="Delete request"
                              disabled={actioningId === request._id}
                              onClick={() => handleDelete(request._id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* NEW REQUEST MODAL */}

      {showForm && (
        <div className="modal-overlay">
          <div className="donor-modal request-modal">
            <div className="modal-header">
              <h3>New Blood Request</h3>

              <button className="modal-close" onClick={resetForm}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {formError && (
                <div className="request-message error">{formError}</div>
              )}

              <div className="edit-form-grid">
                <div className="form-group">
                  <label>Hospital Name</label>

                  <input
                    className="form-control"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                  />
                </div>

                <div className="form-group">
                  <label>Patient Name</label>

                  <input
                    className="form-control"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                  />
                </div>

                <div className="form-group">
                  <label>Patient Age</label>

                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleChange}
                    placeholder="Enter patient age"
                  />
                </div>

                <div className="form-group">
                  <label>Blood Group</label>

                  <select
                    className="form-control"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>

                    {BLOOD_GROUPS.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Units Required</label>

                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    placeholder="Enter number of units"
                  />
                </div>

                <div className="form-group">
                  <label>Urgency</label>

                  <select
                    className="form-control"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                  >
                    {URGENCY_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Contact Number</label>

                  <input
                    className="form-control"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                  />
                </div>

                <div className="form-group">
                  <label>Reason (optional)</label>

                  <input
                    className="form-control"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Reason for request"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Create Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Requests;
