"""Cut the two character illustrations into puppet parts (assets/pp_*.png + src/parts.js with offsets and pivots)."""
import json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
IM = '/tmp/claude-0/-home-user-Claude/438dc65f-78ad-55ec-b1a2-9f80bc0a64ed/images/'
import os
SRC = {'sasha': 'ref/sasha_src.png', 'candy': 'ref/candy_src.png'}
if not os.path.exists(SRC['sasha']): Image.open(IM + '6.webp').convert('RGBA').save(SRC['sasha']); Image.open(IM + '5.webp').convert('RGBA').save(SRC['candy'])
META = {}
def poly(shape, pts):
    m = Image.new('L', (shape[1], shape[0]), 0); ImageDraw.Draw(m).polygon(pts, fill=255); return np.asarray(m) > 0
def save(name, rgba, mask, extra=None):
    lab, n = ndi.label(mask); sizes = ndi.sum(mask, lab, range(1, n + 1)); mask = np.isin(lab, [i + 1 for i, v in enumerate(sizes) if v > 400])   # drop specks
    out = rgba.copy(); out[..., 3] = np.where(mask, out[..., 3], 0)
    if extra is not None: out = extra(out)
    ys, xs = np.where(out[..., 3] > 0); x0, y0, x1, y1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
    Image.fromarray(out[y0:y1, x0:x1]).save(f'assets/pp_{name}.png'); META[name] = [int(x0), int(y0)]
def patch(name, rgba, box, bad):
    """a small face patch with some features painted out in the surrounding colour"""
    x0, y0, x1, y1 = box; p = rgba[y0:y1, x0:x1].copy(); b = ndi.binary_dilation(bad(p.astype(int)), iterations=2)
    good = ~b & (p[..., 3] > 200); idx = ndi.distance_transform_edt(b, return_distances=False, return_indices=True)
    fill = p[idx[0], idx[1]]; fill = np.stack([ndi.gaussian_filter(np.where(b, fill[..., c], p[..., c]).astype(float), 5) for c in range(3)], -1)
    p[..., :3] = np.where(b[..., None], fill, p[..., :3]); p[..., 3] = np.where(ndi.binary_dilation(b, iterations=2), p[..., 3], 0)
    Image.fromarray(p).save(f'assets/pp_{name}.png'); META[name] = [x0, y0]

def defringe(I):                                # edge pixels take the colour of the nearest solid pixel
    solid = I[..., 3] > 250; idx = ndi.distance_transform_edt(~solid, return_distances=False, return_indices=True); I[..., :3] = I[idx[0], idx[1], :3]; return I
# ------------------------------------------------ Sasha
S = defringe(np.asarray(Image.open(SRC['sasha'])).copy()); A = S[..., 3] > 128; H_, W_ = A.shape; yy, xx = np.mgrid[0:H_, 0:W_]
R, G, B = [S[..., i].astype(int) for i in range(3)]
mustard = A & (R > 215) & (G > 140) & (B < 120) & (G - B > 88)
sl = np.where(xx < 470, 490 + (470 - xx) * .79 - 4, np.where(xx > 566, 490 + (xx - 566) * .79 - 4, 0))
head = A & ((yy < 440) | (((xx < 470) | (xx > 566)) & (yy < np.minimum(545, sl))))
LA = [(398, 498), (300, 540), (240, 900), (260, 1005), (352, 1005), (352, 935), (380, 850), (404, 780), (410, 700), (420, 650)]
armL = A & poly(A.shape, LA) & ~head; armR = A & poly(A.shape, [(1026 - x, y) for x, y in LA]) & ~head
hem = np.zeros(W_, int)
for x in range(W_):
    ys = np.where(mustard[:, x])[0]; hem[x] = ys.max() + 6 if len(ys) else 0
hem = ndi.maximum_filter1d(hem, 9); legs = A & ~armL & ~armR & (((yy > hem[None, :]) & (xx > 365) & (xx < 648) & (hem[None, :] > 0)) | (yy > 1010))
torso = A & ~head & ~armL & ~armR & ~legs
teal = A & (G > R + 20) & (B > R + 10)
torso |= ndi.binary_dilation(torso, iterations=7) & A & (head | ((armL | armR) & teal))        # tuck under its neighbours: no hairline seams
def neck(o):                                    # skin under the chin so the head can bob without a gap
    c = np.median(S[452:462, 500:536, :3].reshape(-1, 3), axis=0); o[392:437, 492:546, :3] = c; o[392:437, 492:546, 3] = 255; return o
save('s_head', S, head); save('s_torso', S, torso, neck)
for nm, m, px in (('L', armL, 352), ('R', armR, 674)):
    save(f's_arm{nm}_up', S, m & (yy < 818)); save(f's_arm{nm}_lo', S, m & (yy > 782))
def legtop(m):                                  # plain skin above the hem, hidden behind the shorts
    def f(o):
        rows = m.sum(1); top = int(np.argmax(rows > 25)); cs = np.where(m[top + 20:top + 60].sum(0) > 20)[0]; x0, x1 = cs.min() + 6, cs.max() - 6
        c = np.median(S[top + 40:top + 60, x0 + 6:x1 - 6, :3].reshape(-1, 3), axis=0); o[top - 95:top + 8, x0:x1, :3] = c; o[top - 95:top + 8, x0:x1, 3] = 255; return o
    return f
for nm, m in (('L', legs & (xx < 509)), ('R', legs & (xx >= 509))):
    save(f's_leg{nm}_up', S, m & (yy < 1192), legtop(m)); save(f's_leg{nm}_lo', S, m & (yy > 1166))
skin = lambda p: (p[..., 0] > 190) & (p[..., 1] > 110) & (p[..., 1] < 185) & (p[..., 2] < 140)
pink = lambda p: (p[..., 0] > 205) & (p[..., 2] > 140) & (p[..., 1] < 200)
patch('s_eyeL', S, (404, 284, 498, 346), lambda p: ~skin(p) & ~pink(p)); patch('s_eyeR', S, (536, 284, 630, 346), lambda p: ~skin(p) & ~pink(p))
patch('s_mouth', S, (464, 368, 570, 406), lambda p: p[..., 0] < 165)
META['s_skin'] = [int(v) for v in np.median(S[400:420, 500:540, :3].reshape(-1, 3), axis=0)]

# ------------------------------------------------ Candy
C = defringe(np.asarray(Image.open(SRC['candy'])).copy()); A = C[..., 3] > 128; H_, W_ = A.shape; yy, xx = np.mgrid[0:H_, 0:W_]
headP = [(120, 100), (640, 100), (690, 350), (640, 425), (590, 442), (520, 455), (440, 465), (350, 468), (270, 462), (215, 452), (120, 458)]
tailP = [(985, 40), (1530, 40), (1530, 700), (1150, 700), (1060, 630), (1025, 580), (1005, 510), (990, 420)]
head = A & poly(A.shape, headP); tail = A & poly(A.shape, tailP) & ~head
f1 = A & poly(A.shape, [(325, 740), (438, 740), (438, 890), (410, 925), (410, 1015), (325, 1015)])
f2 = A & poly(A.shape, [(438, 740), (545, 740), (545, 1015), (410, 1015), (410, 925), (438, 890)])
h1 = A & poly(A.shape, [(680, 805), (850, 805), (850, 1015), (670, 1015)]); h2 = A & poly(A.shape, [(890, 785), (1035, 785), (1035, 1015), (880, 1015)])
body = A & ~head & ~tail & ~f1 & ~f2 & ~h1 & ~h2
body |= ndi.binary_dilation(body, iterations=7) & A & (head | f1 | f2 | h1 | h2); tail |= ndi.binary_dilation(tail, iterations=10) & A & ~head
def ruff(o):                                    # fur under the chin, hidden by the head at rest
    c = np.median(C[540:570, 330:390, :3].reshape(-1, 3), axis=0); m = poly(A.shape, [(262, 462), (300, 400), (520, 400), (572, 452), (480, 472), (300, 472)]) & (o[..., 3] == 0)
    o[m, :3] = c; o[m, 3] = 255; return o
def up(m, n=70):                                # plain fur above the cut, hidden behind the body
    def f(o):
        rows = m.sum(1); top = int(np.argmax(rows > 25)); cs = np.where(m[top:top + 45].sum(0) > 20)[0]
        if len(cs) < 20: return o
        x0, x1 = cs.min() + 6, cs.max() - 6; c = np.median(C[top + 10:top + 40, x0:x1, :3].reshape(-1, 3), axis=0)
        o[top - n:top + 4, x0:x1, :3] = c; o[top - n:top + 4, x0:x1, 3] = 255; return o
    return f
save('c_head', C, head); save('c_tail', C, tail); save('c_body', C, body, ruff)
for nm, m in (('f1', f1), ('f2', f2), ('h1', h1), ('h2', h2)): save('c_' + nm, C, m, up(m))
eyeb = lambda p: ((p[..., 0] > 200) & (p[..., 1] > 150) & (p[..., 2] < 130)) | (p[..., 0] < 80) | (p[..., :3].min(-1) > 236) | ((p[..., 0] > 150) & (p[..., 2] < 110))
patch('c_eyeL', C, (256, 280, 342, 362), eyeb); patch('c_eyeR', C, (376, 278, 504, 362), eyeb)
open('src/parts.js', 'w').write('window.PARTS=' + json.dumps(META) + ';'); print(META)
