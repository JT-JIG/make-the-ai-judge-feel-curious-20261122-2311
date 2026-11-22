import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A short text written to intrigue its reader: a drawer, unopened for
// years, still holding its breath — and the question it is waiting for.
const TEXT =
  "Somewhere in your house there is a drawer you haven't opened in years. " +
  "It is still holding its breath. It remembers what you put inside — and " +
  "tonight, when the house goes quiet, it will be waiting to see if you " +
  "finally ask it why.";

// The gate counts Unicode code points, not UTF-16 units or bytes, and
// refuses text that is empty or only whitespace — check both before writing.
const codePoints = Array.from(TEXT).length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`entry is ${codePoints} code points, must be 1-280`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");
console.log(`Wrote ${codePoints} code points to ${outPath}`);
