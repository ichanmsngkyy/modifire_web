import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import AllBuilds from "./admin/AllBuilds";
import AllUsers from "./admin/AllUsers";
import UploadGun from "./admin/UploadGun";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "builds":
        return <AllBuilds embedded />;
      case "users":
        return <AllUsers embedded />;
      case "upload":
        return <UploadGun embedded />;
      default:
        return (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ color: "var(--primary)", fontWeight: 700, mb: 2 }}
            >
              Welcome to Admin Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--text)" }}>
              Select an option from the navigation bar above to get started.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ bgcolor: "var(--darkgray)", minHeight: "100vh" }}>
      {/* Top Navigation Bar */}
      <Box
        sx={{
          bgcolor: "var(--blackish)",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px #0008",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "var(--primary)", fontWeight: 700, ml: 2 }}
        >
          Admin Dashboard
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant={activeTab === "builds" ? "contained" : "outlined"}
            sx={{
              bgcolor: activeTab === "builds" ? "var(--red)" : "transparent",
              color: activeTab === "builds" ? "#fff" : "var(--red)",
              borderColor: "var(--red)",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              py: 1,
              "&:hover": {
                bgcolor: activeTab === "builds" ? "var(--hover)" : "#2a2a2a",
              },
            }}
            onClick={() => setActiveTab("builds")}
          >
            All Builds
          </Button>
          <Button
            variant={activeTab === "users" ? "contained" : "outlined"}
            sx={{
              bgcolor: activeTab === "users" ? "var(--red)" : "transparent",
              color: activeTab === "users" ? "#fff" : "var(--red)",
              borderColor: "var(--red)",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              py: 1,
              "&:hover": {
                bgcolor: activeTab === "users" ? "var(--hover)" : "#2a2a2a",
              },
            }}
            onClick={() => setActiveTab("users")}
          >
            All Users
          </Button>
          <Button
            variant={activeTab === "upload" ? "contained" : "outlined"}
            sx={{
              bgcolor: activeTab === "upload" ? "var(--red)" : "transparent",
              color: activeTab === "upload" ? "#fff" : "var(--red)",
              borderColor: "var(--red)",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              py: 1,
              "&:hover": {
                bgcolor: activeTab === "upload" ? "var(--hover)" : "#2a2a2a",
              },
            }}
            onClick={() => setActiveTab("upload")}
          >
            Upload Gun
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "var(--red)",
              borderColor: "var(--red)",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              py: 1,
              "&:hover": {
                bgcolor: "#2a2a2a",
                borderColor: "var(--hover)",
              },
            }}
            onClick={async () => {
              await handleLogout();
              navigate("/modifire_web/");
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Content Area */}
      {renderContent()}
    </Box>
  );
}
