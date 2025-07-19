const fs = require('fs').promises;
const path = require('path');

const transformations = [
  {
    dir: './upgrade',
    prefix: 'btn-zocom-upgrade-',
    suffix: '',
    replacements: [
      { from: 'zocom', to: '' },
      { from: 'upgrade', to: '' },
      { from: 'icon', to: '' }
    ]
  },
  {
    dir: './ability',
    prefix: 'btn-zocom-ability-',
    suffix: '',
    replacements: [
      { from: 'zocom', to: '' },
      { from: 'ability', to: '' },
      { from: 'icon', to: '' }
    ]
  },
  {
    dir: './building',
    prefix: 'btn-zocom-building-',
    suffix: '',
    replacements: [
      { from: 'zocom', to: '' },
      { from: 'icon', to: '' }
    ]
  },
  {
    dir: './unit',
    prefix: 'btn-zocom-unit-',
    suffix: '',
    replacements: [
      { from: 'zocom', to: '' },
      { from: 'icon', to: '' }
    ]
  },
  {
    dir: './wireframe-unit',
    prefix: 'wireframe-zocom-unit-',
    suffix: '',
    replacements: [
      { from: 'zocom', to: '' },
      { from: 'wireframe', to: '' },
      { from: 'icon', to: '' }
    ]
  },
  {
    dir: './wireframe-building',
    prefix: 'wireframe-zocom-building-',
    suffix: '',
    replacements: [
      { from: 'zocom', to: '' },
      { from: 'wireframe', to: '' },
      { from: 'icon', to: '' }
    ]
  },


  {
    dir: './unit-alt',
    prefix: 'btn-zocom-unit-',
    suffix: '-tinted',
    replacements: [
      { from: 'zocom', to: '' },
      { from: 'icon', to: '' }
    ]
  },
  {
    dir: './building-alt',
    prefix: 'btn-zocom-building-',
    suffix: '-tinted',
    replacements: [
      { from: 'zocom', to: '' },
      { from: 'icon', to: '' }
    ]
  },





  // {
  //   dir: './upgrade',
  //   replacements: [
  //     { from: 'upgrade-zocom', to: 'upgrade-' }
  //   ]
  // },
  // {
  //   dir: './ability',
  //   replacements: [
  //     { from: 'ability-zocom', to: 'ability-' }
  //   ]
  // },
  // {
  //   dir: './building',
  //   replacements: [
  //     { from: 'building-zocom', to: 'building-' }
  //   ]
  // },
  // {
  //   dir: './unit',
  //   replacements: [
  //     { from: 'unit-zocom', to: 'unit-' }
  //   ]
  // },
  // {
  //   dir: './wireframe-unit',
  //   replacements: [
  //     { from: 'unit-zocom', to: 'unit-' }
  //   ]
  // },
  // {
  //   dir: './wireframe-building',
  //   replacements: [
  //     { from: 'building-zocom', to: 'building-' }
  //   ]
  // },
  // {
  //   dir: './unit-alt',
  //   replacements: [
  //     { from: 'unit-zocom', to: 'unit-' }
  //   ]
  // },
  // {
  //   dir: './building-alt',
  //   replacements: [
  //     { from: 'building', to: 'building-' }
  //   ]
  // }
];

async function renameFilesInFolder(root,{ dir, prefix = '', suffix ='', replacements =[] }) {
    dir = path.resolve(root,dir)
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const oldPath = path.join(dir, file);

      // Skip directories
      const stat = await fs.stat(oldPath);
      if (stat.isDirectory()) continue;

      let newName = file;

      // Apply all replacements
      for (const { from, to } of replacements) {
        newName = newName.replaceAll(from, to);
      }

      const ext = path.extname(newName);
      const baseName = path.basename(newName, ext);

      // Add prefix and suffix
      newName = prefix + baseName + suffix + ext;

      const newPath = path.join(dir, newName);

      if (newName !== file) {
        console.log(`Renaming: ${file} => ${newName}`);
        await fs.rename(oldPath, newPath);
      }
    }
  } catch (err) {
    console.error(`Error processing folder "${dir}":`, err);
  }
}


let root = '/Applications/StarCraft II/Mods/cnc-factions/tib-assets.sc2mod/base.sc2assets/assets/icons/zocom'
async function run() {
  for (const config of transformations) {
    await renameFilesInFolder(root,config);
  }
}

run();
