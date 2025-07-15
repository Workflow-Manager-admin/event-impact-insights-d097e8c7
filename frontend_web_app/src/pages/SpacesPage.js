import React from "react";

// PUBLIC_INTERFACE
/**
 * SpacesPage: List of spaces (coming soon)
 */
function SpacesPage() {
  return (
    <div
      style={{
        maxWidth: 540,
        margin: "0 auto",
        background: "var(--card-bg)",
        borderRadius: 13,
        boxShadow: "var(--card-shadow)",
        padding: "2.1rem 1.5rem 1.7rem 1.5rem",
        textAlign: "left",
      }}
    >
      <h1 style={{ fontWeight: 800, color: "var(--secondary)", fontSize: 26, margin: "0 0 19px 0" }}>
        Spaces
      </h1>
      <p style={{ fontSize: 17, color: "var(--text-secondary)" }}>
        Manage your event spaces here (feature coming soon).
      </p>
    </div>
  );
}
export default SpacesPage;
