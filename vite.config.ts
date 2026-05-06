import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const repoNameFromGitHub = process.env.GITHUB_REPOSITORY?.split("/")[1];
const derivedGhBase = repoNameFromGitHub ? `/${repoNameFromGitHub}/` : "/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Default root deployment uses "/", while GitHub Pages project deployments
  // should use "/<repo-name>/" (overridable via VITE_GH_PAGES_BASE).
  base: mode === "gh-pages" ? process.env.VITE_GH_PAGES_BASE || derivedGhBase : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
