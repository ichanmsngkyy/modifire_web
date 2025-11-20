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
    <Box>
      <AppBar
        position="static"
        sx={{ bgcolor: "var(--blackish)", boxShadow: "none", padding: "0.8em" }}
      >
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              maxWidth: 900,
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="outlined-search"
              label="Search"
              type="Search"
              autoComplete="on"
              sx={{
                mb: 2,
                mr: 2,
                "& .MuiInputLabel-root": {
                  color: "var(--gray)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--text)",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--gray)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--red)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--text)",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "var(--text)",
                },
              }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <FormControl sx={{ minWidth: 160, mb: 2 }}>
              <InputLabel
                id="category-filter-label"
                sx={{ color: "var(--gray)" }}
              >
                Category
              </InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  color: "var(--text)",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--gray)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--red)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text)",
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
      <Box>
        {loading && (
          <Typography sx={{ mt: 4, textAlign: "center" }}>
            Loading...
          </Typography>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
            {error}
          </Typography>
        )}
        {!loading && !error && filteredGuns.length === 0 && (
          <Typography sx={{ mt: 4, textAlign: "center" }}>
            No guns found.
          </Typography>
        )}
        {!loading && !error && (
          <Grid container spacing={2} justifyContent="center">
            {filteredGuns.map((gun) => (
              <Grid item key={gun.id} xs={6} sm={4} md={3} lg={2} xl={2}>
                <Box
                  onClick={() =>
                    navigate("/modifire_web/customizer", { state: { gun } })
                  }
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "stretch",
                    maxWidth: 250,
                    minWidth: 180,
                    width: "100%",
                    mx: "auto",
                  }}
                >
                  <GunCard
                    name={gun.name}
                    base_image_url={gun.base_image_url}
                    category={gun.category}
                    description={gun.description}
                  />
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
