// Storybook engine. draw(t) renders film time t (a pure function of t): a shot (soft cross-dissolves between shots),
// then the grade (warm vignette + paper grain), the series label, and the serif captions.
import { W, H, setCtx, ctx, clamp, eio, C, rgba, lg, rg } from './core/lib.js';
import { T, loadTiming } from './core/timing.js';
import { buildCaptions, drawCaption, captionList } from './core/captions.js';
import { buildShots } from './shots.js';

const cv = document.getElementById('cv');
const main = cv.getContext('2d');
const off = document.createElement('canvas'); off.width = W; off.height = H; const octx = off.getContext('2d');
const grain = document.createElement('canvas'); grain.width = grain.height = 256;
{ const g = grain.getContext('2d'), im = g.createImageData(256, 256); let s = 7; for (let i = 0; i < im.data.length; i += 4) { s = (s * 1103515245 + 12345) & 0x7fffffff; const v = (s >> 8) & 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 26; } g.putImageData(im, 0, 0); }
setCtx(main);
const OP = (window.OP = { ready: false });

function shot(c, i, t) {
  const S = OP._shots, sh = S[i], end = i < S.length - 1 ? S[i + 1].at : T.dur, d = end - sh.at, lt = t - sh.at;
  setCtx(c);
  c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.filter = 'none'; c.shadowBlur = 0; c.setLineDash([]);
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const u = eio(clamp(lt / (d + 0.6))), z = 1.02 + (sh.zoom ?? 0.06) * u, [cx, cy] = sh.cam || [540, 860], [px, py] = sh.pan || [0, 0];
  c.save(); c.translate(cx + px * u, cy + py * u); c.scale(z, z); c.translate(-cx, -cy);
  sh.draw(lt, d, t);
  c.restore();
  c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.filter = 'none';
}
function grade(t) {
  const c = main;
  c.fillStyle = rg(540, 900, 380, 1300, [rgba('#120604', 0), rgba('#120604', 0.62)]); c.fillRect(0, 0, W, H);
  c.fillStyle = lg(0, 1100, 0, 1920, [rgba('#120604', 0), [0.5, rgba('#120604', 0.34)], [1, rgba('#120604', 0.6)]]); c.fillRect(0, 1100, W, 820);
  c.fillStyle = lg(0, 0, 0, 420, [rgba('#120604', 0.5), rgba('#120604', 0)]); c.fillRect(0, 0, W, 420);
  c.save(); c.globalCompositeOperation = 'overlay'; const ox = Math.floor((t * 30) % 7) * 37, oy = Math.floor((t * 30) % 5) * 53;
  for (let y = -256; y < H; y += 256) for (let x = -256; x < W; x += 256) c.drawImage(grain, x + (ox % 256), y + (oy % 256)); c.restore();
}
function label() {
  const c = main; c.save(); c.textBaseline = 'alphabetic'; c.textAlign = 'left'; c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 10;
  c.font = '900 27px Inter'; c.letterSpacing = '7px'; c.fillStyle = '#FFF8EC'; c.fillText('DASHAVATAR', 64, 250);
  c.shadowBlur = 0; c.fillStyle = '#E7B45A'; c.fillRect(64, 270, 46, 3);
  c.font = '900 17px Inter'; c.letterSpacing = '4px'; c.fillStyle = rgba('#FFF8EC', 0.86); c.fillText('RAMA  ·  THE SEVENTH AVATAR', 124, 277);
  c.letterSpacing = '0px'; c.restore();
}
function draw(t) {
  t = clamp(t, 0, T.dur - 1e-4);
  const S = OP._shots; let i = S.length - 1; while (i > 0 && S[i].at > t) i--;
  const sh = S[i], lt = t - sh.at, tr = sh.tr ?? 0.5;
  if (i > 0 && lt < tr) { shot(main, i - 1, t); shot(octx, i, t); setCtx(main); main.globalAlpha = eio(lt / tr); main.drawImage(off, 0, 0); main.globalAlpha = 1; }
  else { shot(main, i, t); setCtx(main); }
  if (sh.flash && lt < 0.35) { main.fillStyle = '#FFF4DC'; main.globalAlpha = 0.85 * (1 - lt / 0.35); main.fillRect(0, 0, W, H); main.globalAlpha = 1; }
  grade(t);
  const fade = Math.min(clamp(t / 0.7), clamp((T.dur - t) / 1.0));
  if (fade < 1) { main.fillStyle = '#0A0402'; main.globalAlpha = 1 - fade; main.fillRect(0, 0, W, H); main.globalAlpha = 1; }
  label(); drawCaption(t);
}

(async () => {
  try {
    await Promise.all([document.fonts.load('900 30px Inter'), document.fonts.load('500 80px Cormorant'), document.fonts.load('italic 600 80px Cormorant')]);
    const script = await (await fetch('script.json', { cache: 'no-store' })).json();
    await loadTiming(); buildCaptions(script);
    const { shots, cues } = buildShots(); shots.sort((a, b) => a.at - b.at);
    OP._shots = shots; OP.script = script; OP.duration = () => T.dur; OP.draw = draw;
    OP.frame = (t, q = 0.92) => { draw(t); return cv.toDataURL('image/jpeg', q); };
    OP.shots = () => shots.map((s, i) => ({ id: s.id, at: +s.at.toFixed(3), end: +(i < shots.length - 1 ? shots[i + 1].at : T.dur).toFixed(3), note: s.note || '' }));
    OP.captions = () => captionList().map((c) => ({ s: +c.s.toFixed(3), e: +c.e.toFixed(3), text: c.words.map((w) => (w.hi ? '*' : '') + w.txt).join(' ') }));
    OP.cues = () => cues.slice().sort((a, b) => a.t - b.t);
    OP.ready = true;
    const q = new URLSearchParams(location.search);
    if (!q.has('capture')) {
      if (q.has('t')) draw(+q.get('t'));
      else { const audio = new Audio('data/mix.wav'); let t0 = null; const btn = document.getElementById('play'); btn.hidden = false;
        btn.onclick = () => { btn.hidden = true; t0 = performance.now(); audio.currentTime = 0; audio.play().catch(() => {}); };
        const loop = (now) => { const t = t0 == null ? 0 : (now - t0) / 1000; draw(t0 == null ? 0 : t); if (t0 != null && t > T.dur) { t0 = null; btn.hidden = false; } requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
    }
  } catch (e) { OP.bootError = String(e && e.stack || e); console.error(e); }
})();
