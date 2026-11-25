// Two Lines to Your Past Self — make.fun entry (program/v1).
// Writes exactly two lines to $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output).
// Deterministic: no network, no randomness, no files read outside this repo.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "At the kitchen table on 19 August 2016, when your brother says 'Just sign it, it's only a loan,' don't sign \u2014 read page four first.";
const LINE_2 =
  "Page four makes you liable for his debts too, so when he defaults, that no saves your house and ten years paying for his van.";

const ENTRY = `${LINE_1}\n${LINE_2}\n`;

// Guard the sealed gate locally: 1-280 characters, exactly two non-empty
// lines, one sentence each. Fail loudly instead of writing an invalid entry.
const charCount = [...ENTRY].length;
const lines = ENTRY.split("\n").filter((l) => l.trim().length > 0);
if (charCount < 1 || charCount > 280) {
  throw new Error(`entry is ${charCount} characters, gate needs 1-280`);
}
if (lines.length !== 2) {
  throw new Error(`entry has ${lines.length} non-empty lines, gate needs 2`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
