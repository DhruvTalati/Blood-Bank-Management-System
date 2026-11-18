import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const REMEMBER_EMAIL_KEY = "bloodBankRememberEmail";

function DropIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 3.2c.4 0 .8.2 1.1.6 3.5 4.6 8.4 10.2 8.4 15.4 0 5.2-4.2 9.2-9.5 9.2S6.5 24.4 6.5 19.2c0-5.2 4.9-10.8 8.4-15.4.3-.4.7-.6 1.1-.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

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

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="9"
        width="12"
        height="8"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7 9V6.6a3 3 0 0 1 6 0V9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ off }) {
  if (off) {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M3 3.5 17 16.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.2 7.1A3.2 3.2 0 0 1 12.8 12M4.2 6.4C2.8 7.6 2 9 2 10c0 0 2.7 5.5 8 5.5 1.3 0 2.5-.3 3.5-.9M15.7 13.4C17.1 12.2 18 10.8 18 10c0 0-2.7-5.5-8-5.5-.7 0-1.4.1-2 .3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2 10s2.7-5.5 8-5.5S18 10 18 10s-2.7 5.5-8 5.5S2 10 2 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const savedEmail = (() => {
    try {
      return localStorage.getItem(REMEMBER_EMAIL_KEY) || "";
    } catch (err) {
      return "";
    }
  })();

  const [formData, setFormData] = useState({
    email: savedEmail,
    password: "",
  });
  const [rememberEmail, setRememberEmail] = useState(Boolean(savedEmail));
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (savedEmail) {
      document.getElementById("login-password")?.focus();
    } else {
      emailRef.current?.focus();
    }
  }, [savedEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const detectCapsLock = (e) => {
    if (typeof e.getModifierState === "function") {
      setCapsLockOn(e.getModifierState("CapsLock"));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "That email address does not look valid.";
    }

    if (!formData.password) {
      nextErrors.password = "Enter your password.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setError("Please correct the highlighted fields and try again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

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

        if (rememberEmail) {
          localStorage.setItem(REMEMBER_EMAIL_KEY, formData.email.trim());
        } else {
          localStorage.removeItem(REMEMBER_EMAIL_KEY);
        }

        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background-shape shape-one" />
      <div className="login-background-shape shape-two" />
      <div className="login-background-shape shape-three" />

      <div className="login-container">
        <aside className="login-brand-panel">
          <div className="login-brand-mark">
            <DropIcon className="login-drop-icon" />
          </div>

          <p className="login-eyebrow">LifeLine Network</p>
          <h1>Blood Bank Management</h1>
          <p className="login-brand-copy">
            A secure operations console for donor records, live inventory, and
            transfusion requests — built for hospital and blood-bank teams.
          </p>

          <ul className="login-features">
            <li>
              <span aria-hidden="true">01</span>
              Real-time blood group inventory
            </li>
            <li>
              <span aria-hidden="true">02</span>
              Donor and request workflows
            </li>
            <li>
              <span aria-hidden="true">03</span>
              Role-based administrator access
            </li>
          </ul>
        </aside>

        <section className="login-card" aria-labelledby="login-heading">
          <div className="mobile-login-logo" aria-hidden="true">
            <DropIcon className="login-drop-icon" />
          </div>

          <div className="login-header">
            <p className="login-kicker">Administrator access</p>
            <h2 id="login-heading">Welcome back</h2>
            <p>Sign in with your authorized credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="login-error" role="alert">
                <span aria-hidden="true">!</span>
                {error}
              </div>
            )}

            <div className="login-form-group">
              <label htmlFor="login-email">Email address</label>
              <div
                className={`login-input-wrapper ${fieldErrors.email ? "has-error" : ""}`}
              >
                <span className="input-icon">
                  <MailIcon />
                </span>
                <input
                  ref={emailRef}
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="username"
                  inputMode="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@hospital.org"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={
                    fieldErrors.email ? "login-email-error" : undefined
                  }
                  disabled={loading}
                />
              </div>
              {fieldErrors.email && (
                <p id="login-email-error" className="login-field-error">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="login-form-group">
              <div className="password-label-row">
                <label htmlFor="login-password">Password</label>
                <button
                  type="button"
                  className="login-forgot-inline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>

              <div
                className={`login-input-wrapper ${fieldErrors.password ? "has-error" : ""}`}
              >
                <span className="input-icon">
                  <LockIcon />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyUp={detectCapsLock}
                  onKeyDown={detectCapsLock}
                  placeholder="Enter your password"
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={
                    [
                      fieldErrors.password ? "login-password-error" : null,
                      capsLockOn ? "login-caps-hint" : null,
                    ]
                      .filter(Boolean)
                      .join(" ") || undefined
                  }
                  disabled={loading}
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
              {capsLockOn && (
                <p id="login-caps-hint" className="login-caps-hint">
                  Caps Lock is on
                </p>
              )}
              {fieldErrors.password && (
                <p id="login-password-error" className="login-field-error">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberEmail}
                  onChange={(e) => setRememberEmail(e.target.checked)}
                  disabled={loading}
                />
                Remember email on this device
              </label>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="login-spinner" />
                  Signing in
                </>
              ) : (
                <>
                  Sign in
                  <span className="login-arrow" aria-hidden="true">
                    →
                  </span>
                </>
              )}
            </button>
          </form>

          <p className="login-footer">
            Authorized personnel only
            <span aria-hidden="true">·</span>
            Session encrypted
          </p>
        </section>
      </div>
    </div>
  );
}

export default Login;
