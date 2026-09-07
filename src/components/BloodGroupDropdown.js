import React from 'react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function BloodGroupDropdown({ value, onChange, error }) {
  return (
    <div className="form-field">
      <label htmlFor="bloodGroup" className="form-label">
        Blood Group <span className="required">*</span>
      </label>
      <select
        id="bloodGroup"
        name="bloodGroup"
        value={value}
        onChange={onChange}
        className={`form-select ${error ? 'is-invalid' : ''}`}
        aria-invalid={Boolean(error)}
      >
        <option value="">Select blood group</option>
        {BLOOD_GROUPS.map((group) => (
          <option key={group} value={group}>{group}</option>
        ))}
      </select>
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}
