import api from "./api";

export async function login(username, password) {
  try {
    const response = await api.post("/api/auth/login", {
      user: {
        username: username,
        password: password,
      },
    });

    // Rails Devise JWT returns token in Authorization header
    const authHeader = response.headers["authorization"];

    // Extract token (remove "Bearer " prefix if present)
    const token = authHeader?.replace("Bearer ", "") || authHeader;

    const user = response.data.user || response.data.data || response.data;

    console.log("Token:", token);
    console.log("Full Bearer:", `Bearer ${token}`);
    // Save token to browser
    localStorage.setItem("token", token);

    return user;
  } catch (error) {
    console.error("Login failed: ", error);
    throw error;
  }
}

export async function register(
  username,
  email,
  password,
  password_confirmation
) {
  try {
    const response = await api.post("/api/auth/signup", {
      user: {
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    });
    const authHeader = response.headers["authorization"];
    const token = authHeader?.replace("Bearer ", "") || authHeader;
    const user = response.data.user || response.data.data || response.data;
    // Save token to browser
    localStorage.setItem("token", token);

    return user;
  } catch (error) {
    console.error("Sign up failed: ", error);
    throw error;
  }
}

export async function logout() {
  const token = localStorage.getItem("token");
  if (!token || token === "null" || token === "undefined") {
    // No token, nothing to do
    localStorage.removeItem("token");
    return;
  }
  console.log("Token:", token);
  console.log("Full Bearer:", `Bearer ${token}`);
  try {
    await api.delete("/api/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Log out failed on backend:", err);
    // Continue anyway - we still want to clear local state
  } finally {
    // Always remove token regardless of backend response
    localStorage.removeItem("token");
  }
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token || token === "null" || token === "undefined") {
    return null;
  }

  try {
    // Call your API to get current user data
    const response = await api.get("/api/current_user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user || response.data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    // If token is invalid, remove it
    localStorage.removeItem("token");
    return null;
  }
}
