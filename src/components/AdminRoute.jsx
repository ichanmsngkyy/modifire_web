import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  // Show loading while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "var(--darkgray)",
        }}
      >
        <Typography variant="h6" sx={{ color: "var(--text)" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/modifire_web" replace />;
  }

  // If authenticated but not admin, show access denied
  // Role is an integer: 0 = user, 1 = admin
  if (user?.role !== 1 && user?.role !== "admin") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "var(--darkgray)",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "var(--red)", fontWeight: 700 }}>
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--text)" }}>
          You do not have permission to access this page.
        </Typography>
      </Box>
    );
  }

  return children;
}

export default AdminRoute;
