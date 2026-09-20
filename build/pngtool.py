import zlib, struct

def read(path):
    d = open(path, "rb").read()
    assert d[:8] == b"\x89PNG\r\n\x1a\n", "kein PNG"
    i, idat, w, h, bd, ct, pal, trns = 8, b"", None, None, None, None, None, None
    while i < len(d):
        ln = struct.unpack(">I", d[i:i+4])[0]
        typ, data = d[i+4:i+8], d[i+8:i+8+ln]
        i += 12 + ln
        if typ == b"IHDR": w, h, bd, ct, _, _, _ = struct.unpack(">IIBBBBB", data)
        elif typ == b"PLTE": pal = data
        elif typ == b"tRNS": trns = data
        elif typ == b"IDAT": idat += data
        elif typ == b"IEND": break
    assert bd == 8, f"nur 8 Bit unterstützt (ist {bd})"
    ch = {0:1, 2:3, 3:1, 4:2, 6:4}[ct]
    raw = zlib.decompress(idat)
    rows, prev, p = [], bytearray(w*ch), 0
    for _ in range(h):
        f = raw[p]; p += 1
        line = bytearray(raw[p:p+w*ch]); p += w*ch
        for x in range(len(line)):
            a = line[x-ch] if x >= ch else 0
            b = prev[x]
            c = prev[x-ch] if x >= ch else 0
            if f == 1: line[x] = (line[x]+a) & 255
            elif f == 2: line[x] = (line[x]+b) & 255
            elif f == 3: line[x] = (line[x]+((a+b) >> 1)) & 255
            elif f == 4:
                pp = a+b-c; pa, pb, pc = abs(pp-a), abs(pp-b), abs(pp-c)
                line[x] = (line[x] + (a if (pa <= pb and pa <= pc) else (b if pb <= pc else c))) & 255
        rows.append(line); prev = line

    out = bytearray()
    for line in rows:
        for x in range(w):
            px = line[x*ch:(x+1)*ch]
            if ct == 6: out += px
            elif ct == 2: out += px + b"\xff"
            elif ct == 0: out += bytes([px[0]]*3) + b"\xff"
            elif ct == 4: out += bytes([px[0]]*3) + bytes([px[1]])
            elif ct == 3:
                idx = px[0]
                out += pal[idx*3:idx*3+3]
                out += bytes([trns[idx] if trns and idx < len(trns) else 255])
    return w, h, bytes(out)

def write(path, w, h, rgba):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw += rgba[y*w*4:(y+1)*w*4]
    def chunk(t, d):
        c = struct.pack(">I", len(d)) + t + d
        return c + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
           + chunk(b"IEND", b""))
    open(path, "wb").write(png)

def crop(w, h, rgba, x0, y0, x1, y1):
    out = bytearray()
    for y in range(y0, y1):
        out += rgba[(y*w + x0)*4:(y*w + x1)*4]
    return x1-x0, y1-y0, bytes(out)
