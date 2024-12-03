/// <reference lib="es2020" />

import { FetchMenuResponse } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_URL;

export const fetchMenu = async (): Promise<FetchMenuResponse> => {
  try {
    const response = await fetch(`${baseUrl}/menu`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching menu: ${response.statusText}`);
    }

    const data: FetchMenuResponse = await response.json();
    console.log("Fetched menu:", data);
    return data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};
