from kokoro_onnx import Kokoro
import soundfile as sf, os
k=Kokoro(os.path.expanduser('~/.kokoro/kokoro-v1.0.onnx'),os.path.expanduser('~/.kokoro/voices-v1.0.bin'))
for v in ['af_nicole','af_heart','af_bella','af_sky']:
    s,sr=k.create("Hi friends! I'm Sasha, and this is my fluffy cat, Candy. Ah-yoo-boh-wun! That means, may you live long.",voice=v,speed=0.95,lang='en-us')
    sf.write(f'out/v_{v}.wav',s,sr); print(v,len(s)/sr)
