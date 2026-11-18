import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { IconPlus, IconSearch } from "../components/BrandIcons";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Donors() {
  const navigate = useNavigate();

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("All");

  const [selectedDonor, setSelectedDonor] = useState(null);
  const [editingDonor, setEditingDonor] = useState(null);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const showMessage = useCallback((text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, []);

  const loadDonors = useCallback(async () => {
    try {
      setLoading(true);

      const response = await API.get("/donors");

      if (response.data.success) {
        setDonors(response.data.donors);
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to load donors.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    loadDonors();
  }, [loadDonors]);

  const deleteDonor = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this donor?",
    );

    if (!confirmed) return;

    try {
      const response = await API.delete(`/donors/${id}`);

      if (response.data.success) {
        await loadDonors();
        showMessage("Donor deleted successfully.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to delete donor.",
        "error",
      );
    }
  };

  const openEdit = (donor) => {
    setEditingDonor({ ...donor });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingDonor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await API.put(`/donors/${editingDonor._id}`, {
        name: editingDonor.name,
        mobile: editingDonor.mobile,
        email: editingDonor.email,
        bloodGroup: editingDonor.bloodGroup,
        dateOfBirth: editingDonor.dateOfBirth,
        city: editingDonor.city,
      });

      if (response.data.success) {
        setEditingDonor(null);
        loadDonors();
        showMessage("Donor updated successfully.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to update donor.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const filteredDonors = donors.filter((donor) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      donor.name?.toLowerCase().includes(searchText) ||
      donor.email?.toLowerCase().includes(searchText) ||
      donor.mobile?.includes(searchText);

    const matchesBloodGroup =
      bloodGroup === "All" || donor.bloodGroup === bloodGroup;

    return matchesSearch && matchesBloodGroup;
  });

  return (
    <div className="donors-page">
      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <p className="page-kicker">Registry</p>
          <h1>Donors</h1>
          <p>Search, review, and maintain registered blood donors.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/donors/register")}
        >
          <IconPlus />
          Add donor
        </button>
      </div>

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

      <div className="dashboard-cards donor-stats">
        <div className="dashboard-card">
          <div className="card-icon card-icon-donors">DR</div>

          <div>
            <span>Total Donors</span>
            <h3>{donors.length}</h3>
            <small>Registered donors</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-blood">BG</div>

          <div>
            <span>Blood Groups</span>

            <h3>
              {
                new Set(donors.map((donor) => donor.bloodGroup).filter(Boolean))
                  .size
              }
            </h3>

            <small>Different groups</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-pending">7D</div>

          <div>
            <span>Recent Donors</span>

            <h3>
              {
                donors.filter((donor) => {
                  if (!donor.createdAt) return false;

                  const difference =
                    new Date().getTime() - new Date(donor.createdAt).getTime();

                  return difference <= 7 * 24 * 60 * 60 * 1000;
                }).length
              }
            </h3>

            <small>Last 7 days</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-ok">ON</div>

          <div>
            <span>Active Donors</span>
            <h3>
              {donors.filter((donor) => donor.status !== "Inactive").length}
            </h3>
            <small>Available donors</small>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="donor-toolbar">
        <div className="search-box">
          <IconSearch />
          <input
            type="text"
            placeholder="Search by name, email or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="blood-filter"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="All">All Blood Groups</option>

          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}

      <div className="donor-table-container">
        <div className="panel-header">
          <h4>Registered Donors</h4>

          <span>
            {filteredDonors.length} donor
            {filteredDonors.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="dashboard-empty">
            <p>Loading donors...</p>
          </div>
        ) : filteredDonors.length === 0 ? (
          <div className="empty-donors">
            <div className="empty-icon">+</div>

            <h4>No donors found</h4>

            <p>
              {donors.length === 0
                ? "Start by registering your first donor."
                : "Try changing your search or filter."}
            </p>

            {donors.length === 0 && (
              <button
                className="primary-btn"
                onClick={() => navigate("/donors/register")}
              >
                Register First Donor
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="donor-table">
              <thead>
                <tr>
                  <th>DONOR</th>
                  <th>CONTACT</th>
                  <th>BLOOD GROUP</th>
                  <th>CITY</th>
                  <th>REGISTERED</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonors.map((donor) => (
                  <tr key={donor._id}>
                    <td>
                      <div className="donor-name-cell">
                        <div className="donor-avatar">
                          {donor.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{donor.name}</strong>

                          <small>ID: {donor.donorId}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong className="contact-text">{donor.mobile}</strong>

                      <small className="email-text">{donor.email}</small>
                    </td>

                    <td>
                      <span className="blood-badge">{donor.bloodGroup}</span>
                    </td>

                    <td>{donor.city || "—"}</td>

                    <td>
                      {donor.createdAt
                        ? new Date(donor.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <div className="table-actions">
                        {/* VIEW */}

                        <button
                          className="action-btn"
                          title="View donor"
                          onClick={() => setSelectedDonor(donor)}
                        >
                          👁️
                        </button>

                        {/* EDIT */}

                        <button
                          className="action-btn"
                          title="Edit donor"
                          onClick={() => openEdit(donor)}
                        >
                          ✏️
                        </button>

                        {/* DELETE */}

                        <button
                          className="action-btn delete"
                          title="Delete donor"
                          onClick={() => deleteDonor(donor._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VIEW DONOR MODAL */}

      {selectedDonor && (
        <div className="modal-overlay" onClick={() => setSelectedDonor(null)}>
          <div className="donor-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Donor Details</h3>

              <button
                className="modal-close"
                onClick={() => setSelectedDonor(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-profile">
              <div className="large-donor-avatar">
                {selectedDonor.name?.charAt(0).toUpperCase()}
              </div>

              <h3>{selectedDonor.name}</h3>

              <span className="blood-badge">{selectedDonor.bloodGroup}</span>
            </div>

            <div className="donor-details-grid">
              <div>
                <small>Donor ID</small>
                <strong>{selectedDonor.donorId}</strong>
              </div>

              <div>
                <small>Mobile</small>
                <strong>{selectedDonor.mobile}</strong>
              </div>

              <div>
                <small>Email</small>
                <strong>{selectedDonor.email || "—"}</strong>
              </div>

              <div>
                <small>Date of Birth</small>
                <strong>
                  {selectedDonor.dateOfBirth
                    ? new Date(selectedDonor.dateOfBirth).toLocaleDateString()
                    : "—"}
                </strong>
              </div>

              <div>
                <small>City</small>
                <strong>{selectedDonor.city || "—"}</strong>
              </div>

              <div>
                <small>Registered</small>
                <strong>
                  {selectedDonor.createdAt
                    ? new Date(selectedDonor.createdAt).toLocaleDateString()
                    : "—"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT DONOR MODAL */}

      {editingDonor && (
        <div className="modal-overlay">
          <div className="donor-modal">
            <div className="modal-header">
              <h3>Edit Donor</h3>

              <button
                className="modal-close"
                onClick={() => setEditingDonor(null)}
              >
                ×
              </button>
            </div>

            <form onSubmit={saveEdit}>
              <div className="edit-form-grid">
                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    className="form-control"
                    name="name"
                    value={editingDonor.name || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mobile</label>

                  <input
                    className="form-control"
                    name="mobile"
                    value={editingDonor.mobile || ""}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>

                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={editingDonor.email || ""}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label>Blood Group</label>

                  <select
                    className="form-control"
                    name="bloodGroup"
                    value={editingDonor.bloodGroup || ""}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="">Select</option>

                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>

                  <input
                    className="form-control"
                    type="date"
                    name="dateOfBirth"
                    value={
                      editingDonor.dateOfBirth
                        ? editingDonor.dateOfBirth.substring(0, 10)
                        : ""
                    }
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>

                  <input
                    className="form-control"
                    name="city"
                    value={editingDonor.city || ""}
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setEditingDonor(null)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Donors;
