import { createContext, useState, useEffect, useContext } from "react";
import { login, register, logout } from "../services/authService";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Check authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (token && token !== "null" && token !== "undefined") {
        try {
          const userData = await getCurrentUser();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Auth initialization failed:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

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
      // Auto-login: set auth state so the app treats the newly registered
      // user as authenticated immediately.
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
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
    } finally {
      setUser(null);
      setIsAuthenticated(false);
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
