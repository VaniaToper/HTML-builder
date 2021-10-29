const fs = require('fs');
const { stat } = require('fs');
const path = require('path');
const fileDir = path.join(__dirname, 'secret-folder');

function getFileInfo(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    console.log('\nCurrent directory files:');
    if (err) throw err;
    else {
      files.forEach((file) => {
        if (file.isFile() == true) {
          const pathOfFile = path.join(__dirname, `secret-folder/${file.name}`);
          const pathInfo = path.parse(pathOfFile);
          stat(pathOfFile, (err, stats) => {
            console.log(
              `${pathInfo.name} - ${pathInfo.ext.slice(1)} - ${
                stats.size / 1024
              }kb`
            );
          });
        }
      });
    }
  });
}
getFileInfo(fileDir);
