#!/usr/bin/env bash
# Skaliert ein Bild über den Browser hoch. Aufruf:
#   build/upscale.sh <quelle> <ziel> [faktor] [qualität] [schärfe]
set -euo pipefail
CHROME=${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}
SRC=$(readlink -f "$1"); DST="$2"; SCALE=${3:-2}; Q=${4:-0.86}; SHARPEN=${5:-0.55}
HTML=$(readlink -f "$(dirname "$0")/upscale.html")
"$CHROME" --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files \
  --virtual-time-budget=8000 --dump-dom \
  "file://$HTML?src=file://$SRC&scale=$SCALE&q=$Q&sharpen=$SHARPEN" 2>/dev/null \
  | python3 -c "
import sys, re, base64, pathlib
dom = sys.stdin.read()
m = re.search(r'(\d+)x(\d+)\|data:image/jpeg;base64,([A-Za-z0-9+/=]+)', dom)
if not m:
    sys.exit('Konvertierung fehlgeschlagen')
w, h, data = m.group(1), m.group(2), m.group(3)
pathlib.Path('$DST').write_bytes(base64.b64decode(data))
print(f'  {pathlib.Path(\"$DST\").name}: {w}x{h}, {len(base64.b64decode(data))//1024} KB')
"
