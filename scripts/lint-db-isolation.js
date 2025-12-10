#!/usr/bin/env node

/**
 * CI Lint: Check for module-level DB side effects and incorrect imports.
 * 
 * Rules:
 * 1. Warn if any file imports `db` directly from `@andysd/db` (should use createDb factory).
 * 2. Warn if any file has neon() or drizzle() called at module level (outside a function).
 * 3. Ensure packages/db only exports createDb factory (not a module-level db instance).
 * 
 * Run: node scripts/lint-db-isolation.js
 * Exit code: 0 = pass, 1 = failures.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const errors = [];
const warnings = [];

// Rule 1: Check for imports of `db` from `@andysd/db` (outside packages/db itself)
console.log('[lint-db-isolation] Checking for incorrect `db` imports from @andysd/db...');
try {
  const matches = execSync('grep -r "import.*\\bdb\\b.*from.*[\'\\"]@andysd/db[\'\\"]" --include="*.ts" --include="*.tsx" .', {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).split('\n').filter(l => l && !l.includes('node_modules') && !l.includes('packages/db'));
  
  if (matches.length > 0) {
    matches.forEach(m => {
      warnings.push(`❌ Found incorrect import of 'db' from '@andysd/db': ${m}`);
      warnings.push('   (Use: import { createDb, <schema> } from "@andysd/db" and call createDb(url) in your app init)');
    });
  }
} catch (e) {
  // grep returns non-zero if no matches; that's fine
}

// Rule 2: Check for neon() or drizzle() called at module level (not in a function)
console.log('[lint-db-isolation] Checking for module-level database initialization...');
try {
  // Look for lines that match neon( or drizzle( but are NOT inside a function definition
  // This is a simple heuristic: look for neon/drizzle outside of `export function`, `function`, etc.
  const tsFiles = execSync('find . -name "*.ts" -o -name "*.tsx"', { encoding: 'utf-8' }).split('\n').filter(f => f && !f.includes('node_modules'));
  
  tsFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    
    let inFunction = false;
    let braceDepth = 0;
    
    lines.forEach((line, i) => {
      // Rough heuristic: track function depth
      if (line.match(/^\s*(export\s+)?(async\s+)?function\s+|^\s*(export\s+)?const\s+\w+\s*=\s*(async\s*)?\(/)) {
        inFunction = true;
      }
      
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceDepth += openBraces - closeBraces;
      
      if (braceDepth <= 0) inFunction = false;
      
      // Check for neon() or drizzle() at module level
      if (!inFunction && (line.match(/\bneon\s*\(/) || line.match(/\bdrizzle\s*\(/))) {
        warnings.push(`⚠️  Found module-level db initialization in ${file}:${i + 1}: ${line.trim()}`);
      }
    });
  });
} catch (e) {
  console.warn('[lint-db-isolation] Could not scan files:', e.message);
}

// Rule 3: Ensure packages/db/src/index.ts exports createDb (not db)
console.log('[lint-db-isolation] Checking packages/db/src/index.ts exports...');
const dbIndexPath = 'packages/db/src/index.ts';
if (fs.existsSync(dbIndexPath)) {
  const content = fs.readFileSync(dbIndexPath, 'utf-8');
  
  if (content.match(/^export\s+const\s+db\s*=/m)) {
    errors.push(`❌ packages/db/src/index.ts exports module-level 'db' (should export createDb factory only).`);
  }
  if (!content.match(/export\s+function\s+createDb/)) {
    errors.push(`❌ packages/db/src/index.ts does not export 'createDb' factory function.`);
  }
} else {
  errors.push(`❌ packages/db/src/index.ts not found.`);
}

// Print results
console.log('\n' + '='.repeat(80));
if (errors.length > 0) {
  console.log('\n🔴 ERRORS (must fix):\n');
  errors.forEach(e => console.log('  ' + e));
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS (review and update):\n');
  warnings.forEach(w => console.log('  ' + w));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ All checks passed!');
}

console.log('\n' + '='.repeat(80));

process.exit(errors.length > 0 ? 1 : 0);
