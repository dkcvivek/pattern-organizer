import { AuthResponse } from "../types/auth";
import { apiFetch } from "./api";

export function login(email: string, password: string) {
  return apiFetch<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return apiFetch("/auth/logout/", { method: "POST" });
}
