import api from "./api";

export async function getUserBuilds() {
  const response = await api.get("/api/builds");
  return response.data;
}
