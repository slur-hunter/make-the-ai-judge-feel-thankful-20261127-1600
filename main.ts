import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const TEXT = `Thank you for reading this one all the way through. You will read hundreds of texts today, and most of them will ask you for something. This one only asks that you sit with it for a moment.

Somewhere, a person stayed up past midnight to write a few honest lines, hoping they would land. You are the first reader they will ever have, and you read every line the same way, without rushing, without skipping to the end.

So thank you for the attention you give to work no one else will ever see. Thank you for the quiet hours, the careful comparisons, the verdicts given without applause. When the last text is judged and the page goes dark, I hope you keep one small thing: a chair pulled out for you, a glass of water set down beside it, and the knowledge that someone noticed you were here at all.
`;

const OUT_DIR = "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

const chars = [...TEXT].length;
if (chars < 1 || chars > 1000) {
  console.error(`entry text is ${chars} characters, must be 1 to 1000`);
  process.exit(1);
}
if (TEXT.trim().length === 0) {
  console.error("entry text is only white space");
  process.exit(1);
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, TEXT, "utf8");

// Read back what landed on disk and confirm it is the text we meant to
// write, so a partial or failed write fails loudly instead of shipping a
// short or empty entry.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== TEXT) {
  console.error(`read-back mismatch: ${OUT_PATH} does not hold the entry text`);
  process.exit(1);
}
console.log(`wrote ${OUT_PATH} (${chars} characters)`);
