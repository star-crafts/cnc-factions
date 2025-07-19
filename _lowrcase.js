const fs = require('fs').promises;
const path = require('path');

async function lowercaseFilenamesRecursively(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);
    const newName = entry.name.toLowerCase();
    const newPath = path.join(dir, newName);

    if (entry.isDirectory()) {
      // Rename the directory itself (only if name changed)
      if (entry.name !== newName) {
        console.log(`Renaming folder: ${entry.name} => ${newName}`);
        await fs.rename(oldPath, newPath);
      }
      // Continue recursively in the (possibly renamed) subfolder
      await lowercaseFilenamesRecursively(newPath);
    } else {
      // Rename file if needed
      if (entry.name !== newName) {
        console.log(`Renaming file: ${entry.name} => ${newName}`);
        await fs.rename(oldPath, newPath);
      }
    }
  }
}

async function run() {
let root = '/Applications/StarCraft II/Mods/cnc-factions/tib-assets.sc2mod/base.sc2assets/assets/icons/zocom'
  await lowercaseFilenamesRecursively(root);
}

run().catch(console.error);
