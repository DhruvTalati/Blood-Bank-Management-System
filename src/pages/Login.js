import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.post("/auth/login", formData);

      if (response.data.success) {
        const { token, user } = response.data;

        localStorage.setItem("bloodBankToken", token);
        localStorage.setItem(
          "bloodBankUser",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
          }),
        );

        localStorage.setItem("bloodBankLoggedIn", "true");

        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🩸</div>

          <h1>Blood Bank Management</h1>

          <p>Administrator Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <button
          type="button"
          className="forgot-link"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default Login;
