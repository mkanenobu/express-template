import path from "path";
import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

export default defineConfig({
  clearScreen: false,
  server: {
    port,
  },
  define: {
    "process.env.PORT": JSON.stringify(port),
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: path.join("src", "app.ts"),
      exportName: "app",
      tsCompiler: "esbuild",
    }),
  ],
});
