const fs = require('fs');
const path = require('path');

class Static {
  constructor(rootDir) {
    this.root = rootDir;
  }

  getFile(filePath, toString) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(this.root, filePath), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(toString ? data.toString() : data);
        }
      });
    });
  }
}

module.exports = Static;
