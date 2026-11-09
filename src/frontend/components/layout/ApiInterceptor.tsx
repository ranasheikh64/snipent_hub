"use client";

import { useEffect } from "react";
import { API_BASE_URL } from "@/frontend/config/api";

export function ApiInterceptor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Capture OAuth token from URL query params
    const searchParams = new URLSearchParams(window.location.search);
    const oauthToken = searchParams.get("token");
    if (oauthToken) {
      localStorage.setItem("devvault_token", oauthToken);
      searchParams.delete("token");
      searchParams.delete("auth");
      const newQuery = searchParams.toString();
      const newPath = window.location.pathname + (newQuery ? `?${newQuery}` : "");
      window.history.replaceState({}, "", newPath);
    }

    const originalFetch = window.fetch;

    window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
      const token = typeof localStorage !== "undefined" ? localStorage.getItem("devvault_token") : null;
      let url = input;

      if (typeof input === "string" && input.startsWith("/api/")) {
        url = `${API_BASE_URL}${input}`;
      } else if (input instanceof URL && input.pathname.startsWith("/api/")) {
        url = new URL(input.pathname + input.search, API_BASE_URL);
      }

      const headers = new Headers(init?.headers || {});
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      const newInit: RequestInit = {
        ...init,
        headers,
        credentials: init?.credentials || "include",
      };

      return originalFetch(url, newInit);
    };
  }, []);

  return null;
}

