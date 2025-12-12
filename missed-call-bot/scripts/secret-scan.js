#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const patterns = [/AKIA[0-9A-Z]{16}/, /sk_live_[0-9a-zA-Z]{24}/, /SG\.[0-9A-Za-z_-]+\.[0-9A-Za-z_-]+/, /-----BEGIN PRIVATE KEY-----/i];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scanDir(p);
    else {
      try {
        const text = fs.readFileSync(p, 'utf8');
        for (const re of patterns) {
          if (re.test(text)) {
            console.error('Potential secret in', p, re.toString());
            process.exitCode = 2;
          }
        }
      } catch(e) {}
    }
  }
}

scanDir(repoRoot);
if (process.exitCode === 2) process.exit(2); else console.log('No obvious secrets found');
