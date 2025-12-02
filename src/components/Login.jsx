import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Typography, Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

function LoginForm({ onClose, onOpenRegister }) {
  const { handleLogin, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralError("");
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await handleLogin(formData.username, formData.password);
      console.log("User data after login:", userData);
      console.log("User role:", userData?.role);
      // Redirect based on user role (role is an integer: 0 = user, 1 = admin)
      if (userData?.role === 1 || userData?.role === "admin") {
        console.log("Redirecting to admin dashboard");
        navigate("/modifire_web/admin");
      } else {
        console.log("Redirecting to my builds");
        navigate("/modifire_web/mybuilds");
      }
    } catch (error) {
      setGeneralError("Invalid username or password");
      throw error;
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
        Log in
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
        {generalError && (
          <Typography color="error" sx={{ mb: 1 }}>
            {generalError}
          </Typography>
        )}
        <Typography color="var(--text)" fontSize={14}>
          Don&apos;t have an account?{" "}
          <span
            style={{
              color: "var(--primary)",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={onOpenRegister}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") onOpenRegister();
            }}
          >
            Sign Up!
          </span>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1, fontWeight: 700, px: 3 }}
          >
            LOG IN
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
