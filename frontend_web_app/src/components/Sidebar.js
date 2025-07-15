import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

// PUBLIC_INTERFACE
/**
 * Sidebar navigation for the app.
 * Modern, minimal, theme-colored sidebar.
 */
function Sidebar() {
  const { user, handleLogout } = React.useContext(AuthContext);
  return (
    <aside
      style={{
        width: 220,
        background: "var(--sidebar-bg)",
        minHeight: "100vh",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        padding: "2.5rem 1.25rem 1rem 1.25rem",
        position: "relative",
        boxShadow:
          "0 0 0 0 #fff, 1px 0 0 0 var(--border-color) inset",
      }}
    >
      <div
        style={{
          margin: "0 0 2.5rem 0",
          fontWeight: 900,
          letterSpacing: "1px",
          display: "flex",
          alignItems: "center",
          fontSize: 24,
          color: "var(--accent)",
        }}
      >
        <span
          style={{
            background: "var(--accent-bg)",
            color: "var(--sidebar-bg)",
            padding: "4px 10px",
            borderRadius: "8px 15px 8px 18px",
            fontWeight: 700,
            fontSize: 22,
            marginRight: 6,
            boxShadow: "0 1px 2px 0 #0001",
          }}
        >
          EI
        </span>
        <span style={{ color: "var(--sidebar-text)", fontWeight: 700, fontSize: 18 }}>EventImpact</span>
      </div>
      <nav style={{ flex: "none" }}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
          style={{ marginBottom: 13 }}
        >
          <span className="sidebar-icon" role="img" aria-label="dashboard">
            📊
          </span>{" "}
          <span className="sidebar-label">Dashboard</span>
        </NavLink>
        <NavLink
          to="/metrics"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
          style={{ marginBottom: 13 }}
        >
          <span className="sidebar-icon" role="img" aria-label="metrics">
            📈
          </span>{" "}
          <span className="sidebar-label">Metrics</span>
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
          style={{ marginBottom: 13 }}
        >
          <span className="sidebar-icon" role="img" aria-label="events">
            🗓️
          </span>{" "}
          <span className="sidebar-label">Events</span>
        </NavLink>
        <NavLink
          to="/spaces"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
          style={{ marginBottom: 26 }}
        >
          <span className="sidebar-icon" role="img" aria-label="spaces">
            🏢
          </span>{" "}
          <span className="sidebar-label">Spaces</span>
        </NavLink>
      </nav>
      <div style={{ flex: 1 }} />
      {user && (
        <button
          onClick={handleLogout}
          style={{
            background: "var(--button-bg)",
            color: "var(--button-text)",
            border: "none",
            borderRadius: "8px",
            padding: "9px 16px",
            fontWeight: 700,
            letterSpacing: "0px",
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 4px 0 #1d834833",
            marginTop: 10,
            transition: "background .2s",
          }}
        >
          Logout
        </button>
      )}
      <style>{`
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 7px;
          color: var(--sidebar-text);
          background: transparent;
          text-decoration: none;
          font-weight: 510;
          font-size: 15px;
          letter-spacing: .05em;
          transition: background .13s, color .18s;
          margin-left: -7px;
          margin-right: -7px;
        }
        .sidebar-item.active,
        .sidebar-item:hover,
        .sidebar-item:focus-visible {
          background: var(--accent-bg);
          color: var(--accent-text);
        }
        .sidebar-icon {
          font-size: 1.2em;
        }
        .sidebar-label {
          vertical-align: middle;
        }
      `}</style>
    </aside>
  );
}
export default Sidebar;
