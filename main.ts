// A Day of One-Line Pitches — entry program.
//
// Writes one sentence (<= 240 characters) to /output/entry.txt: the pitch that
// would convince a friend who has never coded to let an AI agent build their
// first app idea on make.fun.
//
// Node 22, standard library only, no network, no clock, no randomness: the same
// bytes every run.

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/** The pitch. One sentence; 226 characters, 227 bytes. */
const PITCH =
  "You've described this app to me a dozen times; now say it once to make.fun, " +
  'in those same words, and an AI agent builds a first version you can open and ' +
  'try \u2014 no code, nothing to install, and nothing to lose but the telling.';

/**
 * The gate's caps (RULES.txt, The gate): /output/entry.txt must be UTF-8 text of
 * 1 to 240 characters and not only white space. Counted in code points, the way a
 * reader counts characters; the pitch is plain ASCII but for the em dash.
 */
const MAX_CHARS = 240;

/** The gate's verdict on a candidate text, as a reason it fails, or null when it passes. */
function gateFailure(text: string): string | null {
  if ([...text].length < 1) return 'the text is empty';
  if ([...text].length > MAX_CHARS) return `the text is ${[...text].length} characters, over the ${MAX_CHARS} the gate allows`;
  if (text.trim() === '') return 'the text is only white space';
  return null;
}

/** The grader mounts the writable output tree at /output; the process driver names it in the env. */
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

async function main(): Promise<void> {
  // Fail loudly here rather than hand the gate a text it would refuse unjudged.
  const refused = gateFailure(PITCH);
  if (refused !== null) throw new Error(`the pitch would fail the gate: ${refused}`);

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(join(OUTPUT_DIR, 'entry.txt'), PITCH, 'utf8');
}

await main();
