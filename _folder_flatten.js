const fs = require('fs').promises;
const path = require('path');

async function moveSubfolderFilesToRoot(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      // Process files in subfolder
      const subEntries = await fs.readdir(fullPath);

      for (const subFile of subEntries) {
        const sourcePath = path.join(fullPath, subFile);
        const destPath = path.join(rootDir, subFile);

        // Handle name conflicts
        let finalDest = destPath;
        let counter = 1;

        while (true) {
          try {
            await fs.rename(sourcePath, finalDest);
            console.log(`Moved: ${sourcePath} => ${finalDest}`);
            break;
          } catch (err) {
            if (err.code === 'EEXIST') {
              // File exists in rootDir, add a suffix
              const ext = path.extname(subFile);
              const base = path.basename(subFile, ext);
              finalDest = path.join(rootDir, `${base}_${counter}${ext}`);
              counter++;
            } else {
              console.error(`Error moving ${sourcePath}:`, err);
              break;
            }
          }
        }
      }

      // After moving, remove the now-empty subfolder
      console.log(`Removing folder: ${fullPath}`);
      await fs.rmdir(fullPath);
    }
  }
}

async function run() {
let root = '/Applications/StarCraft II/Mods/cnc-factions/tib-assets.sc2mod/base.sc2assets/assets/icons/scrin'
  await moveSubfolderFilesToRoot(root);
}

run().catch(console.error);
