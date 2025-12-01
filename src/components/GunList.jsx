import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GunCard from "./GunCard";
import {
  AppBar,
  Box,
  Toolbar,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import { getGuns } from "../services/gunService";

function GunList() {
  const [guns, setGuns] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getGuns()
      .then((data) => {
        setGuns(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load guns.");
        setLoading(false);
      });
  }, []);

  // Get unique categories for dropdown
  const categories = Array.from(
    new Set(guns.map((gun) => gun.category))
  ).filter(Boolean);

  const filteredGuns = guns.filter((gun) => {
    const matchesSearch =
      gun.name.toLowerCase().includes(filter.toLowerCase()) ||
      gun.category.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = category ? gun.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ bgcolor: "var(--darkgray)", minHeight: "100vh", pb: 6 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "var(--blackish)", boxShadow: "none", p: 1 }}
      >
        <Toolbar
          sx={{
            minHeight: 64,
            px: 0,
            py: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--red)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              py: 1,
              boxShadow: "0 2px 8px #0006",
              ml: 1,
              "&:hover": { bgcolor: "var(--hover)" },
            }}
            onClick={() => navigate("/modifire_web/dashboard/mybuilds")}
          >
            ← Back
          </Button>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: 500, md: 600 },
              maxWidth: 600,
              ml: "auto",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search guns..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{
                bgcolor: "var(--blackish)",
                borderRadius: 1,
                color: "var(--text)",
                minWidth: 180,
                flex: 1,
              }}
              InputProps={{ style: { color: "var(--text)" } }}
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ color: "var(--gray)" }}>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                sx={{ bgcolor: "var(--blackish)", color: "var(--text)" }}
                MenuProps={{
                  PaperProps: {
                    sx: { bgcolor: "var(--blackish)", color: "var(--text)" },
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4 }}>
        {loading && (
          <Typography sx={{ mt: 4, textAlign: "center", color: "var(--text)" }}>
            Loading...
          </Typography>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
            {error}
          </Typography>
        )}
        {!loading && !error && filteredGuns.length === 0 && (
          <Typography sx={{ mt: 4, textAlign: "center", color: "var(--gray)" }}>
            No guns found.
          </Typography>
        )}
        {!loading && !error && (
          <Grid container spacing={3} justifyContent="center">
            {filteredGuns.map((gun) => (
              <Grid item key={gun.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Box
                  onClick={() =>
                    navigate("/modifire_web/customizer", { state: { gun } })
                  }
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "stretch",
                    maxWidth: 300,
                    minWidth: 180,
                    width: "100%",
                    mx: "auto",
                    transition: "transform 0.15s",
                    "&:hover": { transform: "scale(1.04)" },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "var(--blackish)",
                      borderRadius: 3,
                      boxShadow: "0 2px 12px #0008",
                      color: "var(--text)",
                      width: "100%",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: 240,
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={gun.base_image_url}
                      alt={gun.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: 110,
                        objectFit: "contain",
                        marginBottom: 16,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 0.5, color: "var(--primary)" }}
                    >
                      {gun.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--gray)",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                    >
                      {gun.category}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default GunList;
