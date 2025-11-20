import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Show loading while checking authentication
  if (loading) {
    return <div>Loading...</div>; // Or a nice loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/modifire_web" replace />;
  }

  return children;
}

export default ProtectedRoute;
