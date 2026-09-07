import React from 'react';

export default function FormSection({ icon, title, subtitle, children }) {
  return (
    <section className="form-section">
      <div className="section-heading">
        <div className="section-icon">{icon}</div>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}
