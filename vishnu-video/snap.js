// node snap.js <out.jpg> t1 t2 ...  -> contact sheet tiles (each 960x540) for quick visual checks
const { chromium } = require('playwright');
(async () => {
  const [out, ...ts] = process.argv.slice(2);
  const scale = parseFloat(process.env.SCALE || '0.5');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scale });
  p.on('console', m => { if (m.type() !== 'log') console.log('[' + m.type() + ']', m.text()); });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  await p.goto('file://' + __dirname + '/index.html#render');
  await p.evaluate(() => window.READY);
  const TL = await p.evaluate(() => window.TL);
  const files = [];
  for (let i = 0; i < ts.length; i++) {
    let t = ts[i];
    if (isNaN(+t)) { const [id, off] = t.split('+'); const sh = TL.shots.find(s => s.id.startsWith(id)); const nx = TL.shots[TL.shots.indexOf(sh) + 1]; const end = nx ? nx.start : TL.total; t = off && off.endsWith('%') ? sh.start + (end - sh.start) * parseFloat(off) / 100 : sh.start + parseFloat(off || 2); }
    await p.evaluate(t => window.seek(t), +t);
    const f = out.replace(/\.jpg$/, `_${i}.jpg`); await p.screenshot({ path: f, type: 'jpeg', quality: 85 }); files.push(f);
  }
  await b.close();
  const { execSync } = require('child_process');
  const cols = Math.min(files.length, parseInt(process.env.COLS || '3'));
  execSync(`ffmpeg -y -loglevel error ${files.map(f => '-i ' + f).join(' ')} -filter_complex "${files.map((_, i) => `[${i}:v]`).join('')}xstack=inputs=${files.length}:layout=${files.map((_, i) => `${(i % cols) ? Array.from({ length: i % cols }, (_, k) => 'w' + k).join('+') : 0}_${Math.floor(i / cols) ? Array.from({ length: Math.floor(i / cols) }, (_, k) => 'h' + k * cols).join('+') : 0}`).join('|')}:fill=black" -q:v 3 ${out}`.replace('xstack=inputs=1:layout=0_0:fill=black', 'null'));
  files.forEach(f => require('fs').unlinkSync(f));
})();
