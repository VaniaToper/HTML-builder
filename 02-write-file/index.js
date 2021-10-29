const readline = require('readline');
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.open(filePath, 'w', (err) => {
  if (err) throw err;
});

console.log('Write something:');
rl.on('line', (inputValue) => {
  if (inputValue == 'exit') {
    rl.close();
  } else {
    fs.appendFile(filePath, inputValue, (err) => {
      if (err) {
        throw err;
      }
    });
  }
});

rl.on('close', () => {
  console.log('File has been created');
});
