const path = require('path');
const fs = require('fs');
const copyFolderPath = path.join(__dirname, 'files-copy');
const baseFolderPath = path.join(__dirname, 'files');

function copyDir(baseFolderPath, copyFolderPath) {
  fs.mkdir(copyFolderPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(baseFolderPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        const baseFilePath = path.join(baseFolderPath, file.name);
        const copyFilePath = path.join(copyFolderPath, file.name);
        if (file.isFile()) {
          fs.copyFile(baseFilePath, copyFilePath, (err) => {
            if (err) {
              throw err;
            }
          });
        } else copyDir(baseFilePath, copyFilePath);
      });
    }
  });
}
copyDir(baseFolderPath, copyFolderPath);
module.exports = copyDir;
