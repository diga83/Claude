/* Public JSON API used by the static pages: comments and newsletter signup.
   Spam defenses: honeypot field, minimum fill time, per-IP rate limit. */
import express from "express";
import { db } from "./db.js";

export const api = express.Router();
api.use(express.json({ limit: "32kb" }));

/* simple per-IP limiter: max N posts per hour across the public endpoints */
const hits = new Map();
function limited(ip, max = 12) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 3600e3);
  if (list.length >= max) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

const VALID_PATH = /^\/(blog\/)?[a-z0-9-]+(\/[a-z0-9-]+)?\/$/;

api.get("/comments", (req, res) => {
  const path = String(req.query.path || "");
  if (!VALID_PATH.test(path)) return res.status(400).json({ error: "Bad path" });
  const rows = db
    .prepare("SELECT author, body, created_at FROM comments WHERE path=? AND status='approved' ORDER BY id")
    .all(path);
  res.json({ comments: rows });
});

api.post("/comments", (req, res) => {
  const { path, author, body, website, t } = req.body || {};
  if (website) return res.json({ ok: true }); // honeypot: pretend success
  if (t && Date.now() - Number(t) < 3000) return res.json({ ok: true }); // filled too fast = bot
  if (!VALID_PATH.test(String(path || ""))) return res.status(400).json({ error: "Bad path" });
  const name = String(author || "").trim().slice(0, 60);
  const text = String(body || "").trim().slice(0, 2000);
  if (!name || text.length < 3) return res.status(400).json({ error: "Name and comment are required" });
  if (limited(req.ip)) return res.status(429).json({ error: "Too many submissions — try again later" });
  db.prepare("INSERT INTO comments (path, author, body) VALUES (?, ?, ?)").run(path, name, text);
  res.json({ ok: true, message: "Thanks! Your comment will appear once it's approved." });
});

api.post("/subscribe", (req, res) => {
  const { email, website } = req.body || {};
  if (website) return res.json({ ok: true });
  const addr = String(email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(addr) || addr.length > 200)
    return res.status(400).json({ error: "That doesn't look like an email address" });
  if (limited(req.ip)) return res.status(429).json({ error: "Too many submissions — try again later" });
  db.prepare("INSERT OR IGNORE INTO subscribers (email) VALUES (?)").run(addr);
  res.json({ ok: true, message: "You're on the list! 🐾" });
});
