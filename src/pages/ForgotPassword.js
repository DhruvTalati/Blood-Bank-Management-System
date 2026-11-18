import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3.2 5.5h13.6c.4 0 .7.3.7.7v7.6c0 .4-.3.7-.7.7H3.2c-.4 0-.7-.3-.7-.7V6.2c0-.4.3-.7.7-.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3 6.2 10 11l7-4.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ForgotPassword() {
  const emailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      emailRef.current?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }

    setMessage(
      "If an account exists for this email, password reset instructions have been sent.",
    );
    setEmail("");
  };

  return (
    <div className="login-page">
      <div className="login-background-shape shape-one" />
      <div className="login-background-shape shape-two" />

      <div className="login-container login-container--solo">
        <section className="login-card" aria-labelledby="forgot-heading">
          <div className="login-header">
            <p className="login-kicker">Account recovery</p>
            <h2 id="forgot-heading">Forgot password?</h2>
            <p>
              Enter the email on your administrator account. We will send reset
              instructions if it is registered.
            </p>
          </div>

          {error && (
            <div className="login-error" role="alert">
              <span aria-hidden="true">!</span>
              {error}
            </div>
          )}

          {message && (
            <div className="login-success" role="status">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="login-form-group">
              <label htmlFor="forgot-email">Email address</label>
              <div className={`login-input-wrapper ${error ? "has-error" : ""}`}>
                <span className="input-icon">
                  <MailIcon />
                </span>
                <input
                  ref={emailRef}
                  id="forgot-email"
                  type="email"
                  autoComplete="username"
                  inputMode="email"
                  placeholder="you@hospital.org"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  aria-invalid={Boolean(error)}
                />
              </div>
            </div>

            <button type="submit" className="login-btn">
              Send reset instructions
              <span className="login-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </form>

          <p className="login-footer">
            <Link to="/login" className="login-back-link">
              ← Back to sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default ForgotPassword;
