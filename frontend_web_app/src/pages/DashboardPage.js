import React, { useEffect, useState } from "react";
import api from "../utils/api";

// PUBLIC_INTERFACE
/**
 * DashboardPage: Main landing dashboard after login
 */
function DashboardPage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // API: GET /users/me or similar (fetch own user info for greeting)
    api.get("/users/me")
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div
      style={{
        maxWidth: 540,
        margin: "0 auto",
        background: "var(--card-bg)",
        borderRadius: 14,
        boxShadow: "var(--card-shadow)",
        padding: "2.5rem 2rem 2rem 2rem",
        textAlign: "left",
      }}
    >
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "var(--primary)",
          margin: "0 0 22px 0",
        }}
      >
        Welcome{user && user.username ? `, ${user.username}` : ""}!
      </h1>
      <p
        style={{
          fontSize: 18,
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          marginBottom: 18,
        }}
      >
        This is your <span style={{ color: "var(--secondary)", fontWeight: 700 }}>sustainability event dashboard</span>. <br />
        Select a section from the sidebar or see your latest metrics and events here (coming soon).
      </p>
      {loading && (
        <div style={{ color: "var(--secondary)" }}>Loading...</div>
      )}
    </div>
  );
}
export default DashboardPage;
