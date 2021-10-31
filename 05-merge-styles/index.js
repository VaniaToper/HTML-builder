const path = require('path');
const fs = require('fs');

const styleFolderPath = path.join(__dirname, 'styles');
const newStylePath = path.join(__dirname, 'project-dist', 'bundle.css');

const mergeStyle = (styleFolderPath, mergedFile) => {
  fs.writeFile(mergedFile, '', () => {
    fs.readdir(styleFolderPath, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) == '.css') {
          const filePath = path.join(styleFolderPath, file.name);
          const readStream = fs.createReadStream(filePath, 'utf-8');
          let text = '';
          readStream.on('data', (data) => (text += data));
          readStream.on('end', () => fs.appendFile(mergedFile, text, () => ''));
        }
      });
    });
  });
}

mergeStyle(styleFolderPath, newStylePath);

module.exports = mergeStyle;