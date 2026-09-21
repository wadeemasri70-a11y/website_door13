#!/usr/bin/env bash
set -euo pipefail
CHROME=${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}
SRC=$(readlink -f "$1"); DST="$2"; SX=$3; SY=$4; SW=$5; SH=$6; W=${7:-1800}; Q=${8:-0.88}; SHARP=${9:-0.55}
HTML=$(readlink -f "$(dirname "$0")/zuschnitt.html")
"$CHROME" --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files \
  --virtual-time-budget=12000 --dump-dom \
  "file://$HTML?src=file://$SRC&sx=$SX&sy=$SY&sw=$SW&sh=$SH&w=$W&q=$Q&sharpen=$SHARP" 2>/dev/null \
  | python3 -c "
import sys, re, base64, pathlib
m = re.search(r'(\d+)x(\d+)\|data:image/jpeg;base64,([A-Za-z0-9+/=]+)', sys.stdin.read())
if not m: sys.exit('Zuschnitt fehlgeschlagen')
roh = base64.b64decode(m.group(3))
pathlib.Path('$DST').write_bytes(roh)
print(f'  {pathlib.Path(\"$DST\").name}: {m.group(1)}x{m.group(2)}, {len(roh)//1024} KB')
"
