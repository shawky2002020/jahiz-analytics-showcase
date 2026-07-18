import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, extname, relative } from 'node:path';

const root = process.cwd();
const textExtensions = new Set(['.md', '.svg', '.yml', '.yaml', '.json', '.mjs', '.txt']);
const markdownFiles = [];
const failures = [];
const maxAssetBytes = 3 * 1024 * 1024;

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else {
      const extension = extname(entry.name).toLowerCase();
      if (extension === '.md') markdownFiles.push(path);
      if (textExtensions.has(extension)) scanText(path);
      if (/\.(png|webp|jpe?g)$/i.test(entry.name) && statSync(path).size > maxAssetBytes) {
        failures.push(`${relative(root, path)} exceeds 3 MiB`);
      }
    }
  }
}

function scanText(path) {
  const text = readFileSync(path, 'utf8');
  const forbidden = [
    /BEGIN [A-Z ]*PRIVATE KEY/i,
    /(?:sk_live|rk_live|ghp_|github_pat_)[A-Za-z0-9_\-]+/,
    /AIza[\w-]{20,}/,
    /postgres(?:ql)?:\/\/[^\s]+/i,
    /redis:\/\/[^\s]+/i,
    /(?:api[_-]?key|client[_-]?secret|database[_-]?url)\s*[:=]\s*[^\s]+/i,
  ];
  for (const pattern of forbidden) {
    if (pattern.test(text)) failures.push(`${relative(root, path)} matches protected secret pattern ${pattern}`);
  }
}

function validateTarget(file, target) {
  if (/^(https?:|mailto:|#)/.test(target) || target.includes('<!--')) return;
  const clean = target.split('#')[0].split('?')[0];
  if (!clean) return;
  if (!existsSync(join(dirname(file), clean))) failures.push(`${relative(root, file)} has missing relative target: ${target}`);
}

walk(root);
for (const file of markdownFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^ )]+)(?:\s+[^)]*)?\)/g)) validateTarget(file, match[1]);
  for (const match of text.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) validateTarget(file, match[1]);
}

if (!existsSync(join(root, 'assets', 'hero', 'github-social-preview.png'))) failures.push('Missing GitHub social preview');
if (!existsSync(join(root, 'assets', 'hero', 'jahiz-hero.webp'))) failures.push('Missing README hero');
if (failures.length) {
  console.error('Documentation quality check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Documentation quality check passed (${markdownFiles.length} Markdown files checked).`);
