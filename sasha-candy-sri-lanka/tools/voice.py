"""script.json -> audio/voice.wav + src/timing.js (line + scene + word times). Local Kokoro TTS, soft blended female voice."""
import json, os, sys
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
from fractions import Fraction
from kokoro_onnx import Kokoro
SR=24000; S=json.load(open('script.json')); V=S['voice']
k=Kokoro(os.path.expanduser('~/.kokoro/kokoro-v1.0.onnx'),os.path.expanduser('~/.kokoro/voices-v1.0.bin'))
style=sum(k.get_voice_style(n)*w for n,w in V['blend'].items())
ratio=2**(V['pitch_semitones']/12)            # pitch up by resampling; synth slower to keep the tempo
fr=Fraction(1/ratio).limit_denominator(200)
def trim(x,thr=0.01):
    i=np.where(np.abs(x)>thr)[0]; return x[max(0,i[0]-240):min(len(x),i[-1]+900)]
def say(text,speed):
    x,_=k.create(text,voice=style,speed=speed/ratio,lang='en-us')
    x=resample_poly(np.asarray(x,dtype=np.float64),fr.numerator,fr.denominator); return trim(x)
speed=float(sys.argv[1]) if len(sys.argv)>1 else V['speed']
clips=[[say(l['say'],speed) for l in sc['lines']] for sc in S['scenes']]
speech=sum(len(c) for cs in clips for c in cs)/SR
nl=sum(len(cs) for cs in clips); ns=len(clips)
# gaps: between lines in a scene = g, between scenes = g*2.6 ; solve g so the total hits the target
free=S['target']-S['lead']-S['tail']-speech
g=free/((nl-ns)+2.6*(ns-1)); print(f'speech {speech:.1f}s  free {free:.1f}s  line gap {g:.2f}s  scene gap {2.6*g:.2f}s')
if g<0.3: sys.exit('too long: raise speed or trim the script')
out=np.zeros(int(S['target']*SR)); t=S['lead']; scenes=[]; lines=[]
for si,(sc,cs) in enumerate(zip(S['scenes'],clips)):
    start=0 if si==0 else t-1.3*g
    for li,(l,c) in enumerate(zip(sc['lines'],cs)):
        a=int(t*SR); out[a:a+len(c)]+=c
        lines.append({'scene':sc['id'],'a':round(t,3),'b':round(t+len(c)/SR,3),'cap':l.get('cap',l['say']),'expr':l['expr']})
        t+=len(c)/SR+(g if li<len(cs)-1 else 2.6*g)
    scenes.append({'id':sc['id'],'a':round(start,3)})
for i,s in enumerate(scenes): s['b']=scenes[i+1]['a'] if i+1<len(scenes) else S['target']
out=out/np.abs(out).max()*0.9
sf.write('audio/voice.wav',out,SR)
# loudness envelope at 30 fps for the talking bounce
hop=SR//30; env=np.sqrt(np.mean(out[:len(out)//hop*hop].reshape(-1,hop)**2,axis=1)); env=np.round(np.clip(env/env.max()*1.6,0,1),2).tolist()
json.dump({'scenes':scenes,'lines':lines,'env':env,'dur':S['target']},open('audio/timing.json','w'))
for s in scenes: print(f"{s['id']:9s} {s['a']:6.2f} - {s['b']:6.2f}")
