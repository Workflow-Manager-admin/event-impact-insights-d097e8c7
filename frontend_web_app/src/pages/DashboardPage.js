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
    <div>
      <h1>Welcome{user && user.username ? `, ${user.username}` : ""}!</h1>
      <p>
        This is your sustainability event dashboard. Select a section from the sidebar or view your recent events and metrics below (coming soon).
      </p>
      {loading && <div>Loading...</div>}
    </div>
  );
}
export default DashboardPage;
