#!/usr/bin/env bash
set -euo pipefail
CHROME=${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}
SRC=$(readlink -f "$1"); DST="$2"; W=${3:-1280}; LX=${4:-0.14}; LY=${5:-0.20}; ART=${6:-breit}; GRUND=${7:-weiss}
HTML=$(readlink -f "$(dirname "$0")/kachel.html")
"$CHROME" --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files \
  --virtual-time-budget=10000 --dump-dom \
  "file://$HTML?src=file://$SRC&w=$W&luftx=$LX&lufty=$LY&art=$ART&grund=$GRUND" 2>/dev/null \
  | python3 -c "
import sys, re, base64, pathlib
dom = sys.stdin.read()
m = re.search(r'(\d+)x(\d+)\|data:image/png;base64,([A-Za-z0-9+/=]+)', dom)
if not m:
    sys.exit('Kachel fehlgeschlagen')
roh = base64.b64decode(m.group(3))
pathlib.Path('$DST').write_bytes(roh)
print(f'  {pathlib.Path(\"$DST\").name}: {m.group(1)}x{m.group(2)}, {len(roh)//1024} KB')
"
