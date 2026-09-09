import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, extname, relative } from 'node:path';

const root = process.cwd();
const textExtensions = new Set(['.md', '.svg', '.yml', '.yaml', '.json', '.mjs', '.txt', '.html']);
const markdownFiles = [];
const failures = [];
const maxAssetBytes = 3 * 1024 * 1024;

const staleTextPatterns = [
  [/assets\/demo\//i, 'obsolete assets/demo reference'],
  [/DEMO_VIDEO_STORYBOARD/i, 'obsolete demo storyboard reference'],
  [/shawky2002020\.github\.io/i, 'stale portfolio URL'],
  [/linkedin\.com\/in\/shawky2002020/i, 'stale LinkedIn URL'],
  [/\b735\+?\s+(?:git\s+)?commits?\b/i, 'volatile commit-count claim'],
  [/\b390\s+(?:verified\s+|automated\s+)?test files?\b/i, 'volatile test-file claim'],
  [/Tests-390/i, 'volatile test badge'],
  [/\b37\s+(?:sequential\s+)?(?:SQL\s+)?migrations?\b/i, 'volatile migration-count claim'],
  [/\bSole Architect\b/i, 'inflated ownership title'],
  [/\bSenior Software Engineer & Full-Stack Systems Architect\b/i, 'self-assigned senior/architect title'],
  [/\bsub-millisecond\b/i, 'unsupported latency claim'],
  [/\b0\s*CLS\b/i, 'unsupported CLS claim'],
  [/\b0\s*ms (?:perceived )?latency\b/i, 'unsupported latency claim'],
  [/\b100%\s+solo\b/i, 'unsupported solo-authorship claim'],
];

function scanText(path) {
  const text = readFileSync(path, 'utf8');
  const secretPatterns = [
    /BEGIN [A-Z ]*PRIVATE KEY/i,
    /(?:sk_live|rk_live|ghp_|github_pat_)[A-Za-z0-9_\-]+/,
    /AIza[\w-]{20,}/,
    /postgres(?:ql)?:\/\/[^\s]+/i,
    /redis:\/\/[^\s]+/i,
    /(?:api[_-]?key|client[_-]?secret|database[_-]?url)\s*[:=]\s*[^\s]+/i,
  ];

  for (const pattern of secretPatterns) {
    if (pattern.test(text)) failures.push(`${relative(root, path)} matches protected secret pattern ${pattern}`);
  }

  if (relative(root, path) !== 'scripts/check-docs.mjs') {
    for (const [pattern, description] of staleTextPatterns) {
      if (pattern.test(text)) failures.push(`${relative(root, path)} contains ${description}`);
    }
  }
}

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(path);
      continue;
    }

    const extension = extname(entry.name).toLowerCase();
    if (extension === '.md') markdownFiles.push(path);
    if (extension === '.mp4') failures.push(`${relative(root, path)} is a repository-hosted video file; link to the real launch instead`);
    if (textExtensions.has(extension)) scanText(path);
    if (/\.(png|webp|jpe?g)$/i.test(entry.name) && statSync(path).size > maxAssetBytes) {
      failures.push(`${relative(root, path)} exceeds 3 MiB (${statSync(path).size} bytes)`);
    }
  }
}

function validateTarget(file, target) {
  if (/^(https?:|mailto:|#)/.test(target) || target.includes('<!--')) return;
  const clean = target.split('#')[0].split('?')[0];
  if (!clean) return;
  if (!existsSync(join(dirname(file), clean))) {
    failures.push(`${relative(root, file)} has missing relative target: ${target}`);
  }
}

walk(root);

for (const file of markdownFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^ )]+)(?:\s+[^)]*)?\)/g)) validateTarget(file, match[1]);
  for (const match of text.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) validateTarget(file, match[1]);

  if (/<(?:video|iframe|script)\b/i.test(text)) {
    failures.push(`${relative(root, file)} uses unsupported/undesired README HTML media`);
  }
}

const requiredMedia = [
  'assets/brand/jahiz-logo.png',
  'assets/store/app-store.svg',
  'assets/store/google-play.svg',
  'assets/hero/jahiz-product-engineering-showcase.webp',
  'assets/diagrams/system-architecture.svg',
  'assets/diagrams/live-match-flow.svg',
  'assets/diagrams/match-to-analytics.svg',
  'assets/diagrams/release-pipeline.svg',
  'assets/screenshots/home/coach-home-en.webp',
  'assets/screenshots/live-match/live-match-running-timer.webp',
  'assets/screenshots/review/match-review-timeline-events.webp',
  'assets/screenshots/analytics/match-technique-radar.webp',
  'assets/screenshots/teams/team-management.webp',
  'assets/screenshots/tournaments/tournament-hub-individual.webp',
];

for (const media of requiredMedia) {
  if (!existsSync(join(root, media))) failures.push(`Missing required showcase media: ${media}`);
}

const canonicalTokens = [
  'https://lnkd.in/p/eqWueRtk',
  'https://apps.apple.com/us/app/jahiz-analytics/id6788289047',
  'https://play.google.com/store/apps/details?id=com.jahiz.analytics',
  'https://www.linkedin.com/in/shawky-elsayed/',
  'https://github.com/shawky2002020',
  'https://www.shawkyelsayed.com/',
];

for (const readme of ['README.md', 'README.ar.md']) {
  const text = readFileSync(join(root, readme), 'utf8');
  for (const token of canonicalTokens) {
    if (!text.includes(token)) failures.push(`${readme} is missing canonical link: ${token}`);
  }
}

if (failures.length) {
  console.error('Documentation quality check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Documentation quality check passed (${markdownFiles.length} Markdown files; canonical links, local references, media policy and public-claim guardrails verified).`,
);
