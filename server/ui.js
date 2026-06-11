/* Server-rendered admin UI: a layout shell plus small render helpers.
   No client framework — forms post back, a sprinkle of JS (admin.js)
   handles preview, uploads, and build status. */

export function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const NAV = [
  ["/admin", "Dashboard", "M3 12 12 3l9 9M5 10v10h5v-6h4v6h5V10"],
  ["/admin/posts", "Blog posts", "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5"],
  ["/admin/encyclopedia", "Encyclopedia", "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"],
  ["/admin/comments", "Comments", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  ["/admin/subscribers", "Subscribers", "M4 4h16v16H4zM4 7l8 6 8-6"],
  ["/admin/account", "Account", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"]
];

function navIcon(d) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
}

export function layout({ title, active = "", admin = null, msg = "", error = "", body, csrf = "" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${esc(title)} — KittyDrama Admin</title>
<link rel="stylesheet" href="/admin/assets/admin.css" />
<meta name="csrf" content="${esc(csrf)}" />
</head>
<body>
${admin ? `<aside class="side">
  <div class="side-brand">🐱 <strong>KittyDrama</strong> admin</div>
  <nav>
    ${NAV.map(([href, label, d]) =>
      `<a href="${href}" class="${active === href ? "active" : ""}">${navIcon(d)}${label}</a>`
    ).join("\n")}
  </nav>
  <div class="side-foot">
    <div id="build-pill" class="pill" data-state="unknown">checking…</div>
    <form method="post" action="/admin/publish"><input type="hidden" name="_csrf" value="${esc(csrf)}" />
      <button class="btn small" type="submit">Publish site</button></form>
    <a href="/" target="_blank" rel="noopener">View site ↗</a>
    <form method="post" action="/admin/logout"><input type="hidden" name="_csrf" value="${esc(csrf)}" />
      <button class="linklike" type="submit">Log out (${esc(admin.name)})</button></form>
  </div>
</aside>` : ""}
<main class="${admin ? "with-side" : "solo"}">
  ${msg ? `<div class="flash ok">${esc(msg)}</div>` : ""}
  ${error ? `<div class="flash err">${esc(error)}</div>` : ""}
  ${body}
</main>
<script src="/admin/assets/admin.js" defer></script>
</body>
</html>`;
}

export function field(label, inner, hint = "") {
  return `<label class="field"><span class="field-label">${esc(label)}</span>${inner}${hint ? `<span class="hint">${esc(hint)}</span>` : ""}</label>`;
}
