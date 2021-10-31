const path = require('path');
const fs = require('fs');
const copyDir = require('../04-copy-directory/index');
const mergeStyle = require('../05-merge-styles/index');
const projectFolder = path.join(__dirname, 'project-dist');
fs.mkdir(projectFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

const mainFolderPath = path.join(__dirname, 'template.html');
const componentsFolderPath = path.join(__dirname, 'components');

const buildPage = (mainPath, componentsPath) => {
  const readStream = fs.createReadStream(mainPath, 'utf-8');
  readStream.on('data', (data) => {
    let templateText = data;
    const tags = data.match(/{{.+}}/gi);
    tags.forEach((tag) => {
      const tagName = tag.match(/\w+/)[0];
      const componentsFilePath = path.join(componentsPath, `${tagName}.html`);
      const componentsText = fs.readFile(
        componentsFilePath,
        (err, component) => {
          if (err) throw err;
          else {
            templateText = templateText.replace(tag, component.toString());
            fs.writeFile(
              path.join(projectFolder, 'index.html'),
              templateText,
              (err) => {
                if (err) throw err;
              }
            );
          }
        }
      );
    });
  });
};
buildPage(mainFolderPath, componentsFolderPath);
buildPage(mainFolderPath, componentsFolderPath);
const baseFolderPath = path.join(__dirname, 'assets');
const copyFolderPath = path.join(projectFolder, 'assets');
copyDir(baseFolderPath, copyFolderPath);

const styleFolderPath = path.join(__dirname, 'styles');
const newStylePath = path.join(__dirname, 'project-dist', 'style.css');
mergeStyle(styleFolderPath, newStylePath);
