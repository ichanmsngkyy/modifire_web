import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Dashboard() {
  const { handleLogout } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await handleLogout();
      navigate("/login");
    } catch (error) {
      console.log("Error");
      throw error;
    }
  };

  return (
    <nav>
      <button onClick={handleClick}> Logout</button>
    </nav>
  );
}

export default Dashboard;
