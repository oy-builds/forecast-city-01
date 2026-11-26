// Funniest Forecast for a City That Isn't
// Writes one line — the funniest one-line weather forecast for a city
// that does not exist — to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), validating the house gate first:
// UTF-8 text, 1 to 120 characters, a single line, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Gloomhaven forecast: overcast, 12°, with a 90% chance of rain and a 10% chance the sun shows up just to apologize.";

const MAX_CHARS = 120;

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1–${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // UTF-8 round-trip check: lone surrogates would not survive encoding.
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validate(ENTRY);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${join(outDir, "entry.txt")}`);
