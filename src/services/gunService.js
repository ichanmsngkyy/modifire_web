import api from "./api";

export async function getGuns() {
  try {
    const response = await api.get("/api/guns");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch guns:", error);
    throw error;
  }
}
