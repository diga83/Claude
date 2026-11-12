// Boot: fonts → script + timing → captions → shots. Then draw(t) renders film time t (pure function of t).
// Luminous Myth camera: slow push/pan on every shot, soft cross-dissolves between shots (shot.tr seconds; 0 = hard cut,
// shot.flash = white flash on the cut). window.OP is the API tools/capture.mjs drives.
import { W, H, setCtx, ctx, clamp, eio, C, rgba, lg } from './core/lib.js';
import { T, loadTiming } from './core/timing.js';
import { buildCaptions, drawCaption, captionList } from './core/captions.js';
import { buildShots } from './shots.js';

const cv = document.getElementById('cv');
const main = cv.getContext('2d');
const off = document.createElement('canvas'); off.width = W; off.height = H; const octx = off.getContext('2d');
setCtx(main);
const OP = (window.OP = { ready: false });

function shot(c, i, t) {
  const S = OP._shots, sh = S[i], end = i < S.length - 1 ? S[i + 1].at : T.dur, d = end - sh.at, lt = t - sh.at;
  setCtx(c);
  c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.letterSpacing = '0px'; c.setLineDash([]);
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const u = eio(clamp(lt / (d + 0.5))), z = 1 + (sh.zoom ?? 0.07) * u, [cx, cy] = sh.cam || [540, 860], [px, py] = sh.pan || [0, 0];
  c.save(); c.translate(cx + px * u, cy + py * u); c.scale(z, z); c.translate(-cx, -cy);
  sh.draw(lt, d, t);
  c.restore();
  c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
}
function frame() {   // thin gold ornamental border
  const c = main; c.save(); c.strokeStyle = rgba(C.gold, 0.75); c.lineWidth = 4; c.beginPath(); c.roundRect(22, 22, W - 44, H - 44, 34); c.stroke();
  c.strokeStyle = rgba(C.paleGold, 0.4); c.lineWidth = 2; c.beginPath(); c.roundRect(36, 36, W - 72, H - 72, 24); c.stroke();
  for (const [x, y] of [[36, 36], [W - 36, 36], [36, H - 36], [W - 36, H - 36]]) { c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 11, 0, 7); c.fill(); c.fillStyle = C.magenta; c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); }
  c.restore();
}
function draw(t) {
  t = clamp(t, 0, T.dur - 1e-4);
  const S = OP._shots; let i = S.length - 1; while (i > 0 && S[i].at > t) i--;
  const sh = S[i], lt = t - sh.at, tr = sh.tr ?? 0.45;
  if (i > 0 && lt < tr) {
    shot(main, i - 1, t); shot(octx, i, t); setCtx(main);
    main.globalAlpha = eio(lt / tr); main.drawImage(off, 0, 0); main.globalAlpha = 1;
  } else { shot(main, i, t); setCtx(main); }
  if (sh.flash && lt < 0.3) { main.fillStyle = '#FFFFFF'; main.globalAlpha = 0.85 * (1 - lt / 0.3); main.fillRect(0, 0, W, H); main.globalAlpha = 1; }
  // seat the captions: a soft dark band behind the lower third
  main.fillStyle = lg(0, 1150, 0, 1700, [rgba('#07031F', 0), [0.45, rgba('#07031F', 0.42)], [1, rgba('#07031F', 0)]]); main.fillRect(0, 1150, W, 550);
  const fade = Math.min(clamp(t / 0.6), clamp((T.dur - t) / 0.9));
  if (fade < 1) { main.fillStyle = '#05021A'; main.globalAlpha = 1 - fade; main.fillRect(0, 0, W, H); main.globalAlpha = 1; }
  drawCaption(t);
  frame();
}

(async () => {
  try {
    await document.fonts.load('900 100px Inter');
    const script = await (await fetch('script.json', { cache: 'no-store' })).json();
    await loadTiming();
    buildCaptions(script);
    const { shots, cues } = buildShots();
    shots.sort((a, b) => a.at - b.at);
    OP._shots = shots; OP.script = script;
    OP.duration = () => T.dur;
    OP.draw = draw;
    OP.frame = (t, q = 0.92) => { draw(t); return cv.toDataURL('image/jpeg', q); };
    OP.shots = () => shots.map((s, i) => ({ id: s.id, at: +s.at.toFixed(3), end: +(i < shots.length - 1 ? shots[i + 1].at : T.dur).toFixed(3), note: s.note || '' }));
    OP.captions = () => captionList().map((c) => ({ s: +c.s.toFixed(3), e: +c.e.toFixed(3), text: c.words.map((w) => (w.hi ? '*' : '') + w.txt).join(' ') }));
    OP.cues = () => cues.slice().sort((a, b) => a.t - b.t);
    OP.ready = true;
    const q = new URLSearchParams(location.search);
    if (!q.has('capture')) {
      if (q.has('t')) draw(+q.get('t'));
      else {
        const audio = new Audio('data/mix.wav'); let t0 = null;
        const btn = document.getElementById('play'); btn.hidden = false;
        btn.onclick = () => { btn.hidden = true; t0 = performance.now(); audio.currentTime = 0; audio.play().catch(() => {}); };
        const loop = (now) => { const t = t0 == null ? 0 : (now - t0) / 1000; draw(t0 == null ? 0 : t); if (t0 != null && t > T.dur) { t0 = null; btn.hidden = false; } requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
      }
    }
  } catch (e) { OP.bootError = String(e && e.stack || e); console.error(e); }
})();
