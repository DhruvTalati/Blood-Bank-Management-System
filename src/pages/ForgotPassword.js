import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setMessage("Password reset instructions have been sent to your email.");

    setEmail("");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🔐</div>

        <h2>Forgot Password?</h2>

        <p>
          Enter your registered email address and we will help you reset your
          password.
        </p>

        {error && <div className="request-message error">{error}</div>}

        {message && <div className="request-message success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="primary-btn full-width">
            Send Reset Instructions
          </button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <Link
            to="/login"
            style={{
              color: "#dc2626",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
