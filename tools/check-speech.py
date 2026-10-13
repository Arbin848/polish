"""Check every generated recording with an offline Polish speech recognizer (Vosk).

For each clip in audio/tts.js: recognize it and compare with the text it should say.
Clips that come out unclear are regenerated with the other voice; the clearer version is kept.
Writes audio/tts/QUALITY.md with the results.

    python tools/check-speech.py vosk_model_dir voices_dir
"""
import json
import os
import re
import subprocess
import sys
import unicodedata
import wave

from vosk import KaldiRecognizer, Model, SetLogLevel

sys.path.insert(0, os.path.dirname(__file__))
import importlib.util  # noqa: E402

spec = importlib.util.spec_from_file_location('gen', os.path.join(os.path.dirname(__file__), 'gen-speech.py'))
gen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gen)

ROOT = gen.ROOT
SetLogLevel(-1)


def fold(t):
    t = unicodedata.normalize('NFD', gen.clean(t)).replace('ł', 'l')
    return ''.join(c for c in t if unicodedata.category(c) != 'Mn')


def similarity(a, b):
    a, b = fold(a), fold(b)
    if not a and not b:
        return 1.0
    prev = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        cur = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            cur[j] = min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] != b[j - 1]))
        prev = cur
    return 1 - prev[-1] / max(len(a), len(b))


def recognize(model, mp3):
    pcm = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', mp3, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], check=True, capture_output=True).stdout
    rec = KaldiRecognizer(model, 16000)
    rec.AcceptWaveform(pcm)
    return json.loads(rec.FinalResult()).get('text', '')


def main():
    model_dir, voices_dir = sys.argv[1], sys.argv[2]
    model = Model(model_dir)
    manifest = gen.read_js_object(gen.MANIFEST, 'SLOWKA_TTS')
    texts = {gen.clean(x['text']): x for x in json.load(open(os.path.join(ROOT, 'texts.json'), encoding='utf-8'))}
    voices = None
    scores = {}
    retried = improved = 0
    # Results from earlier runs: a clip that has not changed is not checked again.
    cache_path = os.path.join(ROOT, 'audio', 'tts', 'scores.json')
    cache = json.load(open(cache_path, encoding='utf-8')) if os.path.exists(cache_path) else {}
    for n, (key, rel) in enumerate(sorted(manifest.items())):
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            continue
        if key in cache and cache[key][2] == rel:
            scores[key] = (cache[key][0], cache[key][1])
            continue
        heard = recognize(model, path)
        # Compare with what is said (numbers as words), not the spelling.
        target = gen.clean(texts[key].get('say') or key) if key in texts else key
        score = similarity(heard, target)
        # Unclear clip: try the other voice and keep whichever is understood better.
        if score < 0.6 and key in texts:
            retried += 1
            if voices is None:
                from piper import PiperVoice
                voices = {k: PiperVoice.load(os.path.join(voices_dir, v + '.onnx')) for k, v in gen.VOICES.items()}
            other = 'm' if rel.endswith('-f.mp3') else 'f'
            say = texts[key].get('say')
            alt_rel = f'audio/tts/{gen.slug(key, other, say)}'
            gen.synth(voices[other], gen.speech_text(say or texts[key]['text']), os.path.join(ROOT, alt_rel))
            alt_heard = recognize(model, os.path.join(ROOT, alt_rel))
            alt_score = similarity(alt_heard, target)
            if alt_score > score:
                os.remove(path)
                manifest[key], heard, score = alt_rel, alt_heard, alt_score
                improved += 1
            else:
                os.remove(os.path.join(ROOT, alt_rel))
        scores[key] = (score, heard)
        if n % 500 == 0:
            print(f'  checked {n}/{len(manifest)}', flush=True)
    gen.write_manifest(manifest)
    with open(cache_path, 'w', encoding='utf-8') as f:
        json.dump({k: [round(sc, 3), h, manifest[k]] for k, (sc, h) in scores.items() if k in manifest}, f, ensure_ascii=False, indent=0, sort_keys=True)

    vals = [s for s, _ in scores.values()]
    good = sum(1 for s in vals if s >= 0.8)
    ok = sum(1 for s in vals if 0.6 <= s < 0.8)
    worst = sorted(scores.items(), key=lambda kv: kv[1][0])[:150]
    lines = [
        '# Generated speech: quality check',
        '',
        'Every generated clip was played to an offline Polish speech recognizer (Vosk) and the result',
        'compared with the text. Short words and names are often misheard by the recognizer even when',
        'the audio is fine, so a low score means "listen and check", not "wrong".',
        '',
        f'- Clips checked: **{len(vals)}**',
        f'- Understood well (80%+): **{good}** ({good * 100 // max(1, len(vals))}%)',
        f'- Mostly understood (60–79%): **{ok}**',
        f'- Unclear (below 60%): **{len(vals) - good - ok}**',
        f'- Unclear clips regenerated with the other voice: {retried}, improved: {improved}',
        f'- Average match: **{sum(vals) * 100 / max(1, len(vals)):.1f}%**',
        '',
        '## Lowest scores (please listen to these)',
        '',
        '| Match | Text | Recognizer heard |',
        '|---|---|---|',
    ] + [f'| {s * 100:.0f}% | {k} | {h or "(nothing)"} |' for k, (s, h) in worst]
    open(os.path.join(ROOT, 'audio', 'tts', 'QUALITY.md'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    print(f'Quality: {good} good, {ok} ok, {len(vals) - good - ok} unclear; average {sum(vals) * 100 / max(1, len(vals)):.1f}%')


if __name__ == '__main__':
    main()
