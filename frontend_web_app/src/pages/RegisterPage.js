import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../App";

// PUBLIC_INTERFACE
/**
 * RegisterPage: Registration form for new users
 */
function RegisterPage() {
  const { handleLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(undefined); setSuccess(undefined);
    try {
      // API: POST /auth/register
      const data = await api.post("/auth/register", {
        username: form.username,
        password: form.password,
      });
      if (data && data.token) {
        handleLogin(data.token, form.username);
        navigate("/dashboard");
      } else if (data && data.success) {
        setSuccess("Registration successful! Please log in.");
        setTimeout(() => navigate("/login"), 1700);
      } else {
        setError("Registration failed or user already exists.");
      }
    } catch (err) {
      setError(err.message || "Error registering.");
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
      <h2 style={{ marginBottom: 32 }}>Register</h2>
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
          {loading ? "Registering..." : "Register"}
        </button>
        <div style={{ fontSize: 13, marginTop: 10 }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
        {error && (
          <div style={{ color: "red", fontSize: 14, marginTop: 14, textAlign: "center" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: "green", fontSize: 14, marginTop: 14, textAlign: "center" }}>
            {success}
          </div>
        )}
      </form>
    </div>
  );
}
export default RegisterPage;
