// Encodes an email address for content/site.yaml → person.emailEncoded, so the plain
// address never appears in the repo or the built site.
// Usage: npm run encode-email -- you@example.com
const address = process.argv[2];
if (!address || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address)) {
  console.error('Usage: npm run encode-email -- you@example.com');
  process.exit(1);
}
const encoded = Buffer.from([...address].reverse().join('')).toString('base64');
console.log(`\nPaste this into content/site.yaml under person:\n\n  emailEncoded: "${encoded}"\n`);
