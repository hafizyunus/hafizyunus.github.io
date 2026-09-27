// Cleans gallery photos IN PLACE before they're committed to the public repo:
//  - fixes rotation (phones store it as a hidden flag)
//  - shrinks anything over 3000 px on the long edge
//  - removes ALL metadata, including GPS location
// Photos that are already clean are left untouched (no quality loss from re-saving).
//
// Usage: npm run prepare-photos -- content/galleries/robowars
import { readdirSync, renameSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const MAX_EDGE = 3000;
const folder = process.argv[2];
if (!folder || !statSync(folder, { throwIfNoEntry: false })?.isDirectory()) {
  console.error('Usage: npm run prepare-photos -- content/galleries/<album>');
  process.exit(1);
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
const files = readdirSync(folder).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
const heic = readdirSync(folder).filter((f) => /\.(heic|heif)$/i.test(f));
if (heic.length) console.warn(`Skipping ${heic.join(', ')}: export HEIC photos as JPG first.\n`);

let changed = 0;
for (const name of files) {
  const path = join(folder, name);
  const meta = await sharp(path).metadata();
  // "autoOrient" gives the displayed size; phones often store photos sideways + a rotate flag
  const rotated = (meta.orientation ?? 1) >= 5;
  const [w, h] = rotated ? [meta.height, meta.width] : [meta.width, meta.height];
  const tooBig = Math.max(w, h) > MAX_EDGE;
  const hasMetadata = Boolean(meta.exif || meta.xmp || meta.iptc || (meta.orientation ?? 1) !== 1);

  if (!tooBig && !hasMetadata) {
    console.log(`ok       ${name}  ${w}×${h}`);
    continue;
  }

  let img = sharp(path).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  const ext = extname(name).toLowerCase();
  if (ext === '.png') img = img.png({ compressionLevel: 9 });
  else if (ext === '.webp') img = img.webp({ quality: 90 });
  else if (ext === '.avif') img = img.avif({ quality: 70 });
  else img = img.jpeg({ quality: 88, mozjpeg: true });

  const before = statSync(path).size;
  const tmp = `${path}.tmp`;
  const out = await img.toFile(tmp); // sharp writes no metadata unless asked to
  renameSync(tmp, path);
  changed++;
  const why = [tooBig && `resized from ${w}×${h}`, hasMetadata && 'metadata removed'].filter(Boolean).join(', ');
  console.log(`cleaned  ${name}  ${out.width}×${out.height}  ${kb(before)} → ${kb(out.size)}  (${why})`);
}

console.log(`\n${files.length} photo(s) checked, ${changed} cleaned.`);
