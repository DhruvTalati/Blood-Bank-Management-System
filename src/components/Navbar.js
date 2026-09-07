import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Admin",
    role: "Administrator",
  });

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = JSON.parse(
          localStorage.getItem("bloodBankUser") || "null",
        );

        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error("Error loading user:", error);
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
    <header className="main-navbar">
      <div>
        <h5>Blood Bank Management</h5>
        <p>Manage donors, inventory and blood requests</p>
      </div>

      <div className="navbar-actions">
        <button className="notification-btn" title="Notifications">
          🔔
          <span className="notification-dot"></span>
        </button>

        <div className="navbar-user">
          <div className="user-avatar">{avatarLetter}</div>

          <div className="user-info">
            <strong>{user.name}</strong>
            <small>{user.role}</small>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout} title="Logout">
          🚪
        </button>
      </div>
    </header>
  );
}

export default Navbar;
