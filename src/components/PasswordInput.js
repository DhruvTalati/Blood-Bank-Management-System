import React, { useState } from "react";

function PasswordInput({ label, name, value, onChange, placeholder, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <div className="password-input-wrapper">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-control ${error ? "is-invalid" : ""}`}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && <div className="field-error">{error}</div>}
    </div>
  );
}

export default PasswordInput;
