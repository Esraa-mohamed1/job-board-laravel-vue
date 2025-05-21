/**
 * API Utility Module
 * Handles all HTTP requests with authentication and error handling
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

/**
 * Base fetch function with JSON handling
 * @param {string} url - The endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise} Parsed JSON response
 */
async function fetchJson(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add auth token if available
  const token = localStorage.getItem("authToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log("Using auth token from localStorage");
  } else {
    console.warn("No auth token found in localStorage");
  }

  try {
    console.log(`Making ${options.method || "GET"} request to: ${url}`);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      console.error("API request failed:", {
        status: response.status,
        statusText: response.statusText,
        url: url,
      });

      // Handle token issues
      if (response.status === 401) {
        console.error("Authentication error - token may be invalid or expired");
      }

      const errorBody = await response.text();
      console.error("Error response body:", errorBody);

      const error = new Error(
        `API Error: ${response.status} ${response.statusText}`
      );
      error.response = response;
      error.responseBody = errorBody;
      throw error;
    }

    // Handle empty responses (like 204 No Content)
    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    console.log(`Response data from ${url}:`, data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

/**
 * POST request with JSON body
 * @param {string} url - The endpoint URL
 * @param {Object} data - Data to send
 * @returns {Promise} Parsed JSON response
 */
async function postJson(url, data) {
  return fetchJson(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PATCH request with JSON body
 * @param {string} url - The endpoint URL
 * @param {Object} data - Data to send
 * @returns {Promise} Parsed JSON response
 */
async function patchJson(url, data) {
  return fetchJson(url, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * PUT request with JSON body
 * @param {string} url - The endpoint URL
 * @param {Object} data - Data to send
 * @returns {Promise} Parsed JSON response
 */
async function putJson(url, data) {
  return fetchJson(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 * @param {string} url - The endpoint URL
 * @returns {Promise} Parsed JSON response
 */
async function deleteJson(url) {
  return fetchJson(url, {
    method: "DELETE",
  });
}

// API client with pre-configured base URL
const apiClient = {
  get: (endpoint, options = {}) =>
    fetchJson(`${API_BASE_URL}${endpoint}`, options),
  post: (endpoint, data) => postJson(`${API_BASE_URL}${endpoint}`, data),
  put: (endpoint, data) => putJson(`${API_BASE_URL}${endpoint}`, data),
  patch: (endpoint, data) => patchJson(`${API_BASE_URL}${endpoint}`, data),
  delete: (endpoint) => deleteJson(`${API_BASE_URL}${endpoint}`),

  // Raw fetch for custom URLs
  raw: {
    get: fetchJson,
    post: postJson,
    put: putJson,
    patch: patchJson,
    delete: deleteJson,
  },
  
};

export default apiClient;
