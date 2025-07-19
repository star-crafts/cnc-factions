const fs = require('fs');
const path = require('path');

const TARGET_SUBDIR = 'e-z-ogg'; // Destination folder

function moveEZoggFiles() {
    const currentDir = __dirname;
    const destDir = path.join(currentDir, TARGET_SUBDIR);

    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    const matchedFiles = entries
        .filter(entry => {
            if (!entry.isFile()) return false;

            const parsed = path.parse(entry.name);
            return (
                parsed.ext.toLowerCase() === '.ogg' &&
                /[e-zE-Z]$/.test(parsed.name) // Check base name only
            );
        })
        .map(entry => entry.name);

    matchedFiles.forEach(file => {
        const src = path.join(currentDir, file);
        const dest = path.join(destDir, file);

        fs.renameSync(src, dest);
        console.log(`Moved: ${file}`);
    });

    console.log(`Done. Moved ${matchedFiles.length} .ogg file(s) to "${TARGET_SUBDIR}"`);
}

moveEZoggFiles();
