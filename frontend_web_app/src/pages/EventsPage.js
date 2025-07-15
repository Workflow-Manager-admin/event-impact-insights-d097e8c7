import React, { useEffect, useState } from "react";
import api from "../utils/api";

// PUBLIC_INTERFACE
/**
 * EventsPage: Shows event list and allows event actions
 */
function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API: GET /events (future)
    api.get("/events")
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "0 auto",
        background: "var(--card-bg)",
        borderRadius: 12,
        boxShadow: "var(--card-shadow)",
        padding: "2.2rem 1.7rem 1.8rem 1.7rem",
        textAlign: "left"
      }}
    >
      <h1 style={{ fontWeight: 800, color: "var(--secondary)", fontSize: 26, margin: "0 0 20px 0" }}>
        Events
      </h1>
      <div>
        {loading ? (
          <div style={{ color: "var(--primary)" }}>Loading...</div>
        ) : events.length === 0 ? (
          <div style={{ color: "var(--text-secondary)" }}>No events available yet.</div>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {events.map((e) => (
              <li
                key={e.id}
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 7,
                  padding: "14px 18px",
                  fontWeight: 500,
                  fontSize: 16,
                  color: "var(--text-primary)",
                  marginBottom: 13,
                  transition: "background .15s,box-shadow .2s",
                  boxShadow: "0 1px 4px #1d834811",
                  cursor: "pointer"
                }}
                onMouseOver={e => (e.target.style.background = "var(--accent-bg)")}
                onMouseOut={e => (e.target.style.background = "var(--bg-secondary)")}
              >
                {e.name || <span style={{ color: "var(--secondary)" }}>Untitled Event</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default EventsPage;
