import api from "./api";

export async function getUserBuilds() {
  const response = await api.get("/api/builds");
  return response.data;
}

export async function updateBuild(buildId, buildData) {
  const response = await api.put(`/api/builds/${buildId}`, buildData);
  return response.data;
}

export async function deleteBuild(buildId) {
  const response = await api.delete(`/api/builds/${buildId}`);
  return response.data;
}
