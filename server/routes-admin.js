/* All /admin routes: setup, login, dashboard, blog posts, encyclopedia,
   comments moderation, subscribers, account, publish. */
import express from "express";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import multer from "multer";
import { marked } from "marked";
import { db, hasUsers } from "./db.js";
import {
  createUser, verifyUser, changePassword, startSession, endSession,
  requireAdmin, currentAdmin, loginAllowed, recordLoginFailure
} from "./auth.js";
import { layout, esc, field } from "./ui.js";
import {
  listPosts, readPost, writePost, deletePost, slugify,
  listCategories, readCategory, saveEntry, deleteEntry
} from "./content.js";
import { buildState, triggerBuild } from "./build.js";

export const admin = express.Router();
admin.use(express.urlencoded({ extended: true, limit: "2mb" }));
admin.use(express.json({ limit: "2mb" }));

admin.use("/assets", express.static(path.join(process.cwd(), "server", "static")));

const page = (req, res, opts) =>
  res.send(layout({ admin: req.admin, csrf: req.admin?.csrf ?? "", msg: req.query.msg, error: req.query.err, ...opts }));

const back = (res, url, msg, err) =>
  res.redirect(`${url}?${err ? `err=${encodeURIComponent(err)}` : `msg=${encodeURIComponent(msg)}`}`);

/* ---------- first-run setup + login (no session required) ---------- */

admin.get("/setup", (req, res) => {
  if (hasUsers()) return res.redirect("/admin/login");
  res.send(layout({
    title: "Welcome", error: req.query.err,
    body: `<div class="auth-card"><h1>Set up your admin account</h1>
    <p>This runs once: create the account you'll use to log in at <code>/admin</code>.</p>
    <form method="post" action="/admin/setup">
      ${field("Your name", `<input name="name" required maxlength="80" />`)}
      ${field("Email (your login)", `<input name="email" type="email" required maxlength="200" />`)}
      ${field("Password", `<input name="password" type="password" required minlength="10" />`, "At least 10 characters.")}
      <button class="btn" type="submit">Create account</button>
    </form></div>`
  }));
});

admin.post("/setup", (req, res) => {
  if (hasUsers()) return res.redirect("/admin/login");
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.includes("@") || (password || "").length < 10)
    return back(res, "/admin/setup", "", "Check the fields: valid email and a 10+ character password required.");
  const result = createUser(email, name, password);
  startSession(res, result.lastInsertRowid);
  res.redirect("/admin?msg=" + encodeURIComponent("Welcome! Your admin account is ready."));
});

admin.get("/login", (req, res) => {
  if (!hasUsers()) return res.redirect("/admin/setup");
  if (currentAdmin(req)) return res.redirect("/admin");
  res.send(layout({
    title: "Log in", error: req.query.err,
    body: `<div class="auth-card"><h1>🐱 KittyDrama admin</h1>
    <form method="post" action="/admin/login">
      ${field("Email", `<input name="email" type="email" required autofocus />`)}
      ${field("Password", `<input name="password" type="password" required />`)}
      <button class="btn" type="submit">Log in</button>
    </form></div>`
  }));
});

admin.post("/login", (req, res) => {
  const ip = req.ip;
  if (!loginAllowed(ip))
    return back(res, "/admin/login", "", "Too many attempts — wait 15 minutes and try again.");
  const user = verifyUser(req.body.email || "", req.body.password || "");
  if (!user) {
    recordLoginFailure(ip);
    return back(res, "/admin/login", "", "Wrong email or password.");
  }
  startSession(res, user.id);
  res.redirect("/admin");
});

/* ---------- everything below requires a session ---------- */
admin.use(requireAdmin);

admin.post("/logout", (req, res) => {
  endSession(req, res);
  res.redirect("/admin/login");
});

/* ---------- dashboard ---------- */

admin.get("/", (req, res) => {
  const posts = listPosts();
  const cats = listCategories();
  const entries = cats.reduce((n, c) => n + c.entries.length, 0);
  const pending = db.prepare("SELECT COUNT(*) n FROM comments WHERE status='pending'").get().n;
  const subs = db.prepare("SELECT COUNT(*) n FROM subscribers").get().n;
  page(req, res, {
    title: "Dashboard", active: "/admin",
    body: `<h1>Dashboard</h1>
    <div class="stat-grid">
      <a class="stat" href="/admin/posts"><strong>${posts.length}</strong><span>blog posts</span></a>
      <a class="stat" href="/admin/encyclopedia"><strong>${entries}</strong><span>encyclopedia answers</span></a>
      <a class="stat ${pending ? "alert" : ""}" href="/admin/comments"><strong>${pending}</strong><span>comments awaiting review</span></a>
      <a class="stat" href="/admin/subscribers"><strong>${subs}</strong><span>newsletter subscribers</span></a>
    </div>
    <h2>How publishing works</h2>
    <p class="muted">Content edits are saved instantly, but the public site is a set of pre-built pages —
    click <strong>Publish site</strong> (left sidebar) to regenerate it with your latest changes.
    Saving a post or answer with “Publish now” checked does this automatically.
    Comments and subscribers are live immediately and never need a publish.</p>`
  });
});

/* ---------- publish + build status ---------- */

admin.post("/publish", (req, res) => {
  triggerBuild();
  back(res, req.get("referer")?.includes("/admin") ? new URL(req.get("referer")).pathname : "/admin",
    "Publishing… the site refreshes in about 10 seconds.");
});

admin.get("/api/build-status", (req, res) => res.json(buildState));

admin.post("/api/preview", (req, res) => {
  res.json({ html: marked.parse(String(req.body.md || "")) });
});

/* ---------- image uploads ---------- */

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(process.cwd(), "public", "images", "blog");
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const base = slugify(path.basename(file.originalname, ext)) || "image";
      cb(null, `${base}-${crypto.randomBytes(3).toString("hex")}${ext}`);
    }
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    cb(null, [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"].includes(path.extname(file.originalname).toLowerCase()))
});

admin.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image (allowed: jpg, png, gif, webp, svg, avif; max 8 MB)" });
  res.json({ url: `/images/blog/${req.file.filename}` });
});

/* ---------- blog posts ---------- */

admin.get("/posts", (req, res) => {
  const rows = listPosts().map((p) => `<tr>
    <td><a href="/admin/posts/${esc(p.slug)}"><strong>${esc(p.title || p.slug)}</strong></a>
      ${p.draft ? '<span class="badge">draft</span>' : ""}</td>
    <td class="muted">${esc(String(p.pubDate || ""))}</td>
    <td><a class="btn small ghost" target="_blank" rel="noopener" href="/blog/${esc(p.slug)}/">View ↗</a></td>
  </tr>`).join("");
  page(req, res, {
    title: "Blog posts", active: "/admin/posts",
    body: `<div class="page-head"><h1>Blog posts</h1>
      <a class="btn" href="/admin/posts/new">＋ New post</a></div>
    <table class="list"><tbody>${rows || `<tr><td class="muted">No posts yet.</td></tr>`}</tbody></table>`
  });
});

function postForm(req, res, post, { isNew }) {
  const action = isNew ? "/admin/posts/new" : `/admin/posts/${esc(post.slug)}`;
  page(req, res, {
    title: isNew ? "New post" : `Edit: ${post.title}`, active: "/admin/posts",
    body: `<div class="page-head"><h1>${isNew ? "New post" : "Edit post"}</h1>
      ${isNew ? "" : `<form method="post" action="/admin/posts/${esc(post.slug)}/delete" data-confirm="Delete this post permanently?">
        <input type="hidden" name="_csrf" value="${esc(req.admin.csrf)}" />
        <button class="btn danger" type="submit">Delete</button></form>`}</div>
    <form method="post" action="${action}" class="editor-form">
      <input type="hidden" name="_csrf" value="${esc(req.admin.csrf)}" />
      <input type="hidden" name="previousSlug" value="${esc(isNew ? "" : post.slug)}" />
      <div class="form-cols">
        ${field("Title", `<input name="title" required maxlength="160" value="${esc(post.title)}" data-slug-source />`)}
        ${field("URL slug", `<input name="slug" maxlength="80" value="${esc(post.slug)}" data-slug-target pattern="[a-z0-9][a-z0-9-]*" />`, "Lowercase letters, numbers, dashes. Leave blank to derive from the title.")}
      </div>
      ${field("Description", `<textarea name="description" rows="2" required maxlength="300">${esc(post.description)}</textarea>`, "Shown in post cards, search engines, and social shares. Aim for 120–155 characters.")}
      <div class="form-cols">
        ${field("Publish date", `<input name="pubDate" type="date" required value="${esc(String(post.pubDate || "").slice(0, 10))}" />`)}
        ${field("Tags", `<input name="tags" value="${esc((post.tags || []).join(", "))}" />`, "Comma-separated.")}
      </div>
      ${field("Hero image", `<div class="upload-row"><input name="heroImage" value="${esc(post.heroImage || "")}" placeholder="/images/blog/…" />
        <button class="btn ghost small" type="button" data-upload-to="heroImage">Upload…</button></div>`, "Optional. Landscape (16:9) looks best.")}
      <div class="editor-split">
        ${field("Body (markdown)", `<textarea name="body" id="md-body" rows="22">${esc(post.body)}</textarea>
          <div class="editor-tools"><button class="btn ghost small" type="button" data-upload-insert>Insert image…</button>
          <span class="hint">**bold**, *italic*, ## heading, [link](/url), - list</span></div>`)}
        <div class="field"><span class="field-label">Preview</span><div id="md-preview" class="md-preview muted">Start typing…</div></div>
      </div>
      <div class="form-actions">
        <label class="check"><input type="checkbox" name="draft" ${post.draft ? "checked" : ""} /> Draft (hidden from the public site)</label>
        <label class="check"><input type="checkbox" name="publishNow" checked /> Publish site after saving</label>
        <button class="btn" type="submit">Save post</button>
      </div>
    </form>`
  });
}

admin.get("/posts/new", (req, res) =>
  postForm(req, res, { slug: "", title: "", description: "", pubDate: new Date().toISOString().slice(0, 10), tags: [], heroImage: "", draft: false, body: "" }, { isNew: true }));

admin.get("/posts/:slug", (req, res) => {
  const post = readPost(req.params.slug);
  if (!post) return res.redirect("/admin/posts?err=Post+not+found");
  postForm(req, res, post, { isNew: false });
});

function handlePostSave(req, res) {
  try {
    const b = req.body;
    const slug = (b.slug || "").trim() || slugify(b.title);
    writePost(slug, {
      title: b.title, description: b.description, pubDate: b.pubDate,
      heroImage: (b.heroImage || "").trim(), draft: Boolean(b.draft),
      tags: String(b.tags || "").split(",").map((t) => t.trim()).filter(Boolean)
    }, b.body || "", { previousSlug: b.previousSlug || undefined });
    if (b.publishNow) triggerBuild();
    back(res, `/admin/posts/${slug}`, b.publishNow ? "Saved — publishing now." : "Saved (not yet published).");
  } catch (err) {
    back(res, req.path === "/posts/new" ? "/admin/posts/new" : `/admin${req.path}`, "", err.message);
  }
}
admin.post("/posts/new", handlePostSave);
admin.post("/posts/:slug", handlePostSave);

admin.post("/posts/:slug/delete", (req, res) => {
  deletePost(req.params.slug);
  triggerBuild();
  back(res, "/admin/posts", "Post deleted — publishing the change.");
});

/* ---------- encyclopedia ---------- */

admin.get("/encyclopedia", (req, res) => {
  const rows = listCategories().map((c) => `<tr>
    <td><a href="/admin/encyclopedia/${esc(c.slug)}"><strong>${esc(c.name)}</strong></a></td>
    <td class="muted">${c.entries.length} answers</td>
    <td><a class="btn small ghost" target="_blank" rel="noopener" href="/${esc(c.slug)}/">View ↗</a></td>
  </tr>`).join("");
  page(req, res, {
    title: "Encyclopedia", active: "/admin/encyclopedia",
    body: `<h1>Encyclopedia</h1><p class="muted">14 topics, every answer editable.</p>
    <table class="list"><tbody>${rows}</tbody></table>`
  });
});

admin.get("/encyclopedia/:cat", (req, res) => {
  const cat = readCategory(req.params.cat);
  if (!cat) return res.redirect("/admin/encyclopedia?err=Unknown+topic");
  const rows = cat.entries.map((e) => `<tr data-filter="${esc((e.q + " " + (e.tags || []).join(" ")).toLowerCase())}">
    <td><a href="/admin/encyclopedia/${esc(cat.slug)}/${esc(e.id)}">${esc(e.q)}</a></td>
    <td><a class="btn small ghost" target="_blank" rel="noopener" href="/${esc(cat.slug)}/${esc(e.id)}/">View ↗</a></td>
  </tr>`).join("");
  page(req, res, {
    title: cat.name, active: "/admin/encyclopedia",
    body: `<div class="page-head"><h1>${esc(cat.name)}</h1>
      <a class="btn" href="/admin/encyclopedia/${esc(cat.slug)}/new">＋ New question</a></div>
    <input class="filter" type="search" placeholder="Filter ${cat.entries.length} questions…" data-filter-rows />
    <table class="list"><tbody>${rows}</tbody></table>`
  });
});

function entryForm(req, res, cat, entry, { isNew }) {
  const action = isNew
    ? `/admin/encyclopedia/${esc(cat.slug)}/new`
    : `/admin/encyclopedia/${esc(cat.slug)}/${esc(entry.id)}`;
  page(req, res, {
    title: isNew ? "New question" : entry.q, active: "/admin/encyclopedia",
    body: `<p class="muted"><a href="/admin/encyclopedia/${esc(cat.slug)}">← ${esc(cat.name)}</a></p>
    <div class="page-head"><h1>${isNew ? "New question" : "Edit question"}</h1>
      ${isNew ? "" : `<form method="post" action="${action}/delete" data-confirm="Delete this question permanently? Its page will disappear from the site.">
        <input type="hidden" name="_csrf" value="${esc(req.admin.csrf)}" />
        <button class="btn danger" type="submit">Delete</button></form>`}</div>
    <form method="post" action="${action}" class="editor-form">
      <input type="hidden" name="_csrf" value="${esc(req.admin.csrf)}" />
      ${field("Question", `<input name="q" required maxlength="200" value="${esc(entry.q)}" ${isNew ? "data-slug-source" : ""} />`)}
      ${isNew ? field("URL slug", `<input name="id" required maxlength="80" value="${esc(entry.id)}" data-slug-target pattern="[a-z0-9][a-z0-9-]*" />`, "Becomes the page URL — can't easily change later without breaking links.") : ""}
      ${field("Answer", `<textarea name="a" rows="10" required>${esc(entry.a)}</textarea>`, "Plain text. Lead with the direct answer; keep it tight.")}
      ${field("Search tags", `<input name="tags" value="${esc((entry.tags || []).join(", "))}" />`, "Comma-separated phrases people might search for.")}
      <div class="form-actions">
        <label class="check"><input type="checkbox" name="publishNow" checked /> Publish site after saving</label>
        <button class="btn" type="submit">Save</button>
      </div>
    </form>`
  });
}

admin.get("/encyclopedia/:cat/new", (req, res) => {
  const cat = readCategory(req.params.cat);
  if (!cat) return res.redirect("/admin/encyclopedia?err=Unknown+topic");
  entryForm(req, res, cat, { id: "", q: "", a: "", tags: [] }, { isNew: true });
});

admin.get("/encyclopedia/:cat/:id", (req, res) => {
  const cat = readCategory(req.params.cat);
  const entry = cat?.entries.find((e) => e.id === req.params.id);
  if (!entry) return res.redirect("/admin/encyclopedia?err=Not+found");
  entryForm(req, res, cat, entry, { isNew: false });
});

admin.post("/encyclopedia/:cat/new", (req, res) => {
  const id = (req.body.id || "").trim() || slugify(req.body.q);
  try {
    saveEntry(req.params.cat, id, req.body, { isNew: true });
    if (req.body.publishNow) triggerBuild();
    back(res, `/admin/encyclopedia/${req.params.cat}/${id}`, "Question added.");
  } catch (err) {
    back(res, `/admin/encyclopedia/${req.params.cat}/new`, "", err.message);
  }
});

admin.post("/encyclopedia/:cat/:id", (req, res) => {
  try {
    saveEntry(req.params.cat, req.params.id, req.body, { isNew: false });
    if (req.body.publishNow) triggerBuild();
    back(res, `/admin/encyclopedia/${req.params.cat}/${req.params.id}`, "Saved.");
  } catch (err) {
    back(res, `/admin/encyclopedia/${req.params.cat}/${req.params.id}`, "", err.message);
  }
});

admin.post("/encyclopedia/:cat/:id/delete", (req, res) => {
  deleteEntry(req.params.cat, req.params.id);
  triggerBuild();
  back(res, `/admin/encyclopedia/${req.params.cat}`, "Question deleted — publishing the change.");
});

/* ---------- comments moderation ---------- */

admin.get("/comments", (req, res) => {
  const render = (rows, actions) => rows.map((c) => `<div class="comment-card">
    <div class="comment-head"><strong>${esc(c.author)}</strong>
      <span class="muted">on <a href="${esc(c.path)}" target="_blank" rel="noopener">${esc(c.path)}</a> · ${esc(c.created_at)} UTC</span></div>
    <p>${esc(c.body)}</p>
    <div class="comment-actions">${actions(c)}</div>
  </div>`).join("");
  const csrfInput = `<input type="hidden" name="_csrf" value="${esc(req.admin.csrf)}" />`;
  const pending = db.prepare("SELECT * FROM comments WHERE status='pending' ORDER BY id DESC").all();
  const approved = db.prepare("SELECT * FROM comments WHERE status='approved' ORDER BY id DESC LIMIT 50").all();
  page(req, res, {
    title: "Comments", active: "/admin/comments",
    body: `<h1>Comments</h1>
    <h2>Awaiting review (${pending.length})</h2>
    ${render(pending, (c) => `
      <form method="post" action="/admin/comments/${c.id}/approve">${csrfInput}<button class="btn small" type="submit">Approve</button></form>
      <form method="post" action="/admin/comments/${c.id}/delete">${csrfInput}<button class="btn small danger" type="submit">Delete</button></form>`) || `<p class="muted">Nothing waiting — nice.</p>`}
    <h2>Recently approved</h2>
    ${render(approved, (c) => `
      <form method="post" action="/admin/comments/${c.id}/delete">${csrfInput}<button class="btn small danger" type="submit">Remove</button></form>`) || `<p class="muted">None yet.</p>`}`
  });
});

admin.post("/comments/:id/approve", (req, res) => {
  db.prepare("UPDATE comments SET status='approved' WHERE id=?").run(req.params.id);
  back(res, "/admin/comments", "Approved — it's live on the page now.");
});

admin.post("/comments/:id/delete", (req, res) => {
  db.prepare("DELETE FROM comments WHERE id=?").run(req.params.id);
  back(res, "/admin/comments", "Deleted.");
});

/* ---------- subscribers ---------- */

admin.get("/subscribers", (req, res) => {
  const subs = db.prepare("SELECT * FROM subscribers ORDER BY id DESC").all();
  page(req, res, {
    title: "Subscribers", active: "/admin/subscribers",
    body: `<div class="page-head"><h1>Newsletter subscribers (${subs.length})</h1>
      <a class="btn ghost" href="/admin/subscribers.csv">Export CSV</a></div>
    <table class="list"><tbody>${subs.map((s) => `<tr><td>${esc(s.email)}</td>
      <td class="muted">${esc(s.created_at)} UTC</td>
      <td><form method="post" action="/admin/subscribers/${s.id}/delete">
        <input type="hidden" name="_csrf" value="${esc(req.admin.csrf)}" />
        <button class="btn small danger" type="submit">Remove</button></form></td></tr>`).join("") ||
      `<tr><td class="muted">No subscribers yet — the signup form is in the site footer.</td></tr>`}</tbody></table>`
  });
});

admin.get("/subscribers.csv", (req, res) => {
  const subs = db.prepare("SELECT email, created_at FROM subscribers ORDER BY id").all();
  res.type("text/csv").attachment("kittydrama-subscribers.csv")
    .send("email,subscribed_at\n" + subs.map((s) => `${s.email},${s.created_at}`).join("\n"));
});

admin.post("/subscribers/:id/delete", (req, res) => {
  db.prepare("DELETE FROM subscribers WHERE id=?").run(req.params.id);
  back(res, "/admin/subscribers", "Removed.");
});

/* ---------- account ---------- */

admin.get("/account", (req, res) => {
  page(req, res, {
    title: "Account", active: "/admin/account",
    body: `<h1>Account</h1>
    <p class="muted">Logged in as <strong>${esc(req.admin.name)}</strong> (${esc(req.admin.email)})</p>
    <form method="post" action="/admin/account/password" class="editor-form narrow">
      <input type="hidden" name="_csrf" value="${esc(req.admin.csrf)}" />
      ${field("Current password", `<input name="current" type="password" required />`)}
      ${field("New password", `<input name="password" type="password" required minlength="10" />`, "At least 10 characters. Changing it logs out all sessions.")}
      <button class="btn" type="submit">Change password</button>
    </form>`
  });
});

admin.post("/account/password", (req, res) => {
  if (!verifyUser(req.admin.email, req.body.current || ""))
    return back(res, "/admin/account", "", "Current password is wrong.");
  if ((req.body.password || "").length < 10)
    return back(res, "/admin/account", "", "New password must be at least 10 characters.");
  changePassword(req.admin.user_id, req.body.password);
  res.redirect("/admin/login?msg=" + encodeURIComponent("Password changed — log in again."));
});
