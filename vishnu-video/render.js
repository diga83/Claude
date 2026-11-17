// node render.js <startFrame> <endFrame> <out.mp4>   (30 fps, 1920x1080)
const { chromium } = require('playwright'); const { spawn } = require('child_process');
(async () => {
  const [a, b, out] = process.argv.slice(2); const FPS = 30;
  const br = await chromium.launch({ args: ['--disable-gpu-vsync', '--force-color-profile=srgb'] });
  const p = await br.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  await p.goto('file://' + __dirname + '/index.html#render'); await p.evaluate(() => window.READY);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', FPS, '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-color_range', 'tv', '-g', '60', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = +a; f < +b; f++) {
    await p.evaluate(t => window.seek(t), f / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - a) % 300 === 0) console.log(out, f, ((Date.now() - t0) / 1000 | 0) + 's');
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await br.close();
  console.log('done', out, (Date.now() - t0) / 1000);
})();
