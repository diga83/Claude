// node tools/capture.mjs frames out/f "1.5,3,7"      -> single frames (jpg)
// node tools/capture.mjs sheet out/sheet.jpg 0 30 1   -> contact sheet from..to step
// node tools/capture.mjs video out/part.mp4 0 3600    -> frames a..b at 30 fps piped to ffmpeg
import { createRequire } from 'module'; const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PATH || 'playwright'); import { spawn, execSync } from 'child_process'; import fs from 'fs'; import path from 'path'; import http from 'http';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.woff2': 'font/woff2', '.wav': 'audio/wav' };
const srv = http.createServer((q, r) => { const p = path.join(root, decodeURIComponent(q.url.split('?')[0])); fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); });
await new Promise(r => srv.listen(0, r)); const port = srv.address().port;
const [mode, out, ...a] = process.argv.slice(2);
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
pg.on('pageerror', e => { console.error('PAGE ERROR', e.message); }); pg.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
await pg.goto(`http://localhost:${port}/index.html?capture`); await pg.evaluate(() => window.READY);
const grab = async (t, q = .92) => Buffer.from((await pg.evaluate(([t, q]) => { renderAt(t); return document.getElementById('c').toDataURL('image/jpeg', q).slice(23); }, [t, q])), 'base64');
if (mode === 'frames') { for (const t of a[0].split(',').map(Number)) fs.writeFileSync(`${out}_${t.toFixed(2)}.jpg`, await grab(t)); }
else if (mode === 'sheet') {
  const [from, to, step] = a.map(Number), dir = fs.mkdtempSync('/tmp/sheet'); let n = 0;
  for (let t = from; t < to; t += step) { const f = `${dir}/${String(n++).padStart(4, '0')}.jpg`; fs.writeFileSync(f, await grab(t, .8)); }
  const cols = Number(a[3] || 5); execSync(`ffmpeg -y -loglevel error -framerate 1 -i ${dir}/%04d.jpg -vf "scale=640:-1,drawtext=text='%{eif\\:${from}+n*${step}\\:d}s':x=8:y=8:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.6,tile=${cols}x${Math.ceil(n / cols)}" -frames:v 1 -q:v 3 ${out}`);
} else if (mode === 'video') {
  const [fa, fb] = a.map(Number);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = fa; f < fb; f++) { const buf = await grab(f / 30, .95); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if ((f - fa) % 150 === 0) console.log(out, f); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
}
await b.close(); srv.close();
