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
    <div
      style={{
        maxWidth: 540,
        margin: "0 auto",
        background: "var(--card-bg)",
        borderRadius: 13,
        boxShadow: "var(--card-shadow)",
        padding: "2.2rem 1.7rem 1.6rem 1.7rem",
        textAlign: "left",
      }}
    >
      <h1 style={{ fontWeight: 800, color: "var(--primary)", fontSize: 26, margin: "0 0 18px 0" }}>
        Metrics
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: 17, marginBottom: 24 }}>
        Your sustainability metrics summary will appear here.
      </p>
      {loading ? (
        <div style={{ color: "var(--secondary)" }}>Loading...</div>
      ) : (
        <pre style={{
          background: "var(--bg-secondary)",
          color: "var(--primary)",
          padding: "16px 14px",
          borderRadius: 6,
          fontSize: 15,
          fontFamily: "Menlo, monospace",
          border: "1px solid var(--border-color)",
          minHeight: 38,
        }}>{JSON.stringify(metrics, null, 2)}</pre>
      )}
    </div>
  );
}
export default MetricsPage;
