import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync } from "fs";
import { join, extname, basename } from "path";

const ASSETS_DIR = "./public/assets";
const QUALITY    = 82;
const MAX_WIDTH  = 2400; // no website needs wider than this

const EXTS = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

const files = readdirSync(ASSETS_DIR).filter(f => EXTS.has(extname(f)));

console.log(`\nConverting ${files.length} images → WebP (q${QUALITY}, max ${MAX_WIDTH}px)\n`);

let saved = 0;

for (const file of files) {
  const src  = join(ASSETS_DIR, file);
  const name = basename(file, extname(file));
  const dest = join(ASSETS_DIR, `${name}.webp`);

  const { size: before } = (await import("fs")).statSync(src);

  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dest);

  const { size: after } = (await import("fs")).statSync(dest);
  const pct = Math.round((1 - after / before) * 100);
  saved += before - after;

  console.log(
    `  ✓ ${file.padEnd(42)} ${(before/1024/1024).toFixed(1)} MB → ${(after/1024/1024).toFixed(1)} MB  (-${pct}%)`
  );
}

console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(0)} MB\n`);
