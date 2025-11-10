import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import RegisterForm from "./components/Register";
// import LoginForm from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link>
        {/* <Link to="/login">Login</Link> */}
        {/* Add more links/tabs here */}
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/login" element={<LoginForm />} /> */}
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
