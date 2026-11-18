import React, { useEffect, useState } from "react";
import API from "../api/api";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await API.get("/auth/me");

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      // Fall back to whatever was cached from login so the page still
      // renders something useful if the profile fetch itself fails.
      const cached = localStorage.getItem("bloodBankUser");

      if (cached) {
        setUser(JSON.parse(cached));
      }

      setError(err.response?.data?.message || "Unable to load your profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const response = await API.put("/auth/me", {
        name: user.name,
        email: user.email,
      });

      if (response.data.success) {
        const updatedUser = response.data.user;

        setUser(updatedUser);

        // Keep the cached copy (used by Sidebar/Navbar) in sync.
        const cached = JSON.parse(
          localStorage.getItem("bloodBankUser") || "{}",
        );

        localStorage.setItem(
          "bloodBankUser",
          JSON.stringify({ ...cached, ...updatedUser }),
        );

        window.dispatchEvent(new Event("bloodBankProfileUpdated"));

        setIsEditing(false);
        setMessage("Profile updated successfully.");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <div>
            <p className="page-kicker">Account</p>
            <h1>My profile</h1>
            <p>Manage your signed-in account.</p>
          </div>
        </div>

        <div className="dashboard-empty">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <p className="page-kicker">Account</p>
          <h1>My profile</h1>
          <p>Manage your signed-in account details.</p>
        </div>

        {!isEditing && (
          <button className="primary-btn" onClick={() => setIsEditing(true)}>
            Edit profile
          </button>
        )}
      </div>

      {message && <div className="success-banner">✓ {message}</div>}
      {error && <div className="request-message error">{error}</div>}

      <div className="profile-grid">
        {/* PROFILE CARD */}

        <div className="profile-card">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>

          <h2>{user.name || "Admin"}</h2>

          <p>{user.email}</p>

          <span className="status-badge active">{user.status || "Active"}</span>
        </div>

        {/* DETAILS */}

        <div className="profile-details-card">
          <div className="card-header">
            <div>
              <h3>Account Information</h3>
              <p>Your registered account details</p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                className="form-control"
                value={user.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Role</label>

              <input
                type="text"
                name="role"
                className="form-control"
                value={user.role || ""}
                disabled
              />
            </div>

            {isEditing && (
              <div className="profile-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    loadProfile();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
