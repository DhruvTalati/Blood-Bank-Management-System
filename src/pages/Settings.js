import React, { useEffect, useState } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("bloodBankDarkMode") === "true";

    const savedNotifications = localStorage.getItem("bloodBankNotifications");

    setDarkMode(savedDarkMode);

    if (savedNotifications !== null) {
      setNotifications(savedNotifications === "true");
    }

    applyTheme(savedDarkMode);
  }, []);

  const applyTheme = (enabled) => {
    if (enabled) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const handleThemeChange = (enabled) => {
    setDarkMode(enabled);

    localStorage.setItem("bloodBankDarkMode", enabled.toString());

    applyTheme(enabled);

    showMessage(enabled ? "Dark mode enabled." : "Light mode enabled.");
  };

  const handleNotificationChange = (enabled) => {
    setNotifications(enabled);

    localStorage.setItem("bloodBankNotifications", enabled.toString());

    showMessage(enabled ? "Notifications enabled." : "Notifications disabled.");
  };

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleReset = () => {
    setDarkMode(false);
    setNotifications(true);

    localStorage.setItem("bloodBankDarkMode", "false");

    localStorage.setItem("bloodBankNotifications", "true");

    applyTheme(false);

    showMessage("Settings restored to default.");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <p className="page-kicker">Preferences</p>
          <h1>Settings</h1>
          <p>Appearance, alerts, and application details.</p>
        </div>
      </div>

      {message && <div className="success-banner">✓ {message}</div>}

      <div className="settings-grid">
        {/* APPEARANCE */}

        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">Aa</div>

            <div>
              <h3>Appearance</h3>
              <p>Customize the appearance of the application.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Dark Mode</strong>

              <span>Use a darker interface for comfortable viewing.</span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => handleThemeChange(e.target.checked)}
              />

              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* NOTIFICATIONS */}

        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">!</div>

            <div>
              <h3>Notifications</h3>
              <p>Control application notification preferences.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Enable Notifications</strong>

              <span>
                Receive alerts for important blood requests and system updates.
              </span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => handleNotificationChange(e.target.checked)}
              />

              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* SYSTEM INFORMATION */}

        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">i</div>

            <div>
              <h3>System Information</h3>
              <p>Basic information about this application.</p>
            </div>
          </div>

          <div className="system-info">
            <div>
              <span>Application</span>
              <strong>Blood Bank Management System</strong>
            </div>

            <div>
              <span>Technology</span>
              <strong>MERN Stack</strong>
            </div>

            <div>
              <span>Version</span>
              <strong>1.0.0</strong>
            </div>
          </div>
        </div>

        {/* RESET */}

        <div className="settings-card danger-card">
          <div className="settings-card-header">
            <div className="settings-icon">↺</div>

            <div>
              <h3>Reset Settings</h3>
              <p>
                Restore all application preferences to their default values.
              </p>
            </div>
          </div>

          <button className="secondary-btn" onClick={handleReset}>
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
