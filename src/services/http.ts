import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const ownerAuthStorageKey = "aboutbot.owner.auth";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(ownerAuthStorageKey);

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { apiKey?: string };
        const apiKey = parsed.apiKey?.trim();
        if (apiKey) {
          config.headers.set("x-api-key", apiKey);
        }
      } catch {
        window.localStorage.removeItem(ownerAuthStorageKey);
      }
    }
  }

  return config;
});

export default apiClient;
