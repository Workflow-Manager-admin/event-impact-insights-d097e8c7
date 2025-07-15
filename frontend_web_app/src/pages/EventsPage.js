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
    <div>
      <h1>Events</h1>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {events.length === 0 ? (
              <div>No events available yet.</div>
            ) : (
              <ul>
                {events.map((e) => (
                  <li key={e.id}>
                    {e.name || "Untitled Event"}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default EventsPage;
