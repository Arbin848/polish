"""Generate a Polish recording for every text in the app with Piper (offline neural speech).

Runs once (normally in the "Generate speech" GitHub workflow); the MP3 files and the
manifest audio/tts.js are committed, so the app plays them offline with no speech service.

    python tools/gen-speech.py texts.json voices_dir [--only KEY ...]

texts.json comes from `node tools/list-texts.js`. Texts that already have a native-speaker
recording (audio/manifest.js) are skipped. Safe to run again: existing files are kept.
"""
import hashlib
import json
import os
import re
import subprocess
import sys
import unicodedata
import wave

from piper import PiperVoice
from piper.config import SynthesisConfig

ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT_DIR = os.path.join(ROOT, 'audio', 'tts')
MANIFEST = os.path.join(ROOT, 'audio', 'tts.js')
NATIVE = os.path.join(ROOT, 'audio', 'manifest.js')
VOICES = {'f': 'pl_PL-gosia-medium', 'm': 'pl_PL-darkman-medium'}
# A little slower than normal speech, for learners.
CONFIG = SynthesisConfig(length_scale=1.12, normalize_audio=True)


def clean(text):
    """Same key as Slowka.clean() in js/core.js."""
    t = text.lower()
    t = re.sub(r'[?!.,…¿¡:;"„”«»()–—]', ' ', t)
    return re.sub(r'\s+', ' ', t).strip()


def speech_text(text):
    """What is actually spoken (same as S.speak): no ellipsis, 'a / b' as 'a, b'."""
    t = text.replace('…', '').replace('___', '')
    return re.sub(r'\s/\s', ', ', t).strip()


def slug(key, voice, say=None):
    """File name for a clip. When the text is read differently from its spelling (say), the name
    changes with it, so editing the spoken form makes a new recording."""
    ascii_ = unicodedata.normalize('NFD', key).encode('ascii', 'ignore').decode()  # unchanged: existing file names depend on it
    ascii_ = re.sub(r'[^a-z0-9]+', '-', ascii_).strip('-')[:40] or 'x'
    h = hashlib.md5((key + voice + (('|' + say) if say else '')).encode()).hexdigest()[:8]
    return f"{ascii_}-{h}-{voice}.mp3"


def read_js_object(path, name):
    if not os.path.exists(path):
        return {}
    src = open(path, encoding='utf-8').read()
    m = re.search(r'window\.' + name + r'\s*=\s*(\{.*\});', src, re.S)
    return json.loads(m.group(1)) if m else {}


def write_manifest(entries):
    data = dict(sorted(entries.items()))
    with open(MANIFEST, 'w', encoding='utf-8') as f:
        f.write('// Generated speech for every text without a native recording (tools/gen-speech.py, Piper).\n')
        f.write('// Keys are Polish text in lowercase; values are file paths (-f female voice, -m male voice).\n')
        f.write('window.SLOWKA_TTS = ' + json.dumps(data, ensure_ascii=False, indent=0) + ';\n')


def synth(voice, text, mp3_path):
    wav_path = mp3_path[:-4] + '.wav'
    with wave.open(wav_path, 'wb') as w:
        voice.synthesize_wav(text, w, syn_config=CONFIG)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav_path, '-ac', '1', '-ar', '22050', '-b:a', '32k', mp3_path], check=True)
    os.remove(wav_path)


def main():
    texts_path, voices_dir = sys.argv[1], sys.argv[2]
    only = set(sys.argv[sys.argv.index('--only') + 1:]) if '--only' in sys.argv else None
    os.makedirs(OUT_DIR, exist_ok=True)
    items = json.load(open(texts_path, encoding='utf-8'))
    native = read_js_object(NATIVE, 'SLOWKA_AUDIO')
    manifest = read_js_object(MANIFEST, 'SLOWKA_TTS')
    voices = {k: PiperVoice.load(os.path.join(voices_dir, v + '.onnx')) for k, v in VOICES.items()}
    done = skipped = 0
    for i, item in enumerate(items):
        key = clean(item['text'])
        if not key or (only and key not in only):
            continue
        if key in native and not only:
            skipped += 1
            continue
        v = item['voice']
        say = item.get('say')
        rel = f'audio/tts/{slug(key, v, say)}'
        # Keep an existing clip if it was made from the same spoken text (by either voice:
        # the quality check may have swapped it for the other one).
        fine = {f'audio/tts/{slug(key, x, say)}' for x in VOICES}
        if not only and manifest.get(key) in fine and os.path.exists(os.path.join(ROOT, manifest[key])):
            continue
        try:
            old = manifest.get(key)
            synth(voices[v], speech_text(say or item['text']), os.path.join(ROOT, rel))
            if old and old != rel and os.path.exists(os.path.join(ROOT, old)):
                os.remove(os.path.join(ROOT, old))
            manifest[key] = rel
            done += 1
        except Exception as e:  # keep going; the app falls back to the device voice
            print(f'  failed: {item["text"][:60]!r}: {e}', flush=True)
        if done and done % 200 == 0:
            write_manifest(manifest)
            print(f'  {done} generated ({i + 1}/{len(items)})', flush=True)
    # Texts that are no longer in the app: remove their clips.
    wanted = {clean(x['text']) for x in items}
    removed = 0
    if not only:
        for key in [k for k in manifest if k not in wanted or k in native]:
            f = os.path.join(ROOT, manifest.pop(key))
            if os.path.exists(f):
                os.remove(f)
            removed += 1
    write_manifest(manifest)
    print(f'Done: {done} new clips, {removed} removed, {len(manifest)} in total, {skipped} covered by native recordings.')


if __name__ == '__main__':
    main()
