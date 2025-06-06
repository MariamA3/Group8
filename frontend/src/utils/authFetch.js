export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers,
  });
};