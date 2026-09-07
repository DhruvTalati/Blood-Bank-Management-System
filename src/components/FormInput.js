import React from 'react';

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error,
  help,
  disabled = false,
}) {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : help ? `${name}-help` : undefined}
      />
      {error ? (
        <div id={`${name}-error`} className="field-error">{error}</div>
      ) : help ? (
        <div id={`${name}-help`} className="field-help">{help}</div>
      ) : null}
    </div>
  );
}
