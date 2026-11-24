// One Sentence for a Traveler from 1800 — entry writer.
//
// Reads the sentence stored beside this file and copies it, byte for byte,
// into the output directory as entry.txt. The sentence lives in entry.txt
// next to this script; we locate it from this file's own path so the
// program works no matter which directory it is launched from.

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sentence = readFileSync(join(here, "entry.txt"), "utf8");

// The gate wants real text, 1 to 200 characters: refuse to ship anything else.
const trimmed = sentence.trim();
if (trimmed.length === 0 || trimmed.length > 200) {
  throw new Error(`entry.txt must hold 1-200 characters, found ${trimmed.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), sentence, "utf8");
