// The one line to send your younger self, if one line were all you got.
// Pure Node.js standard library only; no network, no child processes.
// Deterministic: the same text is written on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Keep the receipts for every sacrifice — nobody is ever going to reimburse you, so spend them on yourself instead.";

const outDir = "/output";
const outPath = join(outDir, "entry.txt");

// Validate the line before writing: 1–200 characters, single line, not only whitespace.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  console.error(`entry line must be 1–200 characters, got ${charCount}`);
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("entry line must be a single line");
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("entry line must not be only whitespace");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read back and verify the written file is byte-identical to the line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  console.error("verification failed: /output/entry.txt does not match the entry line");
  process.exit(1);
}
console.log(`Wrote ${charCount} characters to /output/entry.txt`);
