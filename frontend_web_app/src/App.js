import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MetricsPage from "./pages/MetricsPage";
import EventsPage from "./pages/EventsPage";
import SpacesPage from "./pages/SpacesPage";
import api from "./utils/api";

// --- THEME MANAGEMENT
function useTheme(defaultTheme = "light") {
  const [theme, setTheme] = useState(defaultTheme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  return [theme, toggleTheme];
}

// --- AUTH CONTEXT
const AuthContext = React.createContext();

// --- PROTECTED ROUTES
function ProtectedRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
}

// --- MAIN LAYOUT (with sidebar)
function MainLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT
function App() {
  const [theme, toggleTheme] = useTheme("light");
  const [user, setUser] = useState(() =>
    localStorage.getItem("auth_token")
      ? { username: localStorage.getItem("username") || "User" }
      : null
  );
  // When user logs in, persist token
  function handleLogin(token, username) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("username", username);
    setUser({ username });
  }
  // Logout logic
  function handleLogout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    setUser(null);
  }

  useEffect(() => {
    // Optionally, verify token is still valid with backend
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      <Router>
        <div className="App">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{ position: "fixed", top: 20, right: 20, zIndex: 10 }}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected app routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/metrics" element={<MetricsPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/spaces" element={<SpacesPage />} />
              </Route>
            </Route>
            {/* fallback */}
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default App;
