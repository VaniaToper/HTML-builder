const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'files-copy');

const dir = path.join(__dirname, 'files');
function copyDir() {
  fs.mkdir(filePath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        const baseFile = path.join(__dirname, 'files', file);
        const copyFile = path.join(__dirname, 'files-copy', file);
        fs.copyFile(baseFile, copyFile, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    }
  });
}
copyDir();
