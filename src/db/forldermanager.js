const fs = require("fs");
const util = require("util");
const mkdir = util.promisify(fs.mkdir);
const exist = fs.existsSync;
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const getfolders = async (patch) => {
  const files = await readdir(patch);
  const folders = [];
  files.map(async file => {
    const fullPath = `${patch}/${file}`;
    const fileStat = await stat(fullPath);
    if (fileStat.isDirectory()) {
        folders.push(file)
    }
  })
  
  return folders

};

module.exports = {
  mkdir,
  exist,
  readdir,
  getfolders,
};
