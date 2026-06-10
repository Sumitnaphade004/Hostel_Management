import BASE_URL from "./Api";

const apiRequest = async (endpoint, options = {}, isFile = false) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        ...(isFile ? {} : { "Content-Type": "application/json" }),
        ...options.headers,
      },
      credentials: "include",
      body:
        options.body && !isFile
          ? JSON.stringify(options.body)
          : options.body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API error on ${endpoint}:`, error);
    throw error;
  }
};

export default apiRequest;