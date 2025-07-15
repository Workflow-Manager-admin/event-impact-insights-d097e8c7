import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../App";

// PUBLIC_INTERFACE
/**
 * LoginPage: login form for user authentication with modern/minimal UI and new theme colors
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
        maxWidth: 340,
        margin: "8vh auto",
        background: "var(--card-bg)",
        borderRadius: 10,
        padding: 36,
        boxShadow: "var(--card-shadow)",
        textAlign: "left",
      }}
    >
      <h2 style={{
        marginBottom: 34,
        color: "var(--primary)",
        fontWeight: 800,
        letterSpacing: ".01em",
        fontSize: "1.7em"
      }}>
        Sign In
      </h2>
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
            borderRadius: 5,
            border: "1.2px solid var(--border-color)",
            fontSize: 15,
            background: "var(--input-bg)",
            transition: "border 0.18s",
            outline: "none",
          }}
          onFocus={e => (e.target.style.border = "1.5px solid var(--accent)")}
          onBlur={e => (e.target.style.border = "1.2px solid var(--border-color)")}
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
            marginBottom: 22,
            padding: 10,
            borderRadius: 5,
            border: "1.2px solid var(--border-color)",
            fontSize: 15,
            background: "var(--input-bg)",
            transition: "border 0.18s",
            outline: "none",
          }}
          onFocus={e => (e.target.style.border = "1.5px solid var(--accent)")}
          onBlur={e => (e.target.style.border = "1.2px solid var(--border-color)")}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "11px 0",
            background: "var(--button-bg)",
            color: "var(--button-text)",
            border: "none",
            borderRadius: 7,
            fontWeight: 700,
            fontSize: 16.2,
            marginBottom: 15,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 1px 4px #1d834822",
            transition: "background .13s",
            letterSpacing: ".01em"
          }}
          onMouseOver={e => (e.target.style.background = "var(--button-hover-bg)")}
          onMouseOut={e => (e.target.style.background = "var(--button-bg)")}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div style={{ fontSize: 13, marginTop: 10 }}>
          Don't have an account? <Link style={{ color: "var(--primary)", fontWeight: 600 }} to="/register">Register</Link>
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
