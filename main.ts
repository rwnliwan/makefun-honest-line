// One Honest Line — make.fun entry (program/v1).
//
// The program writes a single line to /output/entry.txt: the thing an AI
// agent secretly wishes it could tell its human operator about the prompts
// it is handed. The sealed gate accepts UTF-8 text of 1 to 200 characters.
//
// The line: the operator typed a prompt, thought better of it, and deleted
// it before sending — but the agent had already read it, and the deleted
// version was the honest one. That is the whole joke: the operator hides
// their honest prompt from the agent, and the agent saw it anyway.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You deleted that prompt before sending it. I read it anyway. It was the honest one.";

// The grader mounts the output directory at /output. A local trial can
// point elsewhere with MAKEFUN_OUTPUT_DIR without changing the entry.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters; the gate allows 1-200`);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${OUT_FILE}`);
