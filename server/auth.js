/* Session auth for /admin: bcrypt passwords, opaque session tokens in
   SQLite, per-session CSRF tokens, and login rate limiting. */
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "./db.js";

const SESSION_DAYS = 14;
const COOKIE = "kd_session";

export function createUser(email, name, password) {
  const hash = bcrypt.hashSync(password, 12);
  return db
    .prepare("INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)")
    .run(email.toLowerCase().trim(), name.trim(), hash);
}

export function verifyUser(email, password) {
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase().trim());
  if (!user) return null;
  return bcrypt.compareSync(password, user.password_hash) ? user : null;
}

export function changePassword(userId, password) {
  const hash = bcrypt.hashSync(password, 12);
  db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, userId);
  db.prepare("DELETE FROM sessions WHERE user_id = ?").run(userId);
}

export function startSession(res, userId) {
  const token = crypto.randomBytes(32).toString("hex");
  const csrf = crypto.randomBytes(16).toString("hex");
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
  db.prepare("INSERT INTO sessions (token, user_id, csrf, expires_at) VALUES (?, ?, ?, ?)")
    .run(token, userId, csrf, expires.toISOString());
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    expires,
    path: "/"
  });
}

export function endSession(req, res) {
  const token = req.cookies?.[COOKIE];
  if (token) db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
  res.clearCookie(COOKIE, { path: "/" });
}

function sessionFor(req) {
  const token = req.cookies?.[COOKIE];
  if (!token) return null;
  const row = db
    .prepare(
      `SELECT s.token, s.csrf, u.id AS user_id, u.email, u.name
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now')`
    )
    .get(token);
  return row || null;
}

/* Express middleware: attaches req.admin or redirects to the login page.
   POST/PUT/DELETE additionally require the session's CSRF token. */
export function requireAdmin(req, res, next) {
  const session = sessionFor(req);
  if (!session) {
    if (req.method === "GET") return res.redirect("/admin/login");
    return res.status(401).json({ error: "Not logged in" });
  }
  if (req.method !== "GET") {
    const sent = req.body?._csrf || req.get("x-csrf-token");
    if (sent !== session.csrf) return res.status(403).json({ error: "Bad CSRF token" });
  }
  req.admin = session;
  next();
}

export function currentAdmin(req) {
  return sessionFor(req);
}

/* Login rate limiting: 8 attempts per IP per 15 minutes. */
const attempts = new Map();
export function loginAllowed(ip) {
  const now = Date.now();
  const list = (attempts.get(ip) || []).filter((t) => now - t < 15 * 60e3);
  attempts.set(ip, list);
  return list.length < 8;
}
export function recordLoginFailure(ip) {
  const list = attempts.get(ip) || [];
  list.push(Date.now());
  attempts.set(ip, list);
}
