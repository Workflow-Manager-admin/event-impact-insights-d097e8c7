import React, { useEffect, useState } from "react";
import api from "../utils/api";

// PUBLIC_INTERFACE
/**
 * MetricsPage: Shows sustainability metrics summary (coming soon)
 */
function MetricsPage() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API: GET /metrics (future, placeholder)
    api.get("/metrics")
      .then(setMetrics)
      .catch(() => setMetrics([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <h1>Metrics</h1>
      <p>Your sustainability metrics will appear here.</p>
      {loading ? <div>Loading...</div> : (
        <pre>{JSON.stringify(metrics, null, 2)}</pre>
      )}
    </div>
  );
}
export default MetricsPage;
