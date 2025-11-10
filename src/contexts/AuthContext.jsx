import { createContext, useState, useEffect, useContext } from "react";
import { login, register, logout } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  async function handleLogin(username, password) {
    try {
      const userData = await login(username, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login Failed", error);
      throw error;
    }
  }

  async function handleRegister(
    username,
    email,
    password,
    password_confirmation
  ) {
    try {
      const userData = await register(
        username,
        email,
        password,
        password_confirmation
      );
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Sign up Failed", error);
      throw error;
    }
  }

  async function handleLogout() {
    try {
      const userData = await logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout Failed", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
