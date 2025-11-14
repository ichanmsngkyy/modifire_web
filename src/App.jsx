import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          {/* Add more links/tabs here */}
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
