import BASE_URL from "./api";

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // 👈 REQUIRED for cookies
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Unauthorized – login required");
        // optional: redirect to login
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API error on ${endpoint}:`, error);
    throw error;
  }
};

export default apiRequest;
