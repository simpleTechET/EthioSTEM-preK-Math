import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');
const pagesDir = path.join(srcDir, 'pages');

// ========== URL MAPPING ==========
// Old URL -> New URL
const urlMap = {
    // --- Module 1 Index ---
    '"/activities"': '"/activities/module-1"',
    "'/activities'": "'/activities/module-1'",
    // --- Module 1 Lessons ---
    '/activity/matching-1': '/module-1/matching-1',
    '/activity/matching-2': '/module-1/matching-2',
    '/activity/matching-3': '/module-1/matching-3',
    '/activity/matching-4': '/module-1/matching-4',
    '/activity/sorting-5': '/module-1/sorting-5',
    '/activity/sorting-6': '/module-1/sorting-6',
    '/activity/sorting-7': '/module-1/sorting-7',
    '/activity/counting-8': '/module-1/counting-8',
    '/activity/counting-9': '/module-1/counting-9',
    '/activity/counting-10': '/module-1/counting-10',
    '/activity/counting-11': '/module-1/counting-11',
    '/activity/counting-12': '/module-1/counting-12',
    '/activity/counting-13': '/module-1/counting-13',
    '/activity/counting-14': '/module-1/counting-14',
    '/activity/counting-15': '/module-1/counting-15',
    '/activity/counting-16': '/module-1/counting-16',
    '/activity/counting-17': '/module-1/counting-17',
    '/activity/counting-18': '/module-1/counting-18',
    '/activity/counting-19': '/module-1/counting-19',
    '/activity/counting-20': '/module-1/counting-20',
    '/activity/matching-21': '/module-1/matching-21',
    '/activity/matching-22': '/module-1/matching-22',
    '/activity/matching-23': '/module-1/matching-23',
    '/activity/matching-24': '/module-1/matching-24',
    '/activity/matching-25': '/module-1/matching-25',
    '/activity/matching-26': '/module-1/matching-26',
    '/activity/matching-27': '/module-1/matching-27',
    '/activity/matching-28': '/module-1/matching-28',
    '/activity/matching-29': '/module-1/matching-29',
    '/activity/matching-30': '/module-1/matching-30',
    '/activity/matching-31': '/module-1/matching-31',
    '/activity/matching-32': '/module-1/matching-32',
    '/activity/matching-33': '/module-1/matching-33',
    '/activity/matching-34': '/module-1/matching-34',
    '/activity/matching-35': '/module-1/matching-35',
    '/activity/matching-36': '/module-1/matching-36',
    '/activity/matching-37': '/module-1/matching-37',
    '/assessment/mid-module-1': '/module-1/mid-assessment',
    '/assessment/end-of-module-1': '/module-1/end-assessment',
    // --- Module 2 Lessons ---
    '/activity/shapes-1': '/module-2/shapes-1',
    '/activity/shapes-2': '/module-2/shapes-2',
    '/activity/shapes-3': '/module-2/shapes-3',
    '/activity/shapes-4': '/module-2/shapes-4',
    '/activity/shapes-5': '/module-2/shapes-5',
    '/activity/shapes-6': '/module-2/shapes-6',
    '/activity/shapes-7': '/module-2/shapes-7',
    '/activity/shapes-8': '/module-2/shapes-8',
    '/activity/shapes-9': '/module-2/shapes-9',
    '/activity/shapes-10': '/module-2/shapes-10',
    '/activity/shapes-11': '/module-2/shapes-11',
    '/activity/shapes-12': '/module-2/shapes-12',
    '/assessment/end-of-module-2': '/module-2/end-assessment',
    // --- Module 3 Lessons ---
    '/3-introduce-6-7-lesson-1': '/module-3/lesson-1',
    '/3-crossing-creek-lesson-2': '/module-3/lesson-2',
    '/3-finger-counting-6-lesson-3': '/module-3/lesson-3',
    '/3-count-eggs-4': '/module-3/lesson-4',
    '/3-count-arrays-5': '/module-3/lesson-5',
    '/3-compose-six-6': '/module-3/lesson-6',
    '/3-compose-seven-7': '/module-3/lesson-7',
    '/3-circle-count-8': '/module-3/lesson-8',
    '/3-arrange-count-9': '/module-3/lesson-9',
    '/3-tally-10': '/module-3/lesson-10',
    '/3-count-out-11': '/module-3/lesson-11',
    '/3-introduce-8-12': '/module-3/lesson-12',
    '/3-linear-count-13': '/module-3/lesson-13',
    '/3-finger-count-14': '/module-3/lesson-14',
    '/3-array-count-15': '/module-3/lesson-15',
    '/3-compose-8-16': '/module-3/lesson-16',
    '/3-circular-count-17': '/module-3/lesson-17',
    '/3-arrange-count-18': '/module-3/lesson-18',
    '/3-tally-19': '/module-3/lesson-19',
    '/3-count-out-20': '/module-3/lesson-20',
    '/3-introduce-zero-21': '/module-3/lesson-21',
    '/3-introduce-9-lesson-22': '/module-3/lesson-22',
    '/3-linear-count-9-lesson-23': '/module-3/lesson-23',
    '/3-finger-count-24': '/module-3/lesson-24',
    '/3-array-count-25': '/module-3/lesson-25',
    '/3-compose-9-lesson-26': '/module-3/lesson-26',
    '/3-circular-count-9-lesson-27': '/module-3/lesson-27',
    '/3-arrange-count-28': '/module-3/lesson-28',
    '/3-tally-9-lesson-29': '/module-3/lesson-29',
    '/3-towers-30': '/module-3/lesson-30',
    '/3-stairs-31': '/module-3/lesson-31',
    '/3-climb-stairs-32': '/module-3/lesson-32',
    '/3-descending-stairs-33': '/module-3/lesson-33',
    '/3-penny-staircase-34': '/module-3/lesson-34',
    '/3-little-crabs-35': '/module-3/lesson-35',
    '/3-little-fishies-36': '/module-3/lesson-36',
    '/3-little-fishies-thirty-six-36': '/module-3/lesson-36',
    '/3-culminating-thirty-seven-37': '/module-3/lesson-37',
    '/3-circular-ten-thirty-eight-38': '/module-3/lesson-38',
    '/3-varied-ten-thirty-nine-39': '/module-3/lesson-39',
    '/3-tally-ten-forty-40': '/module-3/lesson-40',
    '/3-count-out-ten-forty-one-41': '/module-3/lesson-41',
    '/3-number-book-forty-two-42': '/module-3/lesson-42',
    // Also handle the ?last= param values in Module 3
    // These are used in navigate() calls: navigate("/activities/module-3?last=3-xxx")
    // The ?last= value is extracted from the path, so update accordingly
};

// Module 3 lesson ID mapping (used in ?last= params and localStorage)
const m3LessonIdMap = {
    '3-introduce-6-7-lesson-1': 'lesson-1',
    '3-crossing-creek-lesson-2': 'lesson-2',
    '3-finger-counting-6-lesson-3': 'lesson-3',
    '3-count-eggs-4': 'lesson-4',
    '3-count-arrays-5': 'lesson-5',
    '3-compose-six-6': 'lesson-6',
    '3-compose-seven-7': 'lesson-7',
    '3-circle-count-8': 'lesson-8',
    '3-arrange-count-9': 'lesson-9',
    '3-tally-10': 'lesson-10',
    '3-count-out-11': 'lesson-11',
    '3-introduce-8-12': 'lesson-12',
    '3-linear-count-13': 'lesson-13',
    '3-finger-count-14': 'lesson-14',
    '3-array-count-15': 'lesson-15',
    '3-compose-8-16': 'lesson-16',
    '3-circular-count-17': 'lesson-17',
    '3-arrange-count-18': 'lesson-18',
    '3-tally-19': 'lesson-19',
    '3-count-out-20': 'lesson-20',
    '3-introduce-zero-21': 'lesson-21',
    '3-introduce-9-lesson-22': 'lesson-22',
    '3-linear-count-9-lesson-23': 'lesson-23',
    '3-finger-count-24': 'lesson-24',
    '3-array-count-25': 'lesson-25',
    '3-compose-9-lesson-26': 'lesson-26',
    '3-circular-count-9-lesson-27': 'lesson-27',
    '3-arrange-count-28': 'lesson-28',
    '3-tally-9-lesson-29': 'lesson-29',
    '3-towers-30': 'lesson-30',
    '3-stairs-31': 'lesson-31',
    '3-climb-stairs-32': 'lesson-32',
    '3-descending-stairs-33': 'lesson-33',
    '3-penny-staircase-34': 'lesson-34',
    '3-little-crabs-35': 'lesson-35',
    '3-little-fishies-36': 'lesson-36',
    '3-little-fishies-thirty-six-36': 'lesson-36',
    '3-culminating-thirty-seven-37': 'lesson-37',
    '3-circular-ten-thirty-eight-38': 'lesson-38',
    '3-varied-ten-thirty-nine-39': 'lesson-39',
    '3-tally-ten-forty-40': 'lesson-40',
    '3-count-out-ten-forty-one-41': 'lesson-41',
    '3-number-book-forty-two-42': 'lesson-42',
    '3-number-book-42': 'lesson-42',
};

function replaceUrls(content, filePath) {
    let modified = content;

    // First handle the special case of "/activities" that should NOT match "/activities/module-2" etc.
    // We need to be careful with this one - only replace exact matches
    // Handle: to="/activities" and navigate("/activities") but NOT /activities/module-*
    modified = modified.replace(/to="\/activities"(?!\/)/g, 'to="/activities/module-1"');
    modified = modified.replace(/to={'\/activities'}(?!\/)/g, "to={'/activities/module-1'}");
    modified = modified.replace(/navigate\("\/activities"\)/g, 'navigate("/activities/module-1")');
    modified = modified.replace(/navigate\('\/activities'\)/g, "navigate('/activities/module-1')");
    // Handle Link href
    modified = modified.replace(/href="\/activities"(?!\/)/g, 'href="/activities/module-1"');

    // Handle path="/activities" in Route (exact match only)
    modified = modified.replace(/path="\/activities"(?!\/)/g, 'path="/activities/module-1"');

    // Now handle all other URL replacements (lesson paths)
    for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
        // Skip the /activities one, already handled above
        if (oldUrl === '"/activities"' || oldUrl === "'/activities'") continue;

        // Escape for regex
        const escaped = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Replace in all contexts: to="...", path="...", navigate("..."), ?last=...
        const regex = new RegExp(escaped, 'g');
        modified = modified.replace(regex, newUrl);
    }

    // Handle Module 3 ?last= params: navigate("/activities/module-3?last=3-xxx")
    for (const [oldId, newId] of Object.entries(m3LessonIdMap)) {
        const escaped = oldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Match ?last=oldId in navigate/to strings
        const regex = new RegExp(`(\\?last=)${escaped}`, 'g');
        modified = modified.replace(regex, `$1${newId}`);
    }

    // Handle Module 3 localStorage IDs in lesson files
    // e.g. .includes("3-count-eggs-4") -> .includes("lesson-4")
    for (const [oldId, newId] of Object.entries(m3LessonIdMap)) {
        const escaped = oldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\.includes\\("${escaped}"\\)`, 'g');
        modified = modified.replace(regex, `.includes("${newId}")`);

        const pushRegex = new RegExp(`\\.push\\("${escaped}"\\)`, 'g');
        modified = modified.replace(pushRegex, `.push("${newId}")`);
    }

    return modified;
}

// Process all .tsx files in src/pages and src/App.tsx
const filesToProcess = [];

// Add App.tsx
filesToProcess.push(path.join(srcDir, 'App.tsx'));

// Add all .tsx files in pages
const pageFiles = readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
for (const f of pageFiles) {
    filesToProcess.push(path.join(pagesDir, f));
}

let totalUpdated = 0;
let totalUnchanged = 0;

for (const filePath of filesToProcess) {
    const original = fs.readFileSync(filePath, 'utf-8');
    const updated = replaceUrls(original, filePath);

    if (updated !== original) {
        fs.writeFileSync(filePath, updated, 'utf-8');
        console.log(`UPDATED: ${path.basename(filePath)}`);
        totalUpdated++;
    } else {
        totalUnchanged++;
    }
}

console.log(`\nDone: ${totalUpdated} files updated, ${totalUnchanged} unchanged`);
