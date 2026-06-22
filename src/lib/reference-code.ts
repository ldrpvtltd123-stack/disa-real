// Generates a short, human-friendly reference code for any form submission.
// Format: MD-{PREFIX}-{YYMMDD}-{XXXX}
//   PREFIX  → short tag identifying the form (ENQ, ORD, DLR, ...)
//   YYMMDD  → date of submission
//   XXXX    → 4-char random alphanumeric (no ambiguous chars)
export function makeRefCode(prefix: string): string {
  const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  let rand = "";
  const bytes = new Uint8Array(4);
  (globalThis.crypto ?? crypto).getRandomValues(bytes);
  for (const b of bytes) rand += ALPHA[b % ALPHA.length];
  return `MD-${prefix.toUpperCase()}-${yy}${mm}${dd}-${rand}`;
}
