import api from "./api";

export async function getAttachmentTypes(gunId) {
  try {
    const response = await api.get(`/api/guns/${gunId}/attachment_types`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch attachment types:", error);
    throw error;
  }
}
