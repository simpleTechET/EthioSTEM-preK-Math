import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: '/ESTEM-preK-Math/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // Set base to the repository name so built assets use the correct subpath
// export default defineConfig({
//   base: '/ESTEM-preK-Math/',
//   plugins: [react()],
// })
