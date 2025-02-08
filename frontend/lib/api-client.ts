import axios from "axios";

console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  console.error("NEXT_PUBLIC_API_URL is not defined");
}

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("apiClient baseURL:", apiClient.defaults.baseURL);

apiClient.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.url);
    // Conditionally add the token only on the client-side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
