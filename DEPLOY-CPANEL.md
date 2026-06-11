# Deploying KittyDrama on cPanel (Setup Node.js App)

One Node.js application serves everything: the static site, the `/admin` backend, and the `/api` endpoints. Total time: ~15 minutes.

## 1. Get the code onto the server

Either:

- **Git (recommended)**: cPanel → **Git Version Control** → Create → clone this repository. Note the repository path (e.g. `/home/YOURUSER/repositories/kittydrama`).
- **Zip upload**: cPanel → **File Manager** → upload the project zip into a folder *outside* `public_html` (e.g. `/home/YOURUSER/kittydrama`) and extract it. Don't put it in `public_html` — the Node app serves the site itself.

## 2. Create the Node.js app

cPanel → **Setup Node.js App** → **Create Application**:

| Setting | Value |
|---|---|
| Node.js version | **20 or 22** (latest available) |
| Application mode | **Production** |
| Application root | the folder from step 1 (e.g. `kittydrama`) |
| Application URL | your domain, with **no subpath** (kittydrama.com → `/`) |
| Application startup file | `server.js` |

Click **Create**.

## 3. Install dependencies

On the app's page in Setup Node.js App, click **Run NPM Install** and wait for it to finish (a few minutes — it includes the site generator).

> If `better-sqlite3` fails to install (rare — it ships prebuilt binaries for Node 18–24 on Linux x64), open the **Terminal** in cPanel, run the `source …/activate` command shown at the top of the app's page, then `cd` to the app folder and run `npm install` to see the error. Ask your host to confirm build tools (`gcc/make/python3`) are available if it's compiling from source.

## 4. Start it

Click **Restart** (or Start). The first boot detects there's no generated site yet and builds it automatically — for about a minute, visitors see a friendly "site is being generated" page that refreshes itself. When it's done, your domain serves the full site.

## 5. Create your admin account

Visit `https://yourdomain.com/admin` — the first visit shows a one-time setup form. Create your account; you land on the dashboard. From here:

- **Blog posts** — write in markdown with live preview, upload images, mark drafts
- **Encyclopedia** — edit any of the 333 answers or add new questions
- **Comments** — approve or delete reader comments (nothing shows until approved)
- **Subscribers** — view newsletter signups, export CSV
- **Publish site** (sidebar) — regenerates the public pages with your latest edits; the pill shows build status

**HTTPS is required for the admin login** (the session cookie is Secure-only). cPanel's AutoSSL normally handles this — check SSL/TLS Status if `/admin` won't keep you logged in.

## 6. After deploy

- **Backups**: cPanel backups cover it, but the critical paths are `data/` (database + secret), `public/images/` (uploads), `src/content/blog/` and `content/encyclopedia/` (content you edit via the admin).
- **Updating the code later**: pull/upload the new code, click Run NPM Install (if dependencies changed), then Restart.
- **Logs**: `stderr.log` in the application root (Passenger writes it automatically) is the place to look if the app won't start.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| "503 / site is being generated" forever | First build failed — check the build pill in `/admin` (log in still works) or `stderr.log`. Usually a low-memory plan; ask your host for the app's memory limit (the build needs ~512 MB free). |
| Admin login doesn't stick | You're on `http://` — force HTTPS (AutoSSL + a redirect in cPanel → Domains). |
| Changes saved but site unchanged | You saved without "Publish site after saving" — click **Publish site** in the sidebar. |
| Images 404 right after upload | They're served from `public/images/` immediately and copied into the site on the next publish — if they 404, restart the app and re-check. |
