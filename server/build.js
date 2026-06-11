/* Publish pipeline: runs `astro build` into a staging directory, then
   atomically swaps it in as dist/. Builds are queued — saving while a
   build runs schedules exactly one follow-up build. */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const STAGING = path.join(ROOT, ".dist-staging");
const OLD = path.join(ROOT, ".dist-old");

export const buildState = {
  status: fs.existsSync(DIST) ? "idle" : "never-built", // idle | building | error
  startedAt: null,
  finishedAt: null,
  lastError: null,
  pending: false
};

export function triggerBuild() {
  if (buildState.status === "building") {
    buildState.pending = true;
    return;
  }
  run();
}

function run() {
  buildState.status = "building";
  buildState.startedAt = new Date().toISOString();
  buildState.lastError = null;

  fs.rmSync(STAGING, { recursive: true, force: true });
  const astroBin = path.join(ROOT, "node_modules", "astro", "bin", "astro.mjs");
  const child = spawn(process.execPath, [astroBin, "build", "--outDir", STAGING], {
    cwd: ROOT,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"]
  });

  let output = "";
  child.stdout.on("data", (d) => (output += d));
  child.stderr.on("data", (d) => (output += d));

  child.on("close", (code) => {
    if (code === 0) {
      try {
        fs.rmSync(OLD, { recursive: true, force: true });
        if (fs.existsSync(DIST)) fs.renameSync(DIST, OLD);
        fs.renameSync(STAGING, DIST);
        fs.rmSync(OLD, { recursive: true, force: true });
        buildState.status = "idle";
      } catch (err) {
        buildState.status = "error";
        buildState.lastError = `Build succeeded but swapping dist/ failed: ${err.message}`;
      }
    } else {
      buildState.status = "error";
      buildState.lastError = output.split("\n").slice(-25).join("\n");
    }
    buildState.finishedAt = new Date().toISOString();
    if (buildState.pending) {
      buildState.pending = false;
      run();
    }
  });
}
