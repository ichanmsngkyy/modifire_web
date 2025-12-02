import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import api from "../../services/api";

export default function UploadGun({ embedded = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    base_image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "assault_rifle",
    "submachine_gun",
    "sniper_rifle",
    "shotgun",
    "pistol",
    "light_machine_gun",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        base_image: file,
      }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("gun[name]", formData.name);
      formDataToSend.append("gun[category]", formData.category);
      formDataToSend.append("gun[description]", formData.description);
      if (formData.base_image) {
        formDataToSend.append("gun[base_image]", formData.base_image);
      }

      await api.post("/api/admin/guns", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      // Reset form
      setFormData({
        name: "",
        category: "",
        description: "",
        base_image: null,
      });
      setImagePreview(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to upload gun");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: embedded ? "transparent" : "var(--darkgray)",
        minHeight: embedded ? "auto" : "100vh",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          gap: 2,
          width: "100%",
          maxWidth: 600,
        }}
      >
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
          Upload New Gun
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3, maxWidth: 600, width: "100%" }}>
          Gun uploaded successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, maxWidth: 600, width: "100%" }}>
          {error}
        </Alert>
      )}

      <Paper
        sx={{
          bgcolor: "var(--blackish)",
          borderRadius: 3,
          p: 4,
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Gun Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: "var(--text)" },
              label: { color: "var(--primary)" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--text)",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "var(--red)" },
                "&.Mui-focused fieldset": { borderColor: "var(--red)" },
              },
            }}
          />

          <FormControl fullWidth required>
            <InputLabel sx={{ color: "var(--primary)" }}>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
              sx={{
                color: "var(--text)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--text)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--red)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--red)",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "var(--blackish)",
                    color: "var(--text)",
                  },
                },
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            sx={{
              textarea: { color: "var(--text)" },
              label: { color: "var(--primary)" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--text)",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "var(--red)" },
                "&.Mui-focused fieldset": { borderColor: "var(--red)" },
              },
            }}
          />

          <Box>
            <Button
              variant="contained"
              component="label"
              sx={{
                bgcolor: "var(--red)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 2,
                mb: 2,
                "&:hover": { bgcolor: "var(--hover)" },
              }}
            >
              Choose Gun Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {imagePreview && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "#222325",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 300,
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={uploading}
            sx={{
              bgcolor: "var(--red)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "var(--hover)" },
              "&:disabled": { bgcolor: "var(--gray)" },
            }}
          >
            {uploading ? "Uploading..." : "Upload Gun"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
