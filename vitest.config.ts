import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  alias: {
    "~/": path.join(__dirname, "src", path.sep),
  },
  test: {
    environment: "node",
  },
});
