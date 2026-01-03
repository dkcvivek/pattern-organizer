// import { AuthResponse } from "../types/auth";
// import { apiFetch } from "./api";

// export function login(email: string, password: string) {
//   return apiFetch<AuthResponse>("/auth/login/", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//   });
// }

// export function logout() {
//   return apiFetch("/auth/logout/", { method: "POST" });
// }

export const loginWithEmail = async (email: string, password: string) => {
  const res = await fetch("http://128.100.10.210:8000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.detail || "Invalid email or password");
  }

  return data; // { access, refresh }
};
