import React, { useEffect, useState, useCallback } from "react";
import API from "../api/api";
import { IconPlus } from "../components/BrandIcons";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("bloodBankUser") || "{}");
  } catch (error) {
    return {};
  }
}

function Users() {
  const currentUser = getCurrentUser();
  const isAdmin = currentUser.role === "Administrator";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "/",
    email: "",
    password: "",
    role: "Staff",
    status: "Active",
  });

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setPageError("");

      const response = await API.get("/users");

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      setPageError(error.response?.data?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    } else {
      setLoading(false);
    }
  }, [isAdmin, loadUsers]);
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Staff",
      status: "Active",
    });

    setFormError("");
    setEditingUser(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  };

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormError("Please enter the user's name.");
      return;
    }

    if (!formData.email.trim()) {
      setFormError("Please enter the user's email.");
      return;
    }

    if (!editingUser && !formData.password) {
      setFormError("Please set a password for the new user.");
      return;
    }

    try {
      setSaving(true);

      if (editingUser) {
        const payload = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        };

        if (formData.password) {
          payload.password = formData.password;
        }

        const response = await API.put(`/users/${editingUser._id}`, payload);

        if (response.data.success) {
          resetForm();
          loadUsers();
          showMessage("User updated successfully.");
        }
      } else {
        const response = await API.post("/users", formData);

        if (response.data.success) {
          resetForm();
          loadUsers();
          showMessage("User added successfully.");
        }
      }
    } catch (error) {
      setFormError(
        error.response?.data?.message || "Unable to save this user.",
      );
    } finally {
      setSaving(false);
    }
  };

  const editUser = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });

    setShowForm(true);
  };

  const deleteUser = async (user) => {
    if (user._id === currentUser.id) {
      showMessage("You cannot delete your own account.");
      return;
    }

    const confirmed = window.confirm(`Delete ${user.name}?`);

    if (!confirmed) return;

    try {
      const response = await API.delete(`/users/${user._id}`);

      if (response.data.success) {
        loadUsers();
        showMessage("User deleted successfully.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to delete this user.",
      );
    }
  };

  const toggleStatus = async (user) => {
    try {
      const response = await API.put(`/users/${user._id}`, {
        status: user.status === "Active" ? "Inactive" : "Active",
      });

      if (response.data.success) {
        loadUsers();
        showMessage("User status updated.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Unable to update user status.",
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText)
    );
  });

  if (!isAdmin) {
    return (
      <div className="page-container">
        <div className="page-header">
          <div>
            <p className="page-kicker">Administration</p>
            <h1>Users</h1>
            <p>Staff and administrator accounts are managed here.</p>
          </div>
        </div>

        <div className="page-placeholder">
          <h2>Administrator access required</h2>
          <p>
            User management is restricted to Administrator accounts. Sign in
            with an administrator account to view and manage users.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <p className="page-kicker">Administration</p>
          <h1>Users</h1>
          <p>Manage administrators and staff accounts.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <IconPlus />
          Add user
        </button>
      </div>

      {/* MESSAGE */}

      {message && <div className="success-banner">✓ {message}</div>}
      {pageError && <div className="request-message error">{pageError}</div>}

      {/* USER STATISTICS */}

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon card-icon-donors">US</div>

          <div>
            <span>Total Users</span>
            <h3>{users.length}</h3>
            <small>Registered accounts</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-ok">ON</div>

          <div>
            <span>Active Users</span>

            <h3>{users.filter((user) => user.status === "Active").length}</h3>

            <small>Currently active</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-alert">AD</div>

          <div>
            <span>Administrators</span>

            <h3>
              {users.filter((user) => user.role === "Administrator").length}
            </h3>

            <small>Admin accounts</small>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon card-icon-pending">ST</div>

          <div>
            <span>Staff</span>

            <h3>{users.filter((user) => user.role === "Staff").length}</h3>

            <small>Staff accounts</small>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="user-toolbar donor-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* USERS TABLE */}

      <div className="user-table-container">
        <div className="panel-header">
          <h4>User Accounts</h4>

          <span>
            {filteredUsers.length} user
            {filteredUsers.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="dashboard-empty">
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="dashboard-empty">
            <p>No users found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>USER</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{user.name}</strong>

                          <small>{user._id}</small>
                        </div>
                      </div>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <span className="role-badge">{user.role}</span>
                    </td>

                    <td>
                      <button
                        className={`user-status ${user.status.toLowerCase()}`}
                        onClick={() => toggleStatus(user)}
                      >
                        ● {user.status}
                      </button>
                    </td>

                    <td>
                      <div className="user-actions">
                        <button
                          className="action-btn"
                          onClick={() => editUser(user)}
                          title="Edit user"
                        >
                          ✏️
                        </button>

                        <button
                          className="action-btn delete"
                          onClick={() => deleteUser(user)}
                          title="Delete user"
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

      {/* ADD / EDIT USER MODAL */}

      {showForm && (
        <div className="modal-overlay">
          <div className="donor-modal">
            <div className="modal-header">
              <h3>{editingUser ? "Edit User" : "Add New User"}</h3>

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
                  <label>Full Name</label>

                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    {editingUser
                      ? "New Password (leave blank to keep current)"
                      : "Password"}
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                      editingUser
                        ? "Leave blank to keep current"
                        : "Set a password"
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Role</label>

                  <select
                    className="form-control"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="Staff">Staff</option>

                    <option value="Administrator">Administrator</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    className="form-control"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>

                    <option value="Inactive">Inactive</option>
                  </select>
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

                <button type="submit" className="primary-btn" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : editingUser
                      ? "Save Changes"
                      : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
