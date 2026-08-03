/**
 * csrf.js
 *
 * Fetches the CSRF token from the server once, stores it in memory
 * (NOT in localStorage/sessionStorage), and sets up an axios interceptor
 * that automatically attaches X-CSRF-Token to every state-mutating request.
 *
 * Memory storage means:
 *  - XSS cannot persist the token across page loads
 *  - A new token is fetched on every fresh page load
 *  - The token is never exposed in the DOM or devtools storage tabs
 */

import axios from "axios";

const API = import.meta.env.VITE_APP_API_URL;

// In-memory store — not accessible from outside this module
let csrfToken = null;

/**
 * Fetch and cache the CSRF token. Safe to call multiple times —
 * only makes the network request once per page load.
 */
export const initCsrf = async () => {
  if (csrfToken) return csrfToken;
  try {
    const { data } = await axios.get(`${API}/auth/csrf-token`, {
      withCredentials: true,
    });
    csrfToken = data.csrfToken;
    return csrfToken;
  } catch (err) {
    console.error("[CSRF] Failed to fetch CSRF token:", err);
    return null;
  }
};

/**
 * Register a global axios request interceptor that:
 *  - Attaches X-CSRF-Token on POST / PUT / DELETE / PATCH
 *  - Skips GET / HEAD / OPTIONS (safe methods)
 *  - Automatically re-fetches the token if it has been cleared
 */
export const setupCsrfInterceptor = () => {
  axios.interceptors.request.use(async (config) => {
    const method = (config.method || "get").toLowerCase();
    const mutating = ["post", "put", "delete", "patch"];

    if (mutating.includes(method)) {
      // Fetch token if not yet in memory
      if (!csrfToken) await initCsrf();
      if (csrfToken) {
        config.headers = config.headers || {};
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }

    return config;
  });

  // If the server returns 403 with a CSRF error, clear the cached token
  // so the next request will re-fetch it automatically.
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 403 &&
        error.response?.data?.message?.includes("CSRF")
      ) {
        csrfToken = null; // force re-fetch on next mutating request
      }
      return Promise.reject(error);
    }
  );
};
