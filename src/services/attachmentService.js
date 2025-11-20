import api from "./api";

export async function getAttachments() {
  try {
    const response = await api.get("/api/attachments");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch attachments:", error);
    throw error;
  }
}
