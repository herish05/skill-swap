const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
