import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "../../services/api";

export default function AllBuilds({ embedded = false }) {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBuild, setSelectedBuild] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBuilds();
  }, []);

  const fetchAllBuilds = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/builds");
      setBuilds(response.data);
    } catch (err) {
      setError("Failed to fetch builds");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (buildId) => {
    try {
      await api.delete(`/api/admin/builds/${buildId}`);
      setBuilds((prev) => prev.filter((b) => b.id !== buildId));
      setDeleteDialogOpen(false);
      setSelectedBuild(null);
    } catch (err) {
      alert("Failed to delete build");
    }
  };

  if (loading)
    return (
      <Box sx={{ bgcolor: "var(--darkgray)", minHeight: "100vh", p: 4 }}>
        <Typography sx={{ color: "var(--text)", mt: 4 }}>
          Loading builds...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box sx={{ bgcolor: "var(--darkgray)", minHeight: "100vh", p: 4 }}>
        <Typography sx={{ color: "var(--red)", mt: 4 }}>{error}</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        bgcolor: embedded ? "transparent" : "var(--darkgray)",
        minHeight: embedded ? "auto" : "100vh",
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        {!embedded && (
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--red)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              py: 1,
              "&:hover": { bgcolor: "var(--hover)" },
            }}
            onClick={() => navigate("/modifire_web/admin")}
          >
            ← Back to Admin
          </Button>
        )}
        <Typography
          variant="h4"
          sx={{ color: "var(--primary)", fontWeight: 700 }}
        >
          All Builds ({builds.length})
        </Typography>
      </Box>

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
                  sx={{ color: "var(--gray)", mb: 1 }}
                >
                  User: {build.user?.username || build.user_id || "Unknown"}
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
                      flex: 1,
                      "&:hover": { bgcolor: "var(--hover)" },
                    }}
                    onClick={() => {
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
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "var(--red)",
                      borderColor: "var(--red)",
                      fontWeight: 700,
                      borderRadius: 2,
                      flex: 1,
                      "&:hover": {
                        bgcolor: "#2a2a2a",
                        borderColor: "var(--hover)",
                      },
                    }}
                    onClick={() => {
                      setSelectedBuild(build);
                      setDeleteDialogOpen(true);
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "var(--darkgray)",
            color: "var(--text)",
          },
        }}
      >
        <DialogTitle>Delete Build</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "
            {selectedBuild?.title || "this build"}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: "var(--gray)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedBuild?.id)}
            sx={{ color: "var(--red)", fontWeight: 700 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
