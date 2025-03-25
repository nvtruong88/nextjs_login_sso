import BaseAlert from "@/utils/BaseAlert";
import { getSession } from "next-auth/react";

// services/apiService.ts
const API_URL = "https://rmgateway.vnptit.vn/vi"; //https://test-cms.vnpt-ca.vn Set the base URL for your API
export const apiService = async (
  endpoint: string,
  method: string = "GET",
  body: any = null
) => {
  const session = await getSession(); // Lấy session từ NextAuth
  const accessToken = session?.accessToken;
  const config: RequestInit = {
    method,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken.trim()}` } : {}),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch("/api/proxy", config);

    // Check if the HTTP response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check for JSON response
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json(); // Parse JSON response
    } else {
      throw new Error("Received non-JSON response"); // Handle non-JSON response
    }
  } catch (error: any) {
    // Handle different types of errors
    if (error.name === "AbortError") {
      console.error("Request was aborted:", error);
      BaseAlert.error(`Request was aborted: ${error.message}`);
    } else if (error instanceof TypeError) {
      console.error("Network or fetch error occurred:", error);
      BaseAlert.error(`Network or fetch error occurred: ${error.message}`);
    } else if (error.message.includes("HTTP error")) {
      console.error("HTTP error occurred:", error);
      BaseAlert.error(`HTTP error occurred: ${error.message}`);
    } else {
      console.error("Unexpected error occurred:", error);
      BaseAlert.error(`Unexpected error occurred: ${error.message}`);
    }
    // Optionally, throw a custom error object with additional information
    throw new Error(`API request failed: ${error.message}`);
  }
};

const getToken = async () => {
  const response = await fetch("https://rmidp.vnptit.vn/connect/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    mode:'no-cors',
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "4b25-637664417048491244.apps.smartcaapi.com",
      client_secret: "Nzk2M2QyODQ-NTIyMi00YjI1"
    })
  });

  const data = await response.json();
  return data.access_token;
};