import axios from "axios";

// SECURITY UPDATE: The API address may be public, but credentials must never be placed in a VITE_* variable.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Local value: http://localhost/my-projects/agma/agma-api/index.php
  timeout: 15000, // Stop requests that hang instead of leaving the form waiting forever.
  headers: {
    "Content-Type": "application/json", // The CodeIgniter API reads JSON from php://input.
    Accept: "application/json", // Ask the API to return JSON consistently.
  },
});

export default api;
