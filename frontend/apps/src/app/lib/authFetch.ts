const API = "https://api-gateway-wkss.onrender.com";

const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
export const authFetch = async (url: string, options: any = {}) => {
  let accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const makeRequest = () =>
    fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

  let res = await makeRequest();
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(API + "/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!refreshRes.ok) {
      logout();
      return;
    }
    
    const data = await refreshRes.json();
    console.log("Refresh token "+data);
    localStorage.setItem("token", data.accessToken);
    accessToken = data.accessToken;
    res = await makeRequest();
  }
  if (res.status === 401) {
    logout();
    return;
  }

  return res.json();
};
