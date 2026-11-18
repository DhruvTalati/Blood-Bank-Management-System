import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DropIcon,
  IconDashboard,
  IconDonors,
  IconInventory,
  IconLogout,
  IconProfile,
  IconReports,
  IconRequests,
  IconSettings,
  IconUsers,
} from "./BrandIcons";

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
        <div className="brand-icon" aria-hidden="true">
          <DropIcon className="login-drop-icon" />
        </div>

        <div>
          <h4>LifeLine</h4>
          <span>Blood Bank Console</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-title">Main menu</p>

        <NavLink to="/dashboard" className="sidebar-link">
          <span className="nav-icon">
            <IconDashboard />
          </span>
          Dashboard
        </NavLink>

        <NavLink to="/donors" className="sidebar-link">
          <span className="nav-icon">
            <IconDonors />
          </span>
          Donors
        </NavLink>

        <NavLink to="/inventory" className="sidebar-link">
          <span className="nav-icon">
            <IconInventory />
          </span>
          Inventory
        </NavLink>

        <NavLink to="/requests" className="sidebar-link">
          <span className="nav-icon">
            <IconRequests />
          </span>
          Requests
        </NavLink>

        <p className="nav-title">Management</p>

        <NavLink to="/users" className="sidebar-link">
          <span className="nav-icon">
            <IconUsers />
          </span>
          Users
        </NavLink>

        <NavLink to="/reports" className="sidebar-link">
          <span className="nav-icon">
            <IconReports />
          </span>
          Reports
        </NavLink>

        <p className="nav-title">Account</p>

        <NavLink to="/profile" className="sidebar-link">
          <span className="nav-icon">
            <IconProfile />
          </span>
          My profile
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          <span className="nav-icon">
            <IconSettings />
          </span>
          Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="admin-avatar">{avatarLetter}</div>

        <div className="admin-info">
          <strong>{user.name}</strong>
          <small>{user.role}</small>
        </div>

        <button className="logout-btn" onClick={handleLogout} title="Sign out">
          <IconLogout />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
