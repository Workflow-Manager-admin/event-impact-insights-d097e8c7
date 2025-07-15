import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

// PUBLIC_INTERFACE
/**
 * Sidebar navigation for the app.
 * Shows main dashboards and logout button if authenticated.
 */
function Sidebar() {
  const { user, handleLogout } = React.useContext(AuthContext);
  return (
    <aside
      style={{
        width: 220,
        background: "var(--bg-secondary)",
        minHeight: "100vh",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        padding: "2rem 1rem 1rem 1rem",
      }}
    >
      <h2 style={{ margin: "0 0 2rem 0", fontWeight: 800, letterSpacing: "1px", color: "var(--text-primary)" }}>
        EventImpact
      </h2>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
        style={{ marginBottom: 14 }}
      >
        📊 Dashboard
      </NavLink>
      <NavLink
        to="/metrics"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
        style={{ marginBottom: 14 }}
      >
        📈 Metrics
      </NavLink>
      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
        style={{ marginBottom: 14 }}
      >
        🗓️ Events
      </NavLink>
      <NavLink
        to="/spaces"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
        style={{ marginBottom: 24 }}
      >
        🏢 Spaces
      </NavLink>
      <div style={{ flex: 1 }} />
      {user && (
        <button
          onClick={handleLogout}
          style={{
            background: "var(--button-bg)",
            color: "var(--button-text)",
            border: "none",
            borderRadius: "8px",
            padding: "8px 18px",
            fontWeight: 600,
            letterSpacing: "1px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
      <style>{`
        .sidebar-item {
          display: block;
          padding: 10px 18px;
          border-radius: 6px;
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          transition: background .2s, color .2s;
        }
        .sidebar-item.active, .sidebar-item:hover {
          background: var(--border-color);
          color: var(--text-secondary);
        }
      `}</style>
    </aside>
  );
}
export default Sidebar;
