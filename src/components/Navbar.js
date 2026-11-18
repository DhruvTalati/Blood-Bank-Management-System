import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconBell, IconLogout } from "./BrandIcons";

const PAGE_META = {
  "/dashboard": ["Operations", "Command center for donors, stock, and requests"],
  "/donors": ["Donor registry", "Search, review, and maintain donor records"],
  "/donors/register": ["Donor registry", "Register a new blood donor"],
  "/inventory": ["Stock control", "Live units by blood group"],
  "/requests": ["Hospital workflow", "Review and fulfil transfusion requests"],
  "/users": ["Administration", "Staff and administrator accounts"],
  "/reports": ["Insights", "Printable operational summary"],
  "/profile": ["Your account", "Name, email, and assigned role"],
  "/settings": ["Preferences", "Appearance and notification options"],
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [kicker, subtitle] =
    PAGE_META[location.pathname] || PAGE_META["/dashboard"];

  return (
    <header className="main-navbar">
      <div>
        <p className="navbar-kicker">{kicker}</p>
        <h5>LifeLine Blood Bank</h5>
        <p>{subtitle}</p>
      </div>

      <div className="navbar-actions">
        <button className="icon-btn" title="Notifications">
          <IconBell />
          <span className="notification-dot"></span>
        </button>

        <div className="navbar-user">
          <div className="user-avatar">{avatarLetter}</div>

          <div className="user-info">
            <strong>{user.name}</strong>
            <small>{user.role}</small>
          </div>
        </div>

        <button className="icon-btn" onClick={handleLogout} title="Sign out">
          <IconLogout />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
