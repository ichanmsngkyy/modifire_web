import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import HomePage from "./HomePage";

function Dashboard() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    await handleLogout();
    navigate("/modifire_web/");
  };

  return (
    <nav>
      <button onClick={handleClick}> Logout</button>
    </nav>
  );
}

export default Dashboard;
