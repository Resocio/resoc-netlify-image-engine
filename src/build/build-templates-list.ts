import classicFs from 'fs';
import path from 'path/posix';
const fs = classicFs.promises;

fs.readdir('resoc-templates', { withFileTypes: true })
.then(paths => paths.filter(path => path.isDirectory()))
.then(dirs => fs.writeFile(
  'resoc-templates/templates-list.json',
  JSON.stringify(dirs.map(dir => ({ name: dir.name })))
))
.then(() => console.log("Done!"));
