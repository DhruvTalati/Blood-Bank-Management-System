import React from 'react';

export default function FormSection({ icon, title, subtitle, children }) {
  return (
    <section className="form-section">
      <div className="section-heading">
        {icon ? <div className="section-icon">{icon}</div> : null}
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}
