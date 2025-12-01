import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import { getUserBuilds, deleteBuild } from "../services/buildService";
import { AuthContext } from "../contexts/AuthContext";

export default function MyBuilds() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  // Fetch builds on mount and when page regains focus
  useEffect(() => {
    const fetchBuilds = () => {
      setLoading(true);
      getUserBuilds()
        .then(setBuilds)
        .catch((err) => setError(err.message || "Failed to fetch builds"))
        .finally(() => setLoading(false));
    };
    fetchBuilds();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchBuilds();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (loading)
    return (
      <Typography sx={{ color: "var(--text)", mt: 4 }}>
        Loading builds...
      </Typography>
    );
  if (error)
    return (
      <Typography sx={{ color: "var(--red)", mt: 4 }}>
        Failed to load builds.
      </Typography>
    );

  return (
    <Box sx={{ bgcolor: "var(--darkgray)", minHeight: "100vh", p: 4 }}>
      <Button
        variant="outlined"
        sx={{
          color: "var(--red)",
          borderColor: "var(--red)",
          fontWeight: 700,
          borderRadius: 2,
          mb: 2,
          float: "right",
          ml: 2,
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
      <Button
        variant="contained"
        sx={{
          bgcolor: "var(--red)",
          color: "#fff",
          fontWeight: 700,
          borderRadius: 2,
          mb: 3,
          px: 3,
          py: 1.2,
          boxShadow: "0 2px 8px #0006",
          "&:hover": { bgcolor: "var(--hover)" },
        }}
        onClick={() =>
          navigate("/modifire_web/gunlist", { state: { create: true } })
        }
      >
        + Create New Build
      </Button>
      <Typography
        variant="h4"
        sx={{ color: "var(--primary)", mb: 4, fontWeight: 700 }}
      >
        My Builds
      </Typography>
      <Grid container spacing={3}>
        {builds.length === 0 && (
          <Grid item xs={12}>
            <Typography sx={{ color: "var(--gray)" }}>
              No builds found.
            </Typography>
          </Grid>
        )}
        {builds.map((build) => (
          <Grid item xs={12} sm={6} md={4} key={build.id}>
            <Card
              sx={{
                bgcolor: "var(--blackish)",
                color: "var(--text)",
                borderRadius: 3,
                boxShadow: "0 2px 12px #0008",
                cursor: "pointer",
                transition: "transform 0.15s",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={() => {
                // Pass both build and gun image for customizer
                navigate("/modifire_web/customizer", {
                  state: {
                    build,
                    gun: build.gun || {
                      name: build.gun_name,
                      base_image_url: build.gun_image_url,
                    },
                  },
                });
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={(() => {
                  const url =
                    build.gun_image_url ||
                    (build.gun && build.gun.base_image_url);
                  if (typeof url === "string" && url.trim() !== "") {
                    return url.startsWith("http")
                      ? url
                      : `http://localhost:3000${url}`;
                  }
                  return "/default_gun.png";
                })()}
                alt={
                  build.gun_name || (build.gun && build.gun.name) || "Gun Image"
                }
                sx={{ objectFit: "contain", bgcolor: "#222325" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {build.title || build.gun_name || "Untitled Build"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--gray)", mb: 2 }}
                >
                  {Array.isArray(build.attachment_overlays)
                    ? build.attachment_overlays.length
                    : build.attachments?.length || 0}{" "}
                  Attachments
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "var(--red)",
                      color: "#fff",
                      fontWeight: 700,
                      borderRadius: 2,
                      "&:hover": { bgcolor: "var(--hover)" },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/modifire_web/customizer", {
                        state: {
                          build,
                          gun: build.gun || {
                            name: build.gun_name,
                            base_image_url: build.gun_image_url,
                          },
                        },
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "var(--red)",
                      borderColor: "var(--red)",
                      fontWeight: 700,
                      borderRadius: 2,
                      ml: 1,
                      "&:hover": {
                        bgcolor: "#2a2a2a",
                        borderColor: "var(--hover)",
                      },
                    }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (window.confirm("Delete this build?")) {
                        await deleteBuild(build.id);
                        setBuilds((prev) =>
                          prev.filter((b) => b.id !== build.id)
                        );
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
