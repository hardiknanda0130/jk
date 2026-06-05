// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   timeout: 10000, // ⏱ 10 seconds
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // ✅ STEP 3: Axios Response Interceptor (GLOBAL ERROR HANDLING)
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message ||
//       error.response?.data?.detail ||
//       "Server error";

//     console.error("API ERROR FULL:", error);
//     console.error("API ERROR DATA:", error?.response?.data);

//     return Promise.reject(error?.response?.data);
//   },
// );

// const ApiService = {
//   get(url, config = {}) {
//     return apiClient.get(url, config);
//   },

//   post(url, data, config = {}) {
//     return apiClient.post(url, data, config);
//   },

//   put(url, data, config = {}) {
//     return apiClient.put(url, data, config);
//   },

//   delete(url, config = {}) {
//     return apiClient.delete(url, config);
//   },
// };

// export default ApiService;

import { TokenStorage } from "@/components/tokenStorage";
import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
// 🔥 har request me bearer token auto add hoga
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = TokenStorage.getSsoAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("API ERROR:", error?.response?.data);
    return Promise.reject(error?.response?.data);
  },
);

const ApiService = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
};

export default ApiService;
