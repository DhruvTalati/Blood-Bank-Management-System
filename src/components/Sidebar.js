import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@bloodbank.com",
    role: "Blood Bank Admin",
  });

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("bloodBankUser");

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Error loading user:", error);
        }
      }
    };

    loadUser();

    window.addEventListener("bloodBankProfileUpdated", loadUser);

    return () => {
      window.removeEventListener("bloodBankProfileUpdated", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bloodBankLoggedIn");
    localStorage.removeItem("bloodBankUser");
    localStorage.removeItem("bloodBankToken");

    navigate("/login", { replace: true });
  };

  const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">🩸</div>

        <div>
          <h4>BloodBank</h4>
          <span>Management System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-title">MAIN MENU</p>

        <NavLink to="/dashboard" className="sidebar-link">
          <span>📊</span>
          Dashboard
        </NavLink>

        <NavLink to="/donors" className="sidebar-link">
          <span>🧑‍⚕️</span>
          Donors
        </NavLink>

        <NavLink to="/inventory" className="sidebar-link">
          <span>🩸</span>
          Blood Inventory
        </NavLink>

        <NavLink to="/requests" className="sidebar-link">
          <span>📋</span>
          Blood Requests
        </NavLink>

        <p className="nav-title">MANAGEMENT</p>

        <NavLink to="/users" className="sidebar-link">
          <span>👥</span>
          Users
        </NavLink>

        <NavLink to="/reports" className="sidebar-link">
          <span>📈</span>
          Reports
        </NavLink>

        <p className="nav-title">ACCOUNT</p>

        <NavLink to="/profile" className="sidebar-link">
          <span>👤</span>
          My Profile
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          <span>⚙️</span>
          Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="admin-avatar">{avatarLetter}</div>

        <div className="admin-info">
          <strong>{user.name}</strong>
          <small>{user.role}</small>
        </div>

        <button className="logout-btn" onClick={handleLogout} title="Logout">
          🚪
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
