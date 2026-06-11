/* KittyDrama server — the cPanel Node.js app entry point.
   Serves the pre-built static site from dist/, the admin backend at /admin,
   and the public API (comments, newsletter) at /api. */
import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";
import fs from "node:fs";
import { admin } from "./server/routes-admin.js";
import { api } from "./server/routes-api.js";
import { buildState, triggerBuild } from "./server/build.js";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const app = express();

app.set("trust proxy", true); // cPanel runs the app behind Apache/Passenger
app.disable("x-powered-by");
app.use(cookieParser());

app.use("/admin", admin);
app.use("/api", api);

/* The static site. Uploaded images are served from public/ as a fallback so
   they work in the editor immediately, before the next publish copies them
   into dist/. */
app.use(express.static(DIST, { extensions: ["html"] }));
app.use("/images", express.static(path.join(ROOT, "public", "images")));

app.use((req, res) => {
  if (buildState.status === "building" || buildState.status === "never-built") {
    return res.status(503).send(
      `<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="5">
       <title>One moment…</title>
       <body style="font-family:system-ui;display:grid;place-items:center;min-height:90vh">
       <p>🐱 The site is being generated — this page refreshes automatically.</p></body>`
    );
  }
  const notFound = path.join(DIST, "404.html");
  if (fs.existsSync(notFound)) return res.status(404).sendFile(notFound);
  res.status(404).send("Not found");
});

/* First boot on a fresh server: generate the site if dist/ doesn't exist. */
if (!fs.existsSync(DIST)) triggerBuild();

const port = process.env.PORT || 4321;
app.listen(port, () => console.log(`KittyDrama server listening on port ${port}`));
