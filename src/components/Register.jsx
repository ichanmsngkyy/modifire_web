import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

function RegisterForm({ onClose, onOpenLogin }) {
  const { handleRegister } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await handleRegister(
          formData.username,
          formData.email,
          formData.password,
          formData.password_confirmation
        );
        console.log(
          formData.username,
          formData.email,
          formData.password,
          formData.password_confirmation
        );
        navigate("/dashboard");
        console.log("Form submitted successfully:", formData);
      } catch (error) {
        setErrors({ api: error.response.data.status.message });
        throw error;
      }
    }
  };

  const validateForm = async (e) => {
    e.preventDefault;
    setGeneralErrors("");
    try {
      await handleRegister(
        formData.username,
        formData.email,
        formData.password,
        formData.password_confirmation
      );
    } catch (error) {
      let message = "Registration failed!";
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          message = error.response.data.error;
        }
      }
      setGeneralError(message);
    }
  };
  return (
    <Box
      sx={{
        bgcolor: "var(--darkgray)",
        minHeight: "5vh",
        width: 500,
        px: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        padding: "2.5em 2.5em 2em 2.5em",
        borderRadius: 3,
        outline: "none",
        boxShadow: "none",
        position: "relative",
      }}
    >
      {/* Exit button at top right */}
      <Button
        onClick={onClose || (() => {})}
        sx={{
          position: "absolute",
          top: 15,
          right: 12,
          minWidth: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          color: "var(--text)",
          fontWeight: "bold",
          fontSize: 22,
          zIndex: 2,
          mt: 1,
          mr: 1.5,
          background: "rgba(255,255,255,0.08)",
          "&:hover": { background: "rgba(255,255,255,0.18)" },
        }}
        aria-label="Close"
      >
        ×
      </Button>
      <Typography
        variant="h5"
        sx={{ color: "var(--text)", mb: 2, fontWeight: 700, mt: 2 }}
      >
        Register
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ width: "100%" }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            input: { color: "var(--text)" },
            label: { color: "var(--primary)" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--text)",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#1976d2" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            input: { color: "var(--text)" },
            label: { color: "var(--primary)" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--text)",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#1976d2" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            input: { color: "var(--text)" },
            label: { color: "var(--primary)" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--text)",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#1976d2" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
          }}
        />
        <TextField
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          value={formData.password_confirmation}
          onChange={handleChange}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation}
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            input: { color: "var(--text)" },
            label: { color: "var(--primary)" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--text)",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#1976d2" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
          }}
        />
        {generalError && (
          <Typography color="error" sx={{ mb: 1 }}>
            {generalError}
          </Typography>
        )}
        <Typography color="var(--text)" fontSize={14}>
          Already have an account?{" "}
          <span
            style={{
              color: "var(--primary)",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={onOpenLogin}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") onOpenLogin();
            }}
          >
            Sign in!
          </span>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1, fontWeight: 700, px: 3 }}
          >
            Sign up!
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default RegisterForm;
