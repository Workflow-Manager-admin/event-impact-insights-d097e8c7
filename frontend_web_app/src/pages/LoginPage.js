import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../App";

// PUBLIC_INTERFACE
/**
 * LoginPage: login form for user authentication
 */
function LoginPage() {
  const { handleLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(undefined);
    try {
      // API: POST /auth/login
      const data = await api.post("/auth/login", {
        username: form.username,
        password: form.password,
      });
      if (data && data.token) {
        handleLogin(data.token, form.username);
        navigate("/dashboard");
      } else {
        setError("Login failed. Invalid credentials?");
      }
    } catch (err) {
      setError(err.message || "Error logging in.");
    }
    setLoading(false);
  }
  function onInput(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  return (
    <div
      style={{
        maxWidth: 320,
        margin: "7vh auto",
        background: "var(--bg-secondary)",
        borderRadius: 8,
        padding: 32,
        boxShadow: "0 4px 32px 0 #0001",
      }}
    >
      <h2 style={{ marginBottom: 32 }}>Sign In</h2>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={onInput}
          autoFocus
          required
          style={{
            width: "100%",
            marginBottom: 16,
            padding: 10,
            borderRadius: 4,
            border: "1px solid var(--border-color)",
            fontSize: 15,
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onInput}
          required
          style={{
            width: "100%",
            marginBottom: 20,
            padding: 10,
            borderRadius: 4,
            border: "1px solid var(--border-color)",
            fontSize: 15,
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 0",
            background: "var(--button-bg)",
            color: "var(--button-text)",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 10,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div style={{ fontSize: 13, marginTop: 10 }}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
        {error && (
          <div style={{ color: "red", fontSize: 14, marginTop: 14, textAlign: "center" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
export default LoginPage;
