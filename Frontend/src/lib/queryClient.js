import { QueryClient } from "@tanstack/react-query";

/**
 * Helper function to check if response is OK and throw an error if not
 */
async function throwIfResNotOk(res) {
  if (!res.ok) {
    let errorMessage;
    try {
      const data = await res.json();
      errorMessage = data.message || `Error: ${res.status} ${res.statusText}`;
    } catch (e) {
      errorMessage = `Error: ${res.status} ${res.statusText}`;
    }
    throw new Error(errorMessage);
  }
  return res;
}

/**
 * Helper function for making API requests
 * @param {string} url - The URL to fetch from
 * @param {object} options - Fetch options
 */
export async function apiRequest(
  url,
  options = {}
) {
  const defaultOptions = {
    credentials: "include", // Always include credentials for cross-origin requests
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Merge options
  const finalOptions = { ...defaultOptions, ...options };
  
  // If the request has a body and it's not already a string, serialize it
  if (finalOptions.body && typeof finalOptions.body !== "string") {
    finalOptions.body = JSON.stringify(finalOptions.body);
  }

  // Make the request
  const res = await fetch(url, finalOptions);
  await throwIfResNotOk(res);

  // Return the payload only if the request is not a DELETE
  if (res.status !== 204) {
    return res.json();
  }
  
  return null;
}

/**
 * Create a query function with specific options
 */
export const getQueryFn = (options) => {
  return async ({ queryKey }) => {
    const [url] = queryKey;
    
    try {
      const data = await apiRequest(url);
      return data;
    } catch (error) {
      if (error.message && error.message.includes("401") && options.on401 === "returnNull") {
        // If a 401 is received and the behavior is to return null, do so
        return null;
      }
      // Otherwise, rethrow the error
      throw error;
    }
  };
};

/**
 * Configure the query client
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: false,
      queryFn: getQueryFn({ on401: "throw" }),
    },
  },
});