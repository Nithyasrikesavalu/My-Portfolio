/**
 * Centralized API and Deployment Configuration.
 * Handles environment-aware endpoints for both local development and production.
 */

export const DEPLOYMENT_URLS = {
  frontend: "https://my-portfolio-jade-seven-49.vercel.app/",
  backend: "https://my-portfolio-0os5.onrender.com",
  github: "https://github.com/Nithyasrikesavalu/My-Portfolio",
};

/**
 * Resolves the backend base API URL.
 * - Prioritizes VITE_API_URL environment variable if set.
 * - In production mode (e.g. Vercel deployment), falls back to the deployed Render backend URL.
 * - In development mode (e.g. localhost:5173), falls back to "" so Vite's proxy (/api -> localhost:3000) handles it.
 */
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === "string" && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, "");
  }

  if (import.meta.env.PROD) {
    return DEPLOYMENT_URLS.backend;
  }

  return "";
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  contact: `${API_BASE_URL}/api/contact`,
};
