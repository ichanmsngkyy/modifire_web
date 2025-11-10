import api from "./api";

export async function login(username, password) {
  try {
    const response = await api.post("/api/auth/signin", {
      user: {
        username: username,
        password: password,
      },
    });

    //Rails return: {token: jwt_here, user: ...}
    const { token, user } = response.data;

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
        password_confirmation: password,
      },
    });
    //Rails return: {token: jwt_here, user: ...}
    const { token, user } = response.data;

    // Save token to browser
    localStorage.setItem("token", token);

    return user;
  } catch (error) {
    console.error("Sign up failed: ", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.post("/api/auth/logout", {});

    localStorage.removeItem("token");
  } catch (error) {
    console.error("Log out failed: ", error);
    throw error;
  }
}
