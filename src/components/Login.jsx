import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./AuthForm.module.css";
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
    <div className={styles.background}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="username">
            Username:
          </label>
          <input
            className={`${styles.inputField} ${
              errors.username ? styles.inputError : ""
            }`}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="password">
            Password:
          </label>
          <input
            className={`${styles.inputField} ${
              errors.password ? styles.inputError : ""
            }`}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <div className={styles.formGroup}>
          <button className={styles.submitButton} type="submit">
            Log in!
          </button>
        </div>
        {generalError && <div className={styles.error}>{generalError}</div>}

        <div className={styles.signinPrompt}>
          Don't have an account?{" "}
          <a href="/register" className={styles.signUpLink}>
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
