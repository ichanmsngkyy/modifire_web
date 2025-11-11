import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Register.module.css";

function RegisterForm() {
  const { handleRegister } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

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
        console.log("Form submitted successfully:", formData);
      } catch (error) {
        console.log("Form has errors");
        throw error;
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password != formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
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
            className={`${`${styles.inputField} ${
              errors.username ? styles.inputError : ""
            }`} ${errors.username ? styles.inputError : ""}`}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="email">
            Email:
          </label>
          <input
            className={`${styles.inputField} ${
              errors.username ? styles.inputError : ""
            }`}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="password">
            Password:
          </label>
          <input
            className={`${styles.inputField} ${
              errors.username ? styles.inputError : ""
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
          <label className={styles.formLabel} htmlFor="password_confirmation">
            Confirm Password:
          </label>
          <input
            className={`${styles.inputField} ${
              errors.password_confirmation ? styles.inputError : ""
            }`}
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && (
            <p className={styles.error}>{errors.password_confirmation}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <button className={styles.submitButton} type="submit">
            Sign up!
          </button>
        </div>
        <div className={styles.signinPrompt}>
          Already have an account?{" "}
          <a href="/login" className={styles.signinLink}>
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
