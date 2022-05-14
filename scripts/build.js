const { execSync } = require("child_process");
const path = require("path");
const { build } = require("esbuild");

const gitRoot = execSync("git rev-parse --show-toplevel").toString().trim();
const distDir = path.join(gitRoot, "dist");

const availableEnvValues = ["development", "production", "test"];

const env = availableEnvValues.includes(process.env.NODE_ENV)
  ? process.env.NODE_ENV
  : "development";

/**
 * @type {{development: import("esbuild").BuildOptions, production: import("esbuild").BuildOptions}}
 */
const paramsByEnv = {
  development: {
    watch: {
      onRebuild: (error, result) => {
        console.log("Rebuild: ", { error, result });
      },
    },
    outfile: path.join(distDir, "dev-index.js"),
  },
  production: {
    outfile: path.join(distDir, "index.js"),
  },
};

build({
  entryPoints: [path.join(gitRoot, "src", "app.ts")],
  bundle: true,
  minify: false,
  sourcemap: true,
  platform: "node",
  external: [path.join(gitRoot, "node_modules", "*")],
  target: "node16",
  format: "cjs",
  define: {
    "process.env.NODE_ENV": JSON.stringify(env),
  },
  ...paramsByEnv[env],
})
  .then((buildResult) => {
    const { warnings, errors } = buildResult;
    console.log({ warnings, errors });
  })
  .catch(() => process.exit(1));
