/**
 * Returns the full URL for an API path.
 *
 * - In development: VITE_API_BASE_URL is not set → returns path as-is so
 *   Vite's dev-proxy (/api → localhost:8080) handles it transparently.
 * - In production (Vercel): set VITE_API_BASE_URL to your Render backend URL
 *   e.g. https://your-app.onrender.com  (no trailing slash)
 *   Then this function prepends it so the call reaches Render directly.
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
