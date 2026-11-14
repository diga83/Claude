"""Cut character poses out of the two model sheets into transparent PNG sprites."""
import sys, json
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
IM='/tmp/claude-0/-home-user-Claude/438dc65f-78ad-55ec-b1a2-9f80bc0a64ed/images/'
candy=Image.open(IM+'1.webp').convert('RGB'); sasha=Image.open(IM+'2.webp').convert('RGB')
# name: (sheet, x0,y0,x1,y1)
BOX={
 'c_front':(candy,40,80,310,425),'c_34':(candy,320,70,660,425),'c_side':(candy,620,70,1180,425),'c_back':(candy,1185,80,1510,425),
 'c_playful':(candy,40,480,275,690),'c_curious':(candy,295,480,525,690),'c_content':(candy,535,485,760,690),
 'c_surprised':(candy,780,485,1010,690),'c_sleepy':(candy,1015,505,1275,690),'c_attentive':(candy,1275,480,1500,690),
 'c_follow':(candy,60,735,420,975),'c_stretch':(candy,470,735,930,975),'c_play':(candy,950,735,1420,980),
 's_front':(sasha,395,40,625,625),'s_34':(sasha,680,40,900,625),'s_side':(sasha,940,40,1150,625),'s_back':(sasha,1220,40,1440,625),
 's_happy':(sasha,10,750,205,965),'s_curious':(sasha,200,750,370,965),'s_thinking':(sasha,365,750,535,965),
 's_surprised':(sasha,530,750,705,965),'s_concerned':(sasha,700,750,870,965),'s_laughing':(sasha,860,750,1050,965),
 's_walk':(sasha,1105,705,1300,990),'s_wave':(sasha,1325,705,1510,990),
}
meta={}
for name,(img,x0,y0,x1,y1) in BOX.items():
    a=np.asarray(img.crop((x0,y0,x1,y1))).astype(np.float32)
    # background colour = median of the border
    border=np.concatenate([a[0],a[-1],a[:,0],a[:,-1]]); bg=np.median(border,axis=0)
    d=np.sqrt(((a-bg)**2).sum(2))
    fg=d>26
    fg=ndi.binary_closing(fg,iterations=2)
    lab,n=ndi.label(fg)
    sizes=ndi.sum(fg,lab,range(1,n+1)); keep=lab==(1+int(np.argmax(sizes)))
    filled=ndi.binary_fill_holes(keep); holes=filled&~keep; hl,hn=ndi.label(holes)
    for i in range(1,hn+1):
        m=hl==i
        # big enclosed patches of pure background (between legs, under the belly) stay transparent
        if m.sum()>250 and np.median(d[m])<6: continue
        keep|=m
    soft=ndi.binary_dilation(keep,iterations=3)
    alpha=np.clip((d-8)/30,0,1); alpha[keep & (ndi.binary_erosion(keep,iterations=3))]=1
    alpha=alpha*soft
    alpha=np.maximum(alpha, ndi.binary_erosion(keep,iterations=2).astype(np.float32))
    # un-mix background colour from edge pixels
    al=np.clip(alpha,0.05,1)[...,None]; rgb=np.clip((a-(1-al)*bg)/al,0,255)
    out=np.dstack([rgb,alpha*255]).astype(np.uint8)
    ys,xs=np.where(alpha>0.05); out=out[ys.min():ys.max()+1, xs.min():xs.max()+1]
    im=Image.fromarray(out,'RGBA')
    im=im.resize((im.width*2,im.height*2),Image.LANCZOS)
    im.save(f'assets/{name}.png'); meta[name]=[im.width,im.height]
json.dump(meta,open('assets/sprites.json','w'))
# contact sheet on a coloured background for QA
W=2400; sheet=Image.new('RGB',(W,2300),(40,120,150)); x=y=10; rowh=0
for name in BOX:
    im=Image.open(f'assets/{name}.png'); s=0.5; im=im.resize((int(im.width*s),int(im.height*s)))
    if x+im.width>W: x=10; y+=rowh+10; rowh=0
    sheet.paste(im,(x,y),im); x+=im.width+10; rowh=max(rowh,im.height)
sheet.crop((0,0,W,y+rowh+10)).save('out/sprites_qa.jpg',quality=85)
