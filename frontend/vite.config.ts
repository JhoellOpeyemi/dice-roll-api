import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // The real API Gateway base URL lives in VITE_API_BASE_URL (no trailing slash).
  // During local dev the Vite proxy rewrites /api/* -> the Lambda endpoint so
  // there are no CORS issues. Set this in a .env.local file:
  //   VITE_API_BASE_URL=https://<id>.execute-api.us-east-1.amazonaws.com/Prod
  const apiTarget = env.VITE_API_BASE_URL ?? "https://localhost";

  return {
    plugins: [react()],
    server: {
      proxy: {
        // /api/roll?... -> https://<api-id>.execute-api.us-east-1.amazonaws.com/Prod/roll?...
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
