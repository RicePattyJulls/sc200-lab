"""Read-only source/link audit. Cached documentation stays outside the published app."""
import concurrent.futures, html, json, pathlib, re, subprocess, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
CACHE = pathlib.Path('/tmp/sc200-learn-cache')
CACHE.mkdir(exist_ok=True)
sources = json.loads(subprocess.check_output(['node', '-e', "global.SC={};require('./sources.js');process.stdout.write(JSON.stringify(SC.sources))"], cwd=ROOT))

def check(item):
    key, path = item
    url = 'https://learn.microsoft.com/en-us/' + path
    try:
        request = urllib.request.Request(url, headers={'User-Agent': 'SC200-study-source-check/1.0'})
        with urllib.request.urlopen(request, timeout=35) as response:
            body, final = response.read().decode(), response.url
        main = re.search(r'<main[\s>].*?</main>', body, re.S)
        body = main.group() if main else body
        body = re.sub(r'<(script|style)\b.*?</\1>', '', body, flags=re.S)
        plain = html.unescape(re.sub('<[^>]+>', ' ', body))
        plain = re.sub(r'\s+', ' ', plain)
        (CACHE / (key + '.txt')).write_text(plain)
        return {'key':key, 'url':url, 'final':final, 'ok':True, 'chars':len(plain)}
    except Exception as e:
        return {'key':key, 'url':url, 'ok':False, 'error':str(e)}

with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
    results = list(pool.map(check, sources.items()))
(CACHE / 'report.json').write_text(json.dumps(results, indent=2))
for result in results:
    if not result['ok']: print(json.dumps(result))
print(f"Verified {sum(r['ok'] for r in results)}/{len(results)} URLs. Report: {CACHE / 'report.json'}")
