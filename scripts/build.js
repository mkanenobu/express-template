const { execSync } = require("child_process");
const path = require("path");
const { build } = require("esbuild");

const gitRoot = execSync("git rev-parse --show-toplevel").toString().trim();
const distDir = path.join(gitRoot, "dist");

const availableEnvValues = ["development", "production"];

const env = availableEnvValues.includes(process.env.NODE_ENV)
  ? process.env.NODE_ENV
  : "production";

/**
 * @type {{development: import("esbuild").BuildOptions, production: import("esbuild").BuildOptions}}
 */
const paramsByEnv = {
  development: {
    watch: {
      onRebuild: (failureErrors, result) => {
        console.info(
          "build log: ",
          failureErrors
            ? { error: failureErrors }
            : { errors: result.errors, warnings: result.warnings }
        );
      },
    },
    outfile: path.join(distDir, "dev.js"),
  },
  production: {
    outfile: path.join(distDir, "app.js"),
  },
};

build({
  entryPoints: [path.join(gitRoot, "src", "app.ts")],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "node",
  target: "node16",
  format: "cjs",
  define: {
    "process.env.NODE_ENV": JSON.stringify(env),
  },
  ...paramsByEnv[env],
})
  .then((buildResult) => {
    const { warnings, errors } = buildResult;
    console.info({ warnings, errors });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
