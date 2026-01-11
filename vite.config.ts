import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

const host = new URL(process.env.SHOPIFY_APP_URL || "http://localhost")
  .hostname;

let hmrConfig;

if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host: host,
    port: parseInt(process.env.FRONTEND_PORT!) || 8002,
    clientPort: 443,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.PORT),
    allowedHosts: true,
    hmr: hmrConfig,
    cors: {
      preflightContinue: true,
    },
  },
  plugins: [preact()],
});
