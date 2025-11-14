import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { handleLogin } = useContext(AuthContext);
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
    if (validateForm()) {
      try {
        await handleLogin(formData.username, formData.password);
        navigate("/dashboard");
      } catch (error) {
        setGeneralError("Invalid username or password");
        throw error;
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Box
      sx={{
        bgcolor: "var(--darkgray)",
        maxWidth: "30%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Typography variant="h6">Log in</Typography>
    </Box>
  );
}

export default LoginForm;
